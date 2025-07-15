import BCrypt from "bcrypt";
import JWT from "jsonwebtoken";
import type { Cookies, Handle } from "@sveltejs/kit";
import type { Result, UserDisplayableException } from "$lib/Common";
import { redirect } from "@sveltejs/kit";
import { isEmpty, isNullish, useAwait, useCatch } from "$lib/Common";
import { integer, minValue, number, object, parse, pipe } from "valibot";

export interface MiniAuthClientConfiguration<P, U> {
  env: {
    ACCESS_TOKEN: string;
    ACCESS_TOKEN_EXPIRES_IN: JWT.SignOptions["expiresIn"];
    ACCESS_COOKIE_NAME: string;
    REFRESH_TOKEN: string;
    REFRESH_TOKEN_EXPIRES_IN: JWT.SignOptions["expiresIn"];
    REFRESH_COOKIE_NAME: string;
  },
  findCurrentUserFromDB(payload: P): Promise<U | null>;
  getRefreshTokenFromDB(payload: P): Promise<number>;
  getRefreshedAuthState(payload: P): P;
  isPayload(cookie: unknown): cookie is P;
  incrementRefreshTokenVersion(payload: P): Promise<void>;
  protectedRoutes: string[];
  signInRoute: string;
  signUpRoute: string;
}

const RefreshTokenVersionSchema = object({
  version: pipe(
    number("Refresh Token Version must be a number"),
    integer("Refresh Token Version must be an integer"),
    minValue(0, "Refresh Token Version must be greater than or equal to 0")
  )
})

export default class MiniAuthClient<AuthState extends { id: string }, User extends object> {
  private ACCESS_TOKEN: MiniAuthClientConfiguration<AuthState, User>["env"]["ACCESS_TOKEN"];
  private ACCESS_TOKEN_EXPIRES_IN: MiniAuthClientConfiguration<AuthState, User>["env"]["ACCESS_TOKEN_EXPIRES_IN"];
  private ACCESS_COOKIE_NAME: MiniAuthClientConfiguration<AuthState, User>["env"]["ACCESS_COOKIE_NAME"];
  private REFRESH_TOKEN: MiniAuthClientConfiguration<AuthState, User>["env"]["REFRESH_TOKEN"];
  private REFRESH_TOKEN_EXPIRES_IN: MiniAuthClientConfiguration<AuthState, User>["env"]["REFRESH_TOKEN_EXPIRES_IN"];
  private REFRESH_COOKIE_NAME: MiniAuthClientConfiguration<AuthState, User>["env"]["REFRESH_COOKIE_NAME"];
  private isPayload: MiniAuthClientConfiguration<AuthState, User>["isPayload"];
  public readonly signInRoute: MiniAuthClientConfiguration<AuthState, User>["signInRoute"];
  public readonly signUpRoute: MiniAuthClientConfiguration<AuthState, User>["signUpRoute"];
  private protectedRoutes: MiniAuthClientConfiguration<AuthState, User>["protectedRoutes"];
  private initialFindCurrentUser: MiniAuthClientConfiguration<AuthState, User>["findCurrentUserFromDB"];
  private incrementRefreshTokenVersion: MiniAuthClientConfiguration<AuthState, User>["incrementRefreshTokenVersion"];
  private getRefreshTokenFromDB: MiniAuthClientConfiguration<AuthState, User>["getRefreshTokenFromDB"];
  private getRefreshedAuthState: MiniAuthClientConfiguration<AuthState, User>["getRefreshedAuthState"];

  public constructor(configuration: MiniAuthClientConfiguration<AuthState, User>) {
    this.ACCESS_TOKEN = configuration.env.ACCESS_TOKEN;
    this.ACCESS_TOKEN_EXPIRES_IN = configuration.env.ACCESS_TOKEN_EXPIRES_IN;
    this.ACCESS_COOKIE_NAME = configuration.env.ACCESS_COOKIE_NAME;
    this.REFRESH_TOKEN = configuration.env.REFRESH_TOKEN;
    this.REFRESH_TOKEN_EXPIRES_IN = configuration.env.REFRESH_TOKEN_EXPIRES_IN;
    this.REFRESH_COOKIE_NAME = configuration.env.REFRESH_COOKIE_NAME;
    this.isPayload = configuration.isPayload;
    this.signInRoute = configuration.signInRoute;
    this.signUpRoute = configuration.signUpRoute;
    this.protectedRoutes = configuration.protectedRoutes;
    this.initialFindCurrentUser = configuration.findCurrentUserFromDB;
    this.getRefreshTokenFromDB = configuration.getRefreshTokenFromDB;
    this.getRefreshedAuthState = configuration.getRefreshedAuthState;
    this.incrementRefreshTokenVersion = configuration.incrementRefreshTokenVersion;
  }

  private createAccessCookie(payload: AuthState) {
    return JWT.sign(payload, this.ACCESS_TOKEN, { expiresIn: this.ACCESS_TOKEN_EXPIRES_IN });
  }

  private createRefreshCookie(refreshTokenVersion: number) {
    return JWT.sign({ version: refreshTokenVersion }, this.REFRESH_TOKEN, { expiresIn: this.REFRESH_TOKEN_EXPIRES_IN });
  }

  public createHandleFunction(): Handle {
    const self = this;
    return async function handle(input) {
      const payload = await self.findAuthStateFromCookies(input.event.cookies);
      const route = input.event.route.id;

      if (isNullish(payload)) {
        if (route && self.isInProtectedRoute(route)) {
          throw redirect(302, self.signInRoute);
        }
      }

      if (payload && (route === self.signInRoute || route === self.signUpRoute)) {
        throw redirect(302, "/");
      }

      return input.resolve(input.event);
    }
  }

  public createHashedPassword(password: string): Promise<string> {
    return BCrypt.hash(password, 8);
  }

  private deleteAuthCookies(cookies: Cookies): void {
    cookies.set(this.ACCESS_COOKIE_NAME, "", {
      expires: new Date(Date.now() - 3600),
      httpOnly: true,
      path: "/"
    });
    cookies.set(this.REFRESH_COOKIE_NAME, "", {
      expires: new Date(Date.now() - 3600),
      httpOnly: true,
      path: "/"
    });
  }

  private async findAuthStateFromCookiesWithNoRefresh(cookies: Cookies): Promise<AuthState | null> {
    const initialCookie = cookies.get(this.ACCESS_COOKIE_NAME);

    if (isNullish(initialCookie) || isEmpty(initialCookie)) {
      return null;
    }

    const { data } = useCatch(() => JWT.verify(initialCookie, this.ACCESS_TOKEN));

    if (this.isPayload(data)) {
      return data;
    }

    this.deleteAuthCookies(cookies);
    return null;

  }

  private async handleRefreshedAuthState(cookies: Cookies, decoded: AuthState): Promise<AuthState | null> {
    const refreshTokenFromCookies = this.findRefreshTokenFromCookies(cookies);

    if (isNullish(refreshTokenFromCookies)) {
      return null;
    }

    const { data: refreshTokenFromDB } = await useAwait(() => this.getRefreshTokenFromDB(decoded));

    if (refreshTokenFromDB === refreshTokenFromCookies) {
      const renewed = this.getRefreshedAuthState(decoded);
      this.setAccessCookie(cookies, renewed);
      return renewed;
    }

    return null;
  }

  public async findAuthStateFromCookies(cookies: Cookies): Promise<AuthState | null> {
    const initialCookie = cookies.get(this.ACCESS_COOKIE_NAME);

    if (isNullish(initialCookie) || isEmpty(initialCookie)) {
      return null;
    }

    const { data, error } = useCatch(() => JWT.verify(initialCookie, this.ACCESS_TOKEN));

    if (error) {
      const decoded = JWT.decode(initialCookie);

      if (error instanceof JWT.TokenExpiredError && this.isPayload(decoded)) {
        const refreshed = await this.handleRefreshedAuthState(cookies, decoded);

        if (refreshed) {
          return refreshed;
        }
      }
    } else if (this.isPayload(data)) {
      return data;
    }

    this.deleteAuthCookies(cookies);
    return null;
  }

  public findCurrentUserFromDB(cookies: Cookies): Promise<Result<User | null, UserDisplayableException>> {
    return useAwait(async () => {
      const payload = await this.findAuthStateFromCookies(cookies);

      if (payload) {
        return this.initialFindCurrentUser(payload);
      }

      return null;
    });
  }

  private findRefreshTokenFromCookies(cookies: Cookies): number | null {
    const initialCookie = cookies.get(this.REFRESH_COOKIE_NAME);

    if (isNullish(initialCookie) || isEmpty(initialCookie)) {
      return null;
    }

    const { data } = useCatch(() => {
      return parse(RefreshTokenVersionSchema, JWT.verify(initialCookie, this.REFRESH_TOKEN));
    });

    if (data) {
      return data.version;
    }

    this.deleteAuthCookies(cookies);
    return null;
  }

  public async getAuthStateFromCookies(cookies: Cookies): Promise<AuthState> {
    const payload = await this.findAuthStateFromCookies(cookies);

    if (payload) {
      return payload;
    }

    throw redirect(302, this.signInRoute);
  }

  public async getCurrentUserFromDB(cookies: Cookies): Promise<User> {
    const user = await this.findCurrentUserFromDB(cookies);

    if (user.error || isNullish(user.data)) {
      this.deleteAuthCookies(cookies);
      throw redirect(302, this.signInRoute);
    }

    if (user.data) {
      return user.data;
    }

    throw redirect(302, this.signInRoute);
  }

  public hasPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
    return BCrypt.compare(password, hashedPassword);
  }

  private isInProtectedRoute(route: string): boolean {
    return this.protectedRoutes.some((it) => route.includes(it));
  }

  private setAccessCookie(cookies: Cookies, payload: AuthState): void {
    cookies.set(this.ACCESS_COOKIE_NAME, this.createAccessCookie(payload), {
      httpOnly: true,
      secure: true,
      path: "/"
    });
  }

  private setAccessCookieAndRefreshCookie(cookies: Cookies, payload: AuthState, refreshTokenVersion: number): void {
    this.setAccessCookie(cookies, payload);
    cookies.set(this.REFRESH_COOKIE_NAME, this.createRefreshCookie(refreshTokenVersion), {
      httpOnly: true,
      secure: true,
      path: "/"
    });
  }

  public signIn(cookies: Cookies, payload: AuthState, refreshTokenVersion: number): void {
    this.setAccessCookieAndRefreshCookie(cookies, payload, refreshTokenVersion);
  }

  public signOut(cookies: Cookies): void {
    this.deleteAuthCookies(cookies);
  }

  public async signOutFromAllDevices(cookies: Cookies): Promise<boolean> {
    const payload = await this.findAuthStateFromCookiesWithNoRefresh(cookies);

    this.signOut(cookies);

    if (payload) {
      await this.incrementRefreshTokenVersion(payload);
      return true;
    }

    return false;
  }
}
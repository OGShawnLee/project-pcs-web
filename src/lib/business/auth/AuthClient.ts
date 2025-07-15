import type { CurrentUser } from "@business/Schema";
import JWT from "jsonwebtoken";
import MiniAuthClient from "@business/auth/mini-auth";
import AccountDAO from "@db/dao/AccountDAO";
import { ACCESS_COOKIE_NAME, ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES_IN, REFRESH_COOKIE_NAME, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRES_IN } from "$env/static/private";
import Schema from "@business/Schema";
import type { AccountDTO } from "@business/dto";

const AuthClient = new MiniAuthClient<CurrentUser, AccountDTO>({
  env: {
    ACCESS_TOKEN: ACCESS_TOKEN,
    ACCESS_TOKEN_EXPIRES_IN: ACCESS_TOKEN_EXPIRES_IN as JWT.SignOptions["expiresIn"],
    ACCESS_COOKIE_NAME: ACCESS_COOKIE_NAME,
    REFRESH_TOKEN: REFRESH_TOKEN,
    REFRESH_TOKEN_EXPIRES_IN: REFRESH_TOKEN_EXPIRES_IN as JWT.SignOptions["expiresIn"],
    REFRESH_COOKIE_NAME: REFRESH_COOKIE_NAME
  },
  findCurrentUserFromDB: async (payload) => {
    const { data } = await AccountDAO.findOneByEmail(payload.id);
    return data;
  },
  getRefreshTokenFromDB: async (payload) => {
    const { data, error } = await AccountDAO.getOne(payload.id);

    if (error) {
      throw error;
    }

    return data.refreshTokenVersion;
  },
  getRefreshedAuthState: (payload) => {
    return { id: payload.id };
  },
  isPayload: (cookie): cookie is CurrentUser => {
    return Schema.getSafeValidCurrentUser(cookie).status === "Success";
  },
  incrementRefreshTokenVersion: async (payload) => {
    const { error } = await AccountDAO.incrementRefreshTokenVersion(payload.id);
    if (error) {
      throw error;
    }
  },
  protectedRoutes: ["/dashboard"],
  signInRoute: "/auth/sign-in",
  signUpRoute: "/auth/sign-up"
});

export default AuthClient;
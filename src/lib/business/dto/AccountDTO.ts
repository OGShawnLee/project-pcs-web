import type { Account } from "@business/Schema";
import type { AccountRole } from "@business/dto/enum";
import Schema from "@business/Schema";
import AuthClient from "@business/auth/AuthClient";

export default class AccountDTO implements Account {
  public readonly email: string;
  public readonly password: string;
  public readonly role: AccountRole;
  public readonly refreshTokenVersion: number;

  /**
   * Creates a new instance of AccountDTO.
   * @param configuration - The configuration object containing account details.
   * @throws {ValiError} If the provided configuration is invalid.
   */
  public constructor(configuration: Account) {
    const validated = Schema.getValidAccount(configuration);
    this.email = validated.email;
    this.password = validated.password;
    this.role = validated.role;
    this.refreshTokenVersion = validated.refreshTokenVersion;
  }

  public async createForInsertion() {
    return new AccountDTO({
      email: this.email,
      password: await AuthClient.createHashedPassword(this.password),
      role: this.role,
      refreshTokenVersion: 0 
    }).toSnakeCase();
  }

  public equals(other: Account): boolean {
    return (
      this.email === other.email &&
      this.password === other.password &&
      this.role === other.role &&
      this.refreshTokenVersion === other.refreshTokenVersion
    );
  }

  /**
   * Converts the account data to a snake_case format.
   * @returns An object with the account data in snake_case.
   */
  public toSnakeCase(this: AccountDTO) {
    return {
      email: this.email,
      password: this.password,
      role: this.role,
      refresh_token_version: this.refreshTokenVersion
    };
  }

  public async hasPasswordMatch(candidate: string): Promise<boolean> {
    return await AuthClient.hasPasswordMatch(candidate, this.password);
  }
}
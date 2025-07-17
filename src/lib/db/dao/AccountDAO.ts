import DBClient from "@db/DBClient";
import AccountDTO from "@business/dto/AccountDTO";
import { createResult } from "$lib/Common";

export default class AccountDAO {
  public static async createOne(account: AccountDTO) {
    const { data, error } = await DBClient.from("account").insert(await account.createForInsertion());
    return createResult(data, error);
  }

  public static async getOne(email: string) {
    const { data, error } = await DBClient.from("account").select("*").filter("email", "eq", email).single();
    return createResult(
      data ? new AccountDTO({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        refreshTokenVersion: data.refresh_token_version
      }) : null,
      error,
    );
  }

  public static async hasCoordinatorAccount() {
    const { data, error } = await DBClient.from("account").select("*").filter("role", "eq", "COORDINATOR").maybeSingle();
    return createResult(data !== null, error);
  }

  public static async findOneByEmail(email: string) {
    const { data, error } = await DBClient.from("account").select("*").filter("email", "eq", email).maybeSingle();
    return createResult(
      data ? new AccountDTO({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        refreshTokenVersion: data.refresh_token_version
      }) : null,
      error
    );
  }

  public static async incrementRefreshTokenVersion(email: string) {
    const { error } = await DBClient.rpc("increment_refresh_token_version", { in_email: email });
    return createResult(null, error);
  }
} 
import DBClient from "@db/DBClient";
import AccountDTO from "@business/dto/AccountDTO";
import { useAwait } from "$lib/Common";

export default class AccountDAO {
  public static async createOne(account: AccountDTO) {
    return DBClient.from("account").insert(await account.toInsertAccount());
  }

  public static getOne(email: string) {
    return useAwait(async () => {
      const { data, error } = await DBClient.from("account").select("*").filter("email", "eq", email).single();

      if (error) {
        throw error;
      }

      return new AccountDTO({
        email: data.email,
        password: data.password,
        role: data.role,
        refreshTokenVersion: data.refresh_token_version
      });
    })
  }

  public static hasCoordinatorAccount() {
    return useAwait(async () => {
      const { data, error } = await DBClient.from("account").select("*").filter("role", "eq", "COORDINATOR").maybeSingle();

      if (error) {
        throw error;
      }

      return data !== null;
    });
  }

  public static async findOneByEmail(email: string) {
    return useAwait(async () => {
      const { data, error } = await DBClient.from("account").select("*").filter("email", "eq", email).maybeSingle();

      if (error) {
        throw error;
      }

      return data ? new AccountDTO({
        email: data.email,
        password: data.password,
        role: data.role,
        refreshTokenVersion: data.refresh_token_version
      }) : null;
    })
  }

  public static async incrementRefreshTokenVersion(email: string) {
    return useAwait(async () => {
      const { error } = await DBClient.rpc("increment_refresh_token_version", { in_email: email });

      if (error) {
        throw error;
      }
    });
  }
} 
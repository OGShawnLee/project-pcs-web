import DBClient from "@db/DBClient";
import OrganizationDTO from "@business/dto/OrganizationDTO";
import { createResult } from "$lib/Common";

export default class OrganizationDAO {
  public static async createOne(data: OrganizationDTO) {
    const { error } = await DBClient.from("organization").insert(data.createForInsertion());
    return createResult(error ? null : data.email, error);
  }
}
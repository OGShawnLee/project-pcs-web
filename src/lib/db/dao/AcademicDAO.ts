import DBClient from "@db/DBClient";
import Schema from "@business/Schema";
import AcademicDTO from "@business/dto/AcademicDTO";
import AuthClient from "@business/auth/AuthClient";
import { createResult } from "$lib/Common";

export default class AcademicDAO {
  public static async createOne(data: AcademicDTO) {
    const { error } = await DBClient.rpc("create_academic_and_account", {
      in_worker_id: data.workerID,
      in_email: data.email,
      in_name: data.name,
      in_last_name: data.lastName,
      in_phone_number: data.phoneNumber,
      in_role: data.role,
      in_password: await AuthClient.createHashedPassword(data.workerID + "@Password")
    });
    return createResult(error ? null : data.workerID, error);
  }

  public static async getMany(limit = 12) {
    const { data, error } = await DBClient.from("academic").select("*").limit(limit).order("created_at", { ascending: false });
    return createResult(
      data ? data.map((academic) => Schema.getValidAcademic({
        name: academic.name,
        lastName: academic.last_name,
        email: academic.email,
        phoneNumber: academic.phone_number,
        workerID: academic.worker_id,
        role: academic.role,
        createdAt: academic.created_at
      })) : null,
      error
    );
  }

  public static async deleteOne(id: string) {
    const { data, error } = await DBClient.from("academic").delete().filter("worker_id", "eq", id);
    return createResult(data, error);
  }
}
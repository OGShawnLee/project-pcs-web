import DBClient from "@db/DBClient";
import AcademicDTO from "@business/dto/AcademicDTO";
import AuthClient from "@business/auth/AuthClient";

export default class AcademicDAO {
  public static async createOne(data: AcademicDTO) {
    return DBClient.rpc("create_academic_and_account", {
      in_worker_id: data.workerID,
      in_email: data.email,
      in_name: data.name,
      in_last_name: data.lastName,
      in_phone_number: data.phoneNumber,
      in_role: data.role,
      in_password: await AuthClient.createHashedPassword(data.workerID + "@Password")
    }).maybeSingle();
  }
}
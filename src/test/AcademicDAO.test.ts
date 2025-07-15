import { AcademicDTO } from "@business/dto";
import { AcademicRole } from "@business/dto/enum";
import { AcademicDAO } from "@db/dao";
import { afterAll, assert, describe, expect, it } from "vitest";

describe("AcademicDAO", () => {
  const ACADEMIC_DTO = new AcademicDTO({
    name: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    workerID: "99999",
    role: AcademicRole.ACADEMIC,
  });

  afterAll(async () => {
    const { error } = await AcademicDAO.deleteOne(ACADEMIC_DTO.workerID);

    if (error) {
      throw error;
    }
  });

  describe("createOne()", () => {
    it("Should create new Academic record", async () => {
      const { data } = await AcademicDAO.createOne(ACADEMIC_DTO);
      expect(data).toBe(ACADEMIC_DTO.workerID);
    });
  });

  describe("deleteOne()", () => {
    it("Should delete the created Academic record", async () => {
      const result = await AcademicDAO.createOne(new AcademicDTO({ ...ACADEMIC_DTO, workerID: "99998" }));

      const { data, error, status } = await AcademicDAO.getMany(10);

      assert(result.status !== "Failure");
      expect(result.data).toBe("99998");
      await AcademicDAO.deleteOne(result.data);
    });
  });
});
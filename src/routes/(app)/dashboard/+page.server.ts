import { AcademicDAO } from "@db/dao";
import { error } from "@sveltejs/kit";

export async function load() {
  const { data, error: err } = await AcademicDAO.getMany(4);
  
  if (err) {
    error(500, { message: err.message });
  }

  return { academicList: data };
}
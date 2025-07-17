import { OrganizationDAO } from "@db/dao";
import { error } from "@sveltejs/kit";

export async function load() {
  const { data: organizationList, error: err } = await OrganizationDAO.getMany();
  
  if (err) {
    error(500, { message: err.message });
  }

  return { organizationList };
}
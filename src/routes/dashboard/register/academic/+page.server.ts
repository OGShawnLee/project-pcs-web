import Schema from "@business/Schema";
import { superValidate, setError } from "sveltekit-superforms/server";
import { valibot } from "sveltekit-superforms/adapters";
import { AcademicDTO } from "@business/dto";
import { AcademicDAO } from "@db/dao";
import { error } from "@sveltejs/kit";

export async function load() {
  return {
    form: await superValidate(valibot(Schema.ACADEMIC_SCHEMA))
  }
}

export const actions = {
  async default(event) {
    const form = await superValidate(event, valibot(Schema.ACADEMIC_SCHEMA));

    if (form.valid) {
      const { error: err } = await AcademicDAO.createOne(new AcademicDTO(form.data));

      if (err) {
        if (err.message.startsWith("USER")) {
          const field = err.message.includes("Email") ? "email" : "workerID";
          const message = err.message.substring(err.message.indexOf(":") + 1).trim();
          return setError(form, field, message);
        } else {
          error(500, { message: "No ha sido posible registrar Académico debido a un error en el sistema." });
        }
      }
    }

    return { form }
  }
}
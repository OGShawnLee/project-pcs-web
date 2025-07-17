import Schema from "@business/Schema";
import AccountDAO from "@db/dao/AccountDAO";
import { AccountDTO } from "@business/dto";
import { AccountRole } from "@business/dto/enum";
import { error, redirect } from "@sveltejs/kit";
import { setError, superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";

export async function load() {
  const { data: hasBeenInitialized, error: err } = await AccountDAO.hasCoordinatorAccount();

  if (hasBeenInitialized) {
    throw redirect(302, "/auth/sign-in");
  }

  if (err) {
    error(500, { message: err.message })
  }

  return {
    form: await superValidate(valibot(Schema.SIGN_UP_SCHEMA))
  }
}

export const actions = {
  async default(event) {
    const form = await superValidate(event, valibot(Schema.SIGN_UP_SCHEMA));
    
    if (form.valid) {
      if (form.data.password !== form.data.confirmPassword) {
        return setError(form, "confirmPassword", "Las contraseñas no coinciden.");
      }
      
      const { data: hasBeenInitialized } = await AccountDAO.hasCoordinatorAccount();
      
      if (hasBeenInitialized) {
        redirect(302, "/auth/sign-in");
      }

      const { error: err } = await AccountDAO.createOne(
        new AccountDTO({
          email: form.data.email,
          name: form.data.name,
          password: form.data.password,
          role: AccountRole.COORDINATOR,
          refreshTokenVersion: 0
        })
      );

      if (err) {
        error(500, { message: err.message });
      }

      redirect(302, "/auth/sign-in");
    }
  }
};
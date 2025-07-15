import AuthClient from "@business/auth/AuthClient";
import Schema from "@business/Schema";
import AccountDAO from "@db/dao/AccountDAO";
import { error, redirect } from "@sveltejs/kit";
import { setError, superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";

export async function load() {
  const { data } = await AccountDAO.hasCoordinatorAccount();

  if (data) {
    return {
      form: await superValidate(valibot(Schema.SIGN_IN_SCHEMA))
    }
  }
  
  redirect(302, "/auth/sign-up");
}

export const actions = {
  async default(event) {
    const form = await superValidate(event, valibot(Schema.SIGN_IN_SCHEMA));

    if (form.valid) {
      const { data: account, error: err } = await AccountDAO.findOneByEmail(form.data.email);

      if (err) {
        console.log(err);
        error(500, { message: err.message });
      }

      if (account === null) {
        return setError(form, "email", "No existe una cuenta con este correo electrónico.");
      }

      if (await account.hasPasswordMatch(form.data.password)) {
        AuthClient.signIn(event.cookies, { id: account.email }, account.refreshTokenVersion);
        redirect(302, "/dashboard");
      }

      return setError(form, "password", "La contraseña es incorrecta.");
    }


    return { form }
  }
}
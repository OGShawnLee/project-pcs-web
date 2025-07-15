import AuthClient from "@business/auth/AuthClient";
import { redirect } from "@sveltejs/kit";

export function load() {
  redirect(303, "/");
}

export const actions = {
  async default(event) {
    await AuthClient.signOutFromAllDevices(event.cookies);
    redirect(303, AuthClient.signInRoute);
  }
}
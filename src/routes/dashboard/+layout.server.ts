import AuthClient from "@business/auth/AuthClient";

export async function load(event) {
  const currentUserAccount = await AuthClient.getCurrentUserFromDB(event.cookies);
  return {
    email: currentUserAccount.email,
    role: currentUserAccount.role
  }
}
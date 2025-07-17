import AuthClient from "@business/auth/AuthClient";

export async function load(event) {
  const currentUserAccount = await AuthClient.getCurrentUserFromDB(event.cookies);
  return {
    currentUser: {
      name: currentUserAccount.name,
      email: currentUserAccount.email,
      role: currentUserAccount.role
    }
  }
}
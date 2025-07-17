import AuthClient from '@business/auth/AuthClient';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const authState = await AuthClient.findAuthStateFromCookies(event.cookies);

	if (authState) redirect(302, '/dashboard');
}

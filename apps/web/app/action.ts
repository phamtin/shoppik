'use server';

import { cookies } from 'next/headers';

export async function removeAuthCookie() {
	const c = cookies();
	c.set({ name: 'accessToken', value: '' });
	c.set({ name: 'next-auth.session-token', value: '' });
	c.set({ name: 'next-auth.callback-url', value: '' });
	c.set({ name: 'next-auth.csrf-token', value: '' });
}

export default removeAuthCookie;

'use server';

import { cookies } from 'next/headers';

export async function removeAuthCookie() {
	const c = cookies();
	c.set({ name: 'accessToken', value: '' });
	c.set({ name: 'next-auth.session-token', value: '' });
	c.set({ name: 'next-auth.callback-url', value: '' });
	c.set({ name: 'next-auth.csrf-token', value: '' });
	c.delete('__Secure-next-auth.callback-url');
	c.delete('__Secure-next-auth.session-token');
	c.delete('__Host-next-auth.csrf-token');
}

export default removeAuthCookie;

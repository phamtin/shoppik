'use server';

import { cookies } from 'next/headers';

export async function removeAuthCookie() {
	const c = cookies();
	c.delete({ name: 'accessToken' });
	c.delete({ name: 'next-auth.session-token' });
	c.delete({ name: 'next-auth.callback-url' });
	c.delete({ name: 'next-auth.csrf-token' });

	c.delete('__Secure-next-auth.callback-url');
	c.delete('__Secure-next-auth.session-token');
	c.delete('__Host-next-auth.csrf-token');
}

export default removeAuthCookie;

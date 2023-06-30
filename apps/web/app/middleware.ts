import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Import cookies

export function middleware() {
	const res = NextResponse.next();
	const nextCookies = cookies(); // Get cookies object
	const token = nextCookies.get('accessToken')?.value ?? ''; // Find cookie};

	res.cookies.set('accessToken', token, {
		maxAge: 60,
		httpOnly: true,
	});

	return res;
}

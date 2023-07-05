/* eslint-disable @typescript-eslint/no-floating-promises */
import fastify, { FastifyInstance } from 'fastify';
import cookie from '@fastify/cookie';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import cors from '@fastify/cors';
import fastifyEnv from '@fastify/env';

import { createContext } from './Router/context';
import { appRouter } from './Router/routers/_app';
import options from './Loaders/env';

export type { AppRouter } from './Router/routers/_app';

const Fastify: FastifyInstance = fastify({
	maxParamLength: 5000,
	trustProxy: true,
	logger: { level: 'error' },
});

Fastify.register(fastifyEnv, options)
	.register(cookie, {
		hook: 'onRequest',
		parseOptions: {
			sameSite: 'none',
			secure: true,
			httpOnly: true,
		},
	})
	.register(cors, {
		origin: ['https://shoppik.vercel.app', 'http://localhost:3000', 'http://127.0.0.1:3000'],
		methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Cookie', 'Cookies', 'Authorization'],
	})
	.register(fastifyTRPCPlugin, {
		prefix: '/trpc',
		trpcOptions: { router: appRouter, createContext },
	});

Fastify.get('/ping', () => {
	return 'Hello from tRPC !';
});

export default Fastify;

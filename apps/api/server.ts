/* eslint-disable @typescript-eslint/no-floating-promises */
import fastify, { FastifyInstance } from 'fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import cors from '@fastify/cors';
import fastifyEnv from '@fastify/env';

import { createContext } from './Router/context';
import { appRouter } from './Router/routers/_app';
import options from './Loaders/env';

export type { AppRouter } from './Router/routers/_app';

const Fastify: FastifyInstance = fastify({
	maxParamLength: 5000,
	logger: {
		level: 'error',
	},
});

Fastify.register(fastifyEnv, options)
	.register(cors, {
		origin: '*',
		methods: ['POST', 'GET', 'DELETE', 'PATCH', 'PUT'],
	})
	.register(fastifyTRPCPlugin, {
		prefix: '/trpc',
		trpcOptions: { router: appRouter, createContext },
	});
// .register(prismaPlugin)
// .then(() => systemLog.info('- Connected to Prisma'));

Fastify.get('/ping', () => {
	return 'Hello from very first tRPC !';
});

export default Fastify;

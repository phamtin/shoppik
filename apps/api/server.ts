import fastify, { FastifyInstance } from 'fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import cors from '@fastify/cors';
import fastifyEnv from '@fastify/env';

import { createContext } from './Router/context';
import redis from './Loaders/redis';
import { appRouter } from './Router';
import options from './Loaders/env';

const Fastify: FastifyInstance = fastify({
	maxParamLength: 5000,
	logger: {
		level: 'error',
	},
});

Fastify.register(fastifyEnv, options)
	.register(fastifyTRPCPlugin, {
		prefix: '/trpc',
		trpcOptions: { router: appRouter, createContext },
	})
	.register(cors, {
		origin: true,
	});

Fastify.get('/ping', async () => {
	redis._set('airdrop', 100);
	return 'Hello from very first tRPC !';
});

export type { AppRouter } from './Router';

export default Fastify;

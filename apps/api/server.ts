import fastify, { FastifyInstance } from 'fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import cors from '@fastify/cors';
import fastifyEnv from '@fastify/env';

import { createContext } from './Router/context';
import redis from './Loaders/redis';
import { appRouter } from './Router/routers/_app';
import options from './Loaders/env';

const Fastify: FastifyInstance = fastify({
	maxParamLength: 5000,
	logger: {
		level: 'error',
	},
});

await Fastify.register(fastifyEnv, options)
	.register(cors, {
		origin: true,
	})
	.register(fastifyTRPCPlugin, {
		prefix: '/trpc',
		trpcOptions: { router: appRouter, createContext },
	});

Fastify.get('/ping', async () => {
	await redis._set('airdrop', 100);
	return 'Hello from very first tRPC !';
});

export type { AppRouter } from './Router/routers/_app';

export default Fastify;

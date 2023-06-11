import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export { prisma };

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}

const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
	await prisma.$connect();

	// Make Prisma Client available through the fastify server instance: server.prisma
	server.decorate('prisma', prisma);

	server.addHook('onClose', async (server) => {
		await server.prisma.$disconnect();
	});
});

export default prismaPlugin;

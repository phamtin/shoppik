import { PrismaClient } from '@prisma/client';

const prismaGlobal = global as typeof global & {
	prisma?: PrismaClient;
};

const prisma: PrismaClient =
	prismaGlobal.prisma ||
	new PrismaClient({
		log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
	});

if (process.env.NODE_ENV !== 'production') {
	prismaGlobal.prisma = prisma;
}

export { prisma };

// // Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
// declare module 'fastify' {
// 	interface FastifyInstance {
// 		prisma: PrismaClient;
// 	}
// }

// const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
// 	await prisma.$connect();

// 	// Make Prisma Client available through the fastify server instance: server.prisma
// 	server.decorate('prisma', prisma);

// 	server.addHook('onClose', async (server) => {
// 		await server.prisma.$disconnect();
// 	});
// });

// export default prismaPlugin;

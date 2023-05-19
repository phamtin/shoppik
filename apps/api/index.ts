import Fastify from './server.js';
import systemLog from './Pkgs/systemLog.js';

process.on('unhandledRejection', (e) => {
	systemLog.error(e);
	process.exit(1);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
	process.on(signal, () =>
		Fastify.close().then(() => {
			systemLog.error(`Closed application on ${signal}`);
			process.exit(1);
		}),
	);
}

(async () => {
	try {
		await Fastify.ready();
		await Fastify.listen({ port: process.env.API_PORT as any, host: '0.0.0.0' });

		systemLog.info('- Shoppik API boosted at: 8000');
		systemLog.info('------------------------------');
	} catch (error) {
		Fastify.log.error(error);
	}
})();

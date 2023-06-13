import Fastify from './server.js';
import systemLog from './Pkgs/systemLog';

function exitHandler(exit: boolean) {
	if (exit) process.exit();
}

process.on('unhandledRejection', exitHandler.bind(null, true));
process.on('uncaughtException', exitHandler.bind(null, true));

for (const signal of ['SIGINT', 'SIGTERM']) {
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	process.on(signal, async () => {
		await Fastify.close().then(() => {
			systemLog.error(`Closed application on ${signal}`);
			process.exit(1);
		});
	});
}

await (async () => {
	try {
		await Fastify.ready();
		await Fastify.listen({ port: process.env.API_PORT as never, host: '0.0.0.0' });

		systemLog.info(`- Shoppik API boosted at: 9000`);
		systemLog.info('------------------------------');
	} catch (error) {
		Fastify.log.error(error);
	}
})();

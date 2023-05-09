import pino, { BaseLogger } from 'pino';

class Logger {
    logger: BaseLogger;
    transport: any;

    constructor() {
        this.logger = pino({
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                },
            },
        }) as BaseLogger;
    }

    info(args: any) {
        this.logger.info(args);
    }

    warn(args: any) {
        this.logger.warn(args);
    }

    error(args: any) {
        this.logger.error(args);
    }
}

const systemLog = new Logger();

export default systemLog;

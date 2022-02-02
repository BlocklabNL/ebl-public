import { config } from './config';
import { init } from './init';
import { log } from './logger';
import { app } from './app';

async function main() {
    process.on('SIGTERM', function onSigTerm() {
        log.info('Received SIGTERM. Finishing.');
        shutdown();
    });

    process.on('SIGINT', function onSigInt() {
        log.info('Received SIGINT. Finishing.');
        shutdown();
    });

    process.on('uncaughtException', function onUncaughtException(
        err: Record<string, unknown>
    ) {
        log.info('Encountered uncaughtException. Finishing.');
        shutdown(err);
    });

    const c = config();
    const d = await init(log, c).catch(function errInit(err) {
        shutdown(err);
        process.exit(1);
    });
    const server = app(log, c, d);

    async function shutdown(err?: Record<string, unknown>) {
        if (err) {
            log.error(err);
            process.exitCode = 1;
        }

        await server.stop();

        process.exit();
    }
}

main();

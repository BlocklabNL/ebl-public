import { test, Assert } from 'zora';
import pino from 'pino';
import { init } from '../src/init';
import { app, App } from '../src/app';

const log = pino(
    { enabled: process.env.DEBUG !== undefined, prettyPrint: true },
    pino.destination(2)
);

function randInt(range: number) {
    return Math.floor(3000 + Math.random() * Math.floor(range));
}

async function startIssuer() {
    const testConfig = {
        port: randInt(1000),
        agent: {
            infuraProjectId: '6417b09cfa9848a9b298df0afd9f3316',
            secretKey:
                '',
        },
    };

    const deps = await init(log, testConfig);
    return app(log, testConfig, deps);
}

export interface IntegrationTest extends Assert {
    app: App;
}

export const integration_test = async (
    name: string,
    fn: (t: Assert, app: App) => Promise<void>
): Promise<void> => {
    test(name, async (t) => {
        const app = await startIssuer();
        try {
            await fn(t, app);
        } catch (err) {
            t.fail(err.stack);
        }
        await app.stop();
    });
};

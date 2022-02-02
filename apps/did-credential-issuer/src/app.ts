import Koa from 'koa';
import http from 'http';
import bodyParser from 'koa-bodyparser';
import { Logger } from './logger';
import { Config } from './config';
import { Dependencies } from './init';

export interface App {
    stop(): Promise<void>;
    baseUrl(): string;
    deps(): Dependencies;
}

export function app(log: Logger, config: Config, deps: Dependencies): App {
    const app = new Koa();

    app.use(bodyParser())
        .use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                log.error(err);
                ctx.status = err.statusCode || err.status || 500;
                ctx.body = {
                    message: err.message,
                };
            }
        })
        .use(deps.router.routes())
        .use(deps.router.allowedMethods());

    const server = http.createServer(app.callback()).listen(config.port);
    log.info(`Listening on port ${config.port}`);

    return {
        async stop() {
            await deps.db.close();
            server.close();
        },
        baseUrl(): string {
            return `http://127.0.0.1:${config.port}`;
        },
        deps(): Dependencies {
            return deps;
        },
    };
}

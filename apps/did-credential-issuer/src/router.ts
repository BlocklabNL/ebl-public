import Koa from 'koa';
import KoaRouter from '@koa/router';
import { Agent } from 'daf-core';

export type Router = KoaRouter;

export const router = {
    create(agent: Agent): Router {
        const router = new KoaRouter();

        router.get('/', (ctx: Koa.ParameterizedContext) => {
            ctx.body = {};
        });

        router.post(
            '/issue-credential',
            async (ctx: Koa.ParameterizedContext) => {
                const req = ctx.request.body;
                const result = await agent.handleAction({
                    type: 'sign.w3c.vc.jwt',
                    data: req,
                });
                ctx.body = result;
            }
        );

        return router;
    },
};

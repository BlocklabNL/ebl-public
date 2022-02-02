import { Router, router } from './router';
import { Logger } from './logger';
import { Config } from './config';
import { agent } from './agent';
import { db, Database } from './db';
import { Agent, AbstractIdentity } from 'daf-core';

export interface Dependencies {
    router: Router;
    agent: Agent;
    db: Database;
    identity: AbstractIdentity;
}

export async function init(log: Logger, config: Config): Promise<Dependencies> {
    const deps: Dependencies = {} as Dependencies;
    deps.db = await db.createAsync();
    deps.agent = agent.create(config.agent, { db: deps.db });
    deps.identity = await deps.agent.identityManager.createIdentity();
    deps.router = router.create(deps.agent);
    return deps;
}

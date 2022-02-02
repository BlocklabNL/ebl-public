import { AgentConfig } from './agent';

export interface Config {
    port: number;
    agent: AgentConfig;
}

export function config(): Config {
    return {
        port: 3000,
        agent: {
            infuraProjectId: '6417b09cfa9848a9b298df0afd9f3316',
            secretKey:
                '',
        },
    };
}

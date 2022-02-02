import * as Daf from 'daf-core';
import * as DafEthr from 'daf-ethr-did';
import { KeyManagementSystem, SecretBox } from 'daf-libsodium';
import { W3cActionHandler, W3cMessageHandler } from 'daf-w3c';
import { JwtMessageHandler } from 'daf-did-jwt';
import { DIDCommActionHandler, DIDCommMessageHandler } from 'daf-did-comm';
import { DafResolver } from 'daf-resolver';
import { Database } from './db';

export interface AgentConfig {
    infuraProjectId: string;
    secretKey: string;
}

export interface AgentDependencies {
    db: Database;
}

export const agent = {
    create(config: AgentConfig, deps: AgentDependencies): Daf.Agent {
        return new Daf.Agent({
            dbConnection: Promise.resolve(deps.db),
            identityProviders: [
                new DafEthr.IdentityProvider({
                    kms: new KeyManagementSystem(
                        new Daf.KeyStore(
                            Promise.resolve(deps.db),
                            new SecretBox(config.secretKey)
                        )
                    ),
                    identityStore: new Daf.IdentityStore(
                        'rinkeby-ethr',
                        Promise.resolve(deps.db)
                    ),
                    network: 'rinkeby',
                    rpcUrl:
                        'https://rinkeby.infura.io/v3/' +
                        config.infuraProjectId,
                }),
            ],
            serviceControllers: [],
            didResolver: new DafResolver({
                infuraProjectId: config.infuraProjectId,
            }),
            messageHandler: new DIDCommMessageHandler()
                .setNext(new JwtMessageHandler())
                .setNext(new W3cMessageHandler()),
            actionHandler: new DIDCommActionHandler().setNext(
                new W3cActionHandler()
            ),
        });
    },
};

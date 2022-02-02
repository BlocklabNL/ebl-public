import got from 'got';
import { verifyJWT, decodeJWT } from 'did-jwt';
import { integration_test } from './run';

integration_test('GET /', async (t, app) => {
    const result = await got.get(`${app.baseUrl()}`).json();

    t.deepEqual(result, {}, 'default route does not return empty object');
});

interface Claim {
    hash: string;
    type: string;
    value: string;
    isObj: boolean;
    issuer: Record<string, unknown>;
    issuanceDate: string;
    credentialType: Array<string>;
    context: Array<string>;
}

interface Credential {
    _raw: string;
    claims: Claim[];
}

integration_test('POST /issue-credential', async (t, app) => {
    const req = {
        issuer: app.deps().identity.did,
        vc: {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential', 'AuthorizedSignatory'],
            credentialSubject: {
                id: 'did:web:uport.me',
            },
        },
    };
    const url = `${app.baseUrl()}/issue-credential`;

    const result: Credential = await got.post(url, { json: req }).json();
    await verifyJWT(result._raw, {
        resolver: app.deps().agent.didResolver,
    });

    t.ok(true, 'Should be a valid credential');
});

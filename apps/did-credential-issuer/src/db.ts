import * as Daf from 'daf-core';
import crypto from 'crypto';
import { createConnection, Connection } from 'typeorm';

export type Database = Connection;

export const db = {
    createAsync(): Promise<Database> {
        return createConnection({
            name: `dbconn-${crypto.randomBytes(10).toString('base64')}`,
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            logging: false,
            entities: Daf.Entities,
        });
    },
};

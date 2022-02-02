import pino from 'pino';

export type Logger = pino.Logger;

export const log: Logger = pino();

import type { Auth0SDK } from '../types';
interface Config {
    sessionCookieName: string;
    cookieSecret: string;
    audience: string;
    connection: string;
    scope: string;
    clientSecret: string;
    clientID: string;
    domain: string;
    sdk: Auth0SDK;
    auth0SimulatorPort: number;
    auth0GraphqlPort: number;
}
export declare function getConfig(): Config;
export declare function configValidation(config: Config): void;
export {};

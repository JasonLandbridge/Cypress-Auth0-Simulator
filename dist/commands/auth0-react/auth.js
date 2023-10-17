import { Auth0Client } from '@auth0/auth0-spa-js';
import { getConfig } from '../../utils';
const Auth0ConfigDefaults = {
    connection: 'Username-Password-Authentication',
    scope: 'openid profile email',
};
const Auth0ConfigFixed = {
    cacheLocation: 'localstorage',
    useRefreshTokens: true,
};
export function Auth0ReactConfig() {
    const config = getConfig();
    return new Auth0Client(Object.assign(Object.assign(Object.assign({}, Auth0ConfigDefaults), { audience: config.audience, client_id: config.clientID, domain: config.domain, scope: config.scope }), Auth0ConfigFixed));
}
export const authClient = Auth0ReactConfig();
//# sourceMappingURL=auth.js.map
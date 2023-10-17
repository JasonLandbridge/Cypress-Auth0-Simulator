import { WebAuth } from 'auth0-js';
import { getConfig } from '../../utils';
const Auth0ConfigDefaults = {
    connection: 'Username-Password-Authentication',
    scope: 'openid profile email',
};
const { audience, clientID, domain, scope } = getConfig();
const Auth0Config = Object.assign(Object.assign({}, Auth0ConfigDefaults), { audience,
    clientID,
    domain,
    scope });
export const auth = new WebAuth(Auth0Config);
export function Auth0JsConfig() {
    const config = getConfig();
    return new WebAuth(Object.assign(Object.assign({}, Auth0ConfigDefaults), { audience: config.audience, clientID: config.clientID, domain: config.domain, scope: config.scope, _sendTelemetry: false }));
}
export const authClient = Auth0JsConfig();
//# sourceMappingURL=auth.js.map
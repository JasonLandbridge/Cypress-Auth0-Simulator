"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authClient = exports.Auth0ReactConfig = void 0;
const auth0_spa_js_1 = require("@auth0/auth0-spa-js");
const utils_1 = require("../../utils");
const Auth0ConfigDefaults = {
    connection: 'Username-Password-Authentication',
    scope: 'openid profile email',
};
const Auth0ConfigFixed = {
    cacheLocation: 'localstorage',
    useRefreshTokens: true,
};
function Auth0ReactConfig() {
    const config = (0, utils_1.getConfig)();
    return new auth0_spa_js_1.Auth0Client(Object.assign(Object.assign(Object.assign({}, Auth0ConfigDefaults), { audience: config.audience, client_id: config.clientID, domain: config.domain, scope: config.scope }), Auth0ConfigFixed));
}
exports.Auth0ReactConfig = Auth0ReactConfig;
exports.authClient = Auth0ReactConfig();
//# sourceMappingURL=auth.js.map
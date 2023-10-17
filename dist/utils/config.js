"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configValidation = exports.getConfig = void 0;
function getConfig() {
    var _a, _b, _c, _d, _e, _f;
    const auth0SimulatorPort = (_a = Cypress.env('AUTH0_SIMULATOR_PORT')) !== null && _a !== void 0 ? _a : 4400;
    return {
        auth0SimulatorPort,
        auth0GraphqlPort: (_b = Cypress.env('AUTH0_GRAPHQL_PORT')) !== null && _b !== void 0 ? _b : 4000,
        sdk: Cypress.env('AUTH0_SDK'),
        // Auth0 sdk configuration
        audience: Cypress.env('AUTH0_AUDIENCE'),
        scope: (_c = Cypress.env('AUTH0_SCOPE')) !== null && _c !== void 0 ? _c : 'openid profile email offline_access',
        connection: (_d = Cypress.env('AUTH0_CONNECTION')) !== null && _d !== void 0 ? _d : 'Username-Password-Authentication',
        clientID: (_e = Cypress.env('AUTH0_CLIENT_ID')) !== null && _e !== void 0 ? _e : 'YOUR_AUTH0_CLIENT_ID',
        clientSecret: Cypress.env('AUTH0_CLIENT_SECRET'),
        sessionCookieName: (_f = Cypress.env('AUTH0_SESSION_COOKIE_NAME')) !== null && _f !== void 0 ? _f : 'appSession',
        cookieSecret: Cypress.env('AUTH0_COOKIE_SECRET'),
        // TODO: this breaks non-localhost custom domains as the Auth0 domain, but that seems to not be possible anyway in @simulacrum/auth0-simulator
        domain: `localhost:${auth0SimulatorPort}`,
    };
}
exports.getConfig = getConfig;
function configValidation(config) {
    function isConfigKeyValid(key) {
        return (Object.prototype.hasOwnProperty.call(config, key) && config[key] !== '');
    }
    assert.isOk(isConfigKeyValid('sdk'), 'sdk is a required option in the config');
    assert.isOk(isConfigKeyValid('clientID'), 'clientID is a required option in the config');
    assert.isOk(isConfigKeyValid('scope'), 'scope is a required option in the config');
}
exports.configValidation = configValidation;
//# sourceMappingURL=config.js.map
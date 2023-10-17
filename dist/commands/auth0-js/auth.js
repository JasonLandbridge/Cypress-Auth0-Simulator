"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authClient = exports.Auth0JsConfig = exports.auth = void 0;
const auth0_js_1 = require("auth0-js");
const utils_1 = require("../../utils");
const Auth0ConfigDefaults = {
    connection: 'Username-Password-Authentication',
    scope: 'openid profile email',
};
const { audience, clientID, domain, scope } = (0, utils_1.getConfig)();
const Auth0Config = Object.assign(Object.assign({}, Auth0ConfigDefaults), { audience,
    clientID,
    domain,
    scope });
exports.auth = new auth0_js_1.WebAuth(Auth0Config);
function Auth0JsConfig() {
    const config = (0, utils_1.getConfig)();
    return new auth0_js_1.WebAuth(Object.assign(Object.assign({}, Auth0ConfigDefaults), { audience: config.audience, clientID: config.clientID, domain: config.domain, scope: config.scope, _sendTelemetry: false }));
}
exports.Auth0JsConfig = Auth0JsConfig;
exports.authClient = Auth0JsConfig();
//# sourceMappingURL=auth.js.map
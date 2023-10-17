"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuth0JsCommands = void 0;
const get_user_tokens_1 = require("./get-user-tokens");
const get_user_info_1 = require("./get-user-info");
const login_1 = require("./login");
const utils_1 = require("../../utils");
function registerAuth0JsCommands() {
    Cypress.Commands.add('getUserTokens', get_user_tokens_1.getUserTokens);
    Cypress.Commands.add('getUserInfo', get_user_info_1.getUserInfo);
    Cypress.Commands.add('login', login_1.login);
    Cypress.Commands.add('logout', () => {
        (0, utils_1.cyLog)('logging out');
        return cy.request('/api/auth/logout').reload();
    });
}
exports.registerAuth0JsCommands = registerAuth0JsCommands;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuth0ReactCommands = void 0;
const login_1 = require("./login");
const utils_1 = require("../../utils");
function registerAuth0ReactCommands() {
    Cypress.Commands.add('login', login_1.login);
    Cypress.Commands.add('logout', () => {
        (0, utils_1.cyLog)('logging out');
        return cy.clearCookies().reload();
    });
}
exports.registerAuth0ReactCommands = registerAuth0ReactCommands;
//# sourceMappingURL=index.js.map
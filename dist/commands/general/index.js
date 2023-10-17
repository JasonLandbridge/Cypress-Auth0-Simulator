"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGeneralCommands = void 0;
const create_simulation_1 = require("./create-simulation");
const given_1 = require("./given");
const destroy_simulation_1 = require("./destroy-simulation");
function registerGeneralCommands() {
    Cypress.Commands.add('createSimulation', create_simulation_1.makeCreateSimulation);
    Cypress.Commands.add('destroySimulation', destroy_simulation_1.destroySimulation);
    Cypress.Commands.add('given', given_1.given);
}
exports.registerGeneralCommands = registerGeneralCommands;
//# sourceMappingURL=index.js.map
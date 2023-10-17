"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroySimulation = void 0;
const utils_1 = require("../../utils");
const constants_1 = require("../constants");
function destroySimulation() {
    return cy.then(() => {
        new Cypress.Promise((resolve, reject) => {
            const client = (0, utils_1.getClientFromSpec)(Cypress.spec.name);
            client
                .destroySimulation({ id: constants_1.SimulationId })
                .then(() => {
                (0, utils_1.cyLog)('simulation destroyed');
                resolve();
            })
                .catch((e) => {
                (0, utils_1.cyLog)(`destroy simulation failed with ${e.message}`);
                reject(e);
            });
        });
    });
}
exports.destroySimulation = destroySimulation;
//# sourceMappingURL=destroy-simulation.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.given = void 0;
const utils_1 = require("../../utils");
const assert_ts_1 = require("assert-ts");
function given(attrs = {}) {
    return cy.then(() => {
        return new Cypress.Promise((resolve, reject) => {
            const client = (0, utils_1.getClientFromSpec)(Cypress.spec.name);
            const simulation = (0, utils_1.getSimulationAtomSlice)();
            (0, assert_ts_1.assert)(!!simulation, 'no sumulation in given');
            client
                .given(simulation, 'person', attrs)
                .then((scenario) => {
                (0, utils_1.cyLog)('person created:', scenario);
                (0, utils_1.getAtom)()
                    .slice(Cypress.spec.name)
                    .update((current) => {
                    return Object.assign(Object.assign({}, current), { person: scenario.data });
                });
                resolve(scenario.data);
            })
                .catch((e) => {
                (0, utils_1.cyLog)('Failed to create person:', e);
                reject(e);
            });
        });
    });
}
exports.given = given;
//# sourceMappingURL=given.js.map
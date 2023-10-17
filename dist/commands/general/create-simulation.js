"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateSimulation = void 0;
const constants_1 = require("../constants");
const utils_1 = require("../../utils");
function makeCreateSimulation(options) {
    return cy.logout().then(() => {
        const client = (0, utils_1.getClientFromSpec)(Cypress.spec.name);
        const { debug = false } = options !== null && options !== void 0 ? options : { debug: false };
        const config = Object.assign(Object.assign({}, (0, utils_1.getConfig)()), options);
        (0, utils_1.cyLog)(`creating simulation with options:`, config);
        (0, utils_1.configValidation)(config);
        return new Cypress.Promise((resolve, reject) => {
            client
                .createSimulation('auth0', {
                options: {
                    audience: config.audience,
                    scope: config.scope,
                    clientID: config.clientID,
                    connection: config.connection,
                    clientSecret: config.clientSecret,
                    domain: config.domain,
                },
                services: {
                    auth0: {
                        port: config.auth0SimulatorPort,
                    },
                },
                debug,
                key: constants_1.SimulationId,
            })
                .then((simulation) => {
                (0, utils_1.getAtom)()
                    .slice(Cypress.spec.name)
                    .update((current) => {
                    return Object.assign(Object.assign({}, current), { simulation });
                });
                resolve(simulation);
            })
                .catch((e) => {
                (0, utils_1.cyLog)(`create-simulation failed ${e.message}`);
                reject(e);
            });
        });
    });
}
exports.makeCreateSimulation = makeCreateSimulation;
//# sourceMappingURL=create-simulation.js.map
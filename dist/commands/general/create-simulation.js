import { SimulationId } from '../constants';
import { configValidation, getConfig, getAtom, cyLog, getClientFromSpec, } from '../../utils';
export function makeCreateSimulation(options) {
    return cy.logout().then(() => {
        const client = getClientFromSpec(Cypress.spec.name);
        const { debug = false } = options !== null && options !== void 0 ? options : { debug: false };
        const config = Object.assign(Object.assign({}, getConfig()), options);
        cyLog(`creating simulation with options:`, config);
        configValidation(config);
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
                key: SimulationId,
            })
                .then((simulation) => {
                getAtom()
                    .slice(Cypress.spec.name)
                    .update((current) => {
                    return Object.assign(Object.assign({}, current), { simulation });
                });
                resolve(simulation);
            })
                .catch((e) => {
                cyLog(`create-simulation failed ${e.message}`);
                reject(e);
            });
        });
    });
}
//# sourceMappingURL=create-simulation.js.map
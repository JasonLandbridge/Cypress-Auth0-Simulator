import { cyLog, getClientFromSpec } from '../../utils';
import { SimulationId } from '../constants';
export function destroySimulation() {
    return cy.then(() => {
        new Cypress.Promise((resolve, reject) => {
            const client = getClientFromSpec(Cypress.spec.name);
            client
                .destroySimulation({ id: SimulationId })
                .then(() => {
                cyLog('simulation destroyed');
                resolve();
            })
                .catch((e) => {
                cyLog(`destroy simulation failed with ${e.message}`);
                reject(e);
            });
        });
    });
}
//# sourceMappingURL=destroy-simulation.js.map
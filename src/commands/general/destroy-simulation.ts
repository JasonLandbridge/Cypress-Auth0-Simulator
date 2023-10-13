import { cyLog, getClientFromSpec } from '../../utils';
import { SimulationId } from '../constants';
import type { Simulation } from '@simulacrum/client';

export function destroySimulation() {
  return cy.then(() => {
    new Cypress.Promise((resolve, reject) => {
      const client = getClientFromSpec(Cypress.spec.name);

      client
        .destroySimulation({ id: SimulationId } as Simulation)
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

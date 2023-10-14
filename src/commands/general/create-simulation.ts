import type { CreateSimulation } from '../../types';
import { SimulationId } from '../constants';
import {
  configValidation,
  getConfig,
  getAtom,
  cyLog,
  getClientFromSpec,
} from '../../utils';

export function makeCreateSimulation(options?: CreateSimulation) {
  return cy.logout().then(() => {
    const client = getClientFromSpec(Cypress.spec.name);

    const { debug = false } = options ?? { debug: false };

    const config = {
      ...getConfig(),
      ...options,
    };

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
              return {
                ...current,
                simulation,
              };
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

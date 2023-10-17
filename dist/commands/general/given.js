import { cyLog, getAtom, getClientFromSpec, getSimulationAtomSlice, } from '../../utils';
import { assert } from 'assert-ts';
export function given(attrs = {}) {
    return cy.then(() => {
        return new Cypress.Promise((resolve, reject) => {
            const client = getClientFromSpec(Cypress.spec.name);
            const simulation = getSimulationAtomSlice();
            assert(!!simulation, 'no sumulation in given');
            client
                .given(simulation, 'person', attrs)
                .then((scenario) => {
                cyLog('person created:', scenario);
                getAtom()
                    .slice(Cypress.spec.name)
                    .update((current) => {
                    return {
                        ...current,
                        person: scenario.data,
                    };
                });
                resolve(scenario.data);
            })
                .catch((e) => {
                cyLog('Failed to create person:', e);
                reject(e);
            });
        });
    });
}
//# sourceMappingURL=given.js.map
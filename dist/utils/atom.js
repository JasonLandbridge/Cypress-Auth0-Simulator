import { createAtom } from '@effection/atom';
import { createClient } from '@simulacrum/client';
import { getConfig } from './config';
const atom = createAtom({});
export function getAtom() {
    return atom;
}
export function getAtomSlice(name) {
    return atom.slice(Cypress.spec.name, name).get();
}
export function getPersonAtomSlice() {
    return getAtomSlice('person');
}
export function getSimulationAtomSlice() {
    return getAtomSlice('simulation');
}
/**
 * Get the client from the spec. If it doesn't exist, create it and store it in the atom.
 * @param spec The spec name to get the client from
 */
export function getClientFromSpec(spec) {
    let client;
    const { auth0GraphqlPort } = getConfig();
    if (typeof atom.slice(spec).get()?.client?.createSimulation !== 'function') {
        client = createClient(`http://localhost:${auth0GraphqlPort}`);
        atom.set({ [spec]: { client: client } });
    }
    else {
        client = atom.slice(spec, 'client').get();
    }
    // probably not needed but....good to know
    assert(typeof client?.createSimulation === 'function', 'no client created in getClientFromSpec');
    return client;
}
//# sourceMappingURL=atom.js.map
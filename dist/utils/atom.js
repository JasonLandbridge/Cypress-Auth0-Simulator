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
    var _a, _b;
    let client;
    const { auth0GraphqlPort } = getConfig();
    if (typeof ((_b = (_a = atom.slice(spec).get()) === null || _a === void 0 ? void 0 : _a.client) === null || _b === void 0 ? void 0 : _b.createSimulation) !== 'function') {
        client = createClient(`http://localhost:${auth0GraphqlPort}`);
        atom.set({ [spec]: { client: client } });
    }
    else {
        client = atom.slice(spec, 'client').get();
    }
    // probably not needed but....good to know
    assert(typeof (client === null || client === void 0 ? void 0 : client.createSimulation) === 'function', 'no client created in getClientFromSpec');
    return client;
}
//# sourceMappingURL=atom.js.map
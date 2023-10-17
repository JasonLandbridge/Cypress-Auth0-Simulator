"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientFromSpec = exports.getSimulationAtomSlice = exports.getPersonAtomSlice = exports.getAtomSlice = exports.getAtom = void 0;
const atom_1 = require("@effection/atom");
const client_1 = require("@simulacrum/client");
const config_1 = require("./config");
const atom = (0, atom_1.createAtom)({});
function getAtom() {
    return atom;
}
exports.getAtom = getAtom;
function getAtomSlice(name) {
    return atom.slice(Cypress.spec.name, name).get();
}
exports.getAtomSlice = getAtomSlice;
function getPersonAtomSlice() {
    return getAtomSlice('person');
}
exports.getPersonAtomSlice = getPersonAtomSlice;
function getSimulationAtomSlice() {
    return getAtomSlice('simulation');
}
exports.getSimulationAtomSlice = getSimulationAtomSlice;
/**
 * Get the client from the spec. If it doesn't exist, create it and store it in the atom.
 * @param spec The spec name to get the client from
 */
function getClientFromSpec(spec) {
    var _a, _b;
    let client;
    const { auth0GraphqlPort } = (0, config_1.getConfig)();
    if (typeof ((_b = (_a = atom.slice(spec).get()) === null || _a === void 0 ? void 0 : _a.client) === null || _b === void 0 ? void 0 : _b.createSimulation) !== 'function') {
        client = (0, client_1.createClient)(`http://localhost:${auth0GraphqlPort}`);
        atom.set({ [spec]: { client: client } });
    }
    else {
        client = atom.slice(spec, 'client').get();
    }
    // probably not needed but....good to know
    assert(typeof (client === null || client === void 0 ? void 0 : client.createSimulation) === 'function', 'no client created in getClientFromSpec');
    return client;
}
exports.getClientFromSpec = getClientFromSpec;
//# sourceMappingURL=atom.js.map
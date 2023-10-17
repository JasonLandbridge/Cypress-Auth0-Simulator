"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const assert_ts_1 = require("assert-ts");
const utils_1 = require("../../utils");
function login() {
    return cy.then(() => {
        return new Cypress.Promise((resolve, reject) => {
            Promise.resolve().then(() => __importStar(require('./auth'))).then((m) => m.authClient)
                .then((auth0Client) => {
                const person = (0, utils_1.getPersonAtomSlice)();
                (0, assert_ts_1.assert)(!!person && typeof person.email !== 'undefined', `no scenario in login`);
                auth0Client
                    .getTokenSilently({
                    currentUser: person.email,
                    test: Cypress.currentTest.title,
                    // Ensures a fresh token is always retrieved
                    ignoreCache: true,
                })
                    .then((token) => {
                    (0, utils_1.cyLog)(`successfully logged in with token ${JSON.stringify(token)}`);
                    auth0Client.isAuthenticated().then((isAuthenticated) => {
                        (0, utils_1.cyLog)(`Is user authenticated:`, isAuthenticated);
                    });
                    auth0Client.getUser().then((userObject) => {
                        (0, utils_1.cyLog)(`logged in user object:`, userObject);
                    });
                    resolve(token);
                })
                    .catch((e) => {
                    (0, utils_1.cyLog)(`login failed with error:`, e);
                    reject(e);
                });
            });
        });
    });
}
exports.login = login;
//# sourceMappingURL=login.js.map
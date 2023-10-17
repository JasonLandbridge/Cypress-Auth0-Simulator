"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const assert_ts_1 = require("assert-ts");
const utils_1 = require("../../utils");
function login() {
    const { sessionCookieName, cookieSecret, audience } = (0, utils_1.getConfig)();
    try {
        cy.getCookie(sessionCookieName).then((cookieValue) => {
            (0, utils_1.cyLog)(`cookie ${sessionCookieName} is ${cookieValue}`);
            if (cookieValue) {
                (0, utils_1.cyLog)('Skip logging in again, session already exists');
                return true;
            }
            else {
                cy.clearCookies();
                const person = (0, utils_1.getPersonAtomSlice)();
                (0, assert_ts_1.assert)(!!person, `no scenario in login`);
                (0, assert_ts_1.assert)(!!person.email, 'no email defined in scenario');
                cy.getUserTokens(person).then((response) => {
                    const { accessToken, expiresIn, idToken, scope } = response;
                    (0, utils_1.cyLog)(`successfully called getUserTokens with ${person === null || person === void 0 ? void 0 : person.email}`);
                    (0, assert_ts_1.assert)(!!accessToken, 'no access token in login');
                    cy.getUserInfo(accessToken).then((user) => {
                        (0, assert_ts_1.assert)(typeof expiresIn !== 'undefined', 'no expiresIn in login');
                        const payload = {
                            secret: cookieSecret,
                            audience,
                            user,
                            idToken,
                            accessToken,
                            accessTokenScope: scope,
                            accessTokenExpiresAt: Date.now() + expiresIn,
                            createdAt: Date.now(),
                        };
                        cy.task('encrypt', payload).then((encryptedSession) => {
                            (0, utils_1.cyLog)('successfully encrypted session');
                            cy.setCookie(sessionCookieName, encryptedSession);
                        });
                    });
                });
            }
        });
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
exports.login = login;
//# sourceMappingURL=login.js.map
import { assert } from 'assert-ts';
import { cyLog, getConfig, getPersonAtomSlice } from '../../utils';
export function login() {
    const { sessionCookieName, cookieSecret, audience } = getConfig();
    try {
        cy.getCookie(sessionCookieName).then((cookieValue) => {
            cyLog(`cookie ${sessionCookieName} is ${cookieValue}`);
            if (cookieValue) {
                cyLog('Skip logging in again, session already exists');
                return true;
            }
            else {
                cy.clearCookies();
                const person = getPersonAtomSlice();
                assert(!!person, `no scenario in login`);
                assert(!!person.email, 'no email defined in scenario');
                cy.getUserTokens(person).then((response) => {
                    const { accessToken, expiresIn, idToken, scope } = response;
                    cyLog(`successfully called getUserTokens with ${person?.email}`);
                    assert(!!accessToken, 'no access token in login');
                    cy.getUserInfo(accessToken).then((user) => {
                        assert(typeof expiresIn !== 'undefined', 'no expiresIn in login');
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
                            cyLog('successfully encrypted session');
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
//# sourceMappingURL=login.js.map
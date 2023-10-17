import { cyLog, getConfig } from '../../utils';
export function getUserTokens(person) {
    return cy.then(() => {
        const { email, password } = person;
        const { audience, scope, clientSecret } = getConfig();
        assert([email, password, clientSecret].every(Boolean), 'email, auth0ClientSecret and password are required');
        cyLog(`about to attempt login with email: ${email}`);
        return new Cypress.Promise((resolve, reject) => {
            import('./auth')
                .then((m) => m.authClient)
                .then((auth) => {
                auth.client.loginWithDefaultDirectory({
                    username: email,
                    password,
                    audience,
                    scope,
                    client_secret: clientSecret,
                }, (err, response) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        cyLog(`Login was successful for ${email}`);
                        resolve(response);
                    }
                });
            });
        });
    });
}
//# sourceMappingURL=get-user-tokens.js.map
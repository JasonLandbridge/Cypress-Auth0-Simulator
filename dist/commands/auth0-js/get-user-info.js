export function getUserInfo(accessToken) {
    cy.then(() => {
        return new Cypress.Promise((resolve, reject) => {
            import('./auth')
                .then((m) => m.authClient)
                .then((auth) => {
                auth.client.userInfo(accessToken, (err, user) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(user);
                });
            });
        });
    });
}
//# sourceMappingURL=get-user-info.js.map
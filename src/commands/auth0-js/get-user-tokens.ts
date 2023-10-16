import type { Person } from '../../types';
import type { DefaultDirectoryLoginOptions } from 'auth0-js';
import { cyLog, getConfig } from '../../utils';
import type { Auth0Result } from 'auth0-js';

export function getUserTokens(
  person: Person,
): Cypress.Chainable<Auth0Result & { scope: string }> {
  const { email, password } = person;
  const { audience, scope, clientSecret } = getConfig();

  assert(
    [email, password, clientSecret].every(Boolean),
    'email, auth0ClientSecret and password are required',
  );

  cyLog(`about to attempt login with email: ${email}`);
  const promise: Promise<Auth0Result & { scope: string }> = new Promise(
    (resolve, reject) => {
      import('./auth')
        .then((m) => m.authClient)
        .then((auth) => {
          auth.client.loginWithDefaultDirectory(
            {
              username: email,
              password,
              audience,
              scope,
              client_secret: clientSecret,
            } as DefaultDirectoryLoginOptions,
            (err, response) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                cyLog(`Login was successful for ${email}`);
                resolve(response);
              }
            },
          );
        });
    },
  );
  return cy.wrap(promise);
}

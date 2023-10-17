import type { Person } from '../../types';
import type { Auth0Result } from 'auth0-js';
export declare function getUserTokens(person: Person): Cypress.Chainable<Auth0Result & {
    scope: string;
}>;

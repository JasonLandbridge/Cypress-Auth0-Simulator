import { getUserTokens } from './get-user-tokens';
import { getUserInfo } from './get-user-info';
import { login } from './login';
import { cyLog } from '../../utils';

export function registerAuth0JsCommands() {
  Cypress.Commands.add('getUserTokens', getUserTokens);
  Cypress.Commands.add('getUserInfo', getUserInfo);
  Cypress.Commands.add('login', login);
  Cypress.Commands.add('logout', () => {
    cyLog('logging out');
    return cy.request('/api/auth/logout').reload();
  });
}

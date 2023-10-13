import { encrypt } from '../../src';

export default (on: Cypress.PluginEvents) => {
  on('task', { encrypt });
};

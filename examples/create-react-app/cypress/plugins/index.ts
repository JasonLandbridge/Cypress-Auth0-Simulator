/* eslint-disable @typescript-eslint/no-var-requires */

import { encrypt } from '../../../../dist';

module.exports = (on: Cypress.PluginEvents) => {
  on('task', { encrypt });
};

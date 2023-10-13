import type { CreateSimulation, Person } from '../types';
import { Auth0SDK } from '../types';
import type { Auth0Result } from 'auth0-js';
import { getConfig } from '../utils';
import { registerGeneralCommands } from './general';
import { registerAuth0JsCommands } from './auth0-js';
import { registerAuth0ReactCommands } from './auth0-react';

function setupAuth0CypressCommands() {
  const config = getConfig();

  const provider = config.sdk;

  registerGeneralCommands();

  switch (provider) {
    case Auth0SDK.Auth0JS:
      registerAuth0JsCommands();
      break;
    case Auth0SDK.Auth0Vue:
      // Auth0 Vue uses the same commands as Auth0 React, using the native Auth0Vue SDK is not supported due to only 1 instance being allowed of the Auth0Vue SDK
      registerAuth0ReactCommands();
      break;
    case Auth0SDK.Auth0React:
      registerAuth0ReactCommands();
      break;
    case Auth0SDK.Auth0NextJS:
      registerAuth0JsCommands();
      break;
    default:
      throw new Error(`Unknown Auth0 SDK: ${provider}`);
  }
}

setupAuth0CypressCommands();

export {};

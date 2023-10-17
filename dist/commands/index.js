"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const general_1 = require("./general");
const auth0_js_1 = require("./auth0-js");
const auth0_react_1 = require("./auth0-react");
function setupAuth0CypressCommands() {
    const config = (0, utils_1.getConfig)();
    const provider = config.sdk;
    (0, general_1.registerGeneralCommands)();
    switch (provider) {
        case "auth0-js" /* Auth0SDK.Auth0JS */:
            (0, auth0_js_1.registerAuth0JsCommands)();
            break;
        case "auth0-vue" /* Auth0SDK.Auth0Vue */:
            // Auth0 Vue uses the same commands as Auth0 React, using the native Auth0Vue SDK is not supported due to only 1 instance being allowed of the Auth0Vue SDK
            (0, auth0_react_1.registerAuth0ReactCommands)();
            break;
        case "auth0-react" /* Auth0SDK.Auth0React */:
            (0, auth0_react_1.registerAuth0ReactCommands)();
            break;
        case "nextjs-auth0" /* Auth0SDK.Auth0NextJS */:
            (0, auth0_js_1.registerAuth0JsCommands)();
            break;
        default:
            throw new Error(`Unknown Auth0 SDK: ${provider}`);
    }
}
setupAuth0CypressCommands();
//# sourceMappingURL=index.js.map
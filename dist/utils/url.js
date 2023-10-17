"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineURLs = void 0;
function combineURLs(baseURL, relativeURL) {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
}
exports.combineURLs = combineURLs;
//# sourceMappingURL=url.js.map
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import hkdf from 'futoin-hkdf';
import { EncryptJWT } from 'jose';
const BYTE_LENGTH = 32;
const ENCRYPTION_INFO = 'JWE CEK';
const deriveKey = (secret) => hkdf(secret, BYTE_LENGTH, { info: ENCRYPTION_INFO, hash: 'SHA-256' });
export function encrypt(arg) {
    const { secret } = arg, thingToEncrypt = __rest(arg, ["secret"]);
    const epochNow = (Date.now() / 1000) | 0;
    return new EncryptJWT(thingToEncrypt)
        .setProtectedHeader({
        alg: 'dir',
        enc: 'A256GCM',
        uat: epochNow,
        iat: epochNow,
        exp: epochNow + 7 * 24 * 60 * 60,
    })
        .setIssuedAt(epochNow)
        .setExpirationTime(epochNow + 7 * 24 * 60 * 60)
        .encrypt(deriveKey(secret));
}
//# sourceMappingURL=encrypt.js.map
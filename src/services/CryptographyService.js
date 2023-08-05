import ecdsa from 'ecdsa-secp256k1';
import CryptoJS, {SHA256} from 'crypto-js';
import {Buffer} from 'buffer';
import bs58 from 'bs58';
import Account from "../models/Account.js";

class CryptographyService {
    static createPubKeyHash(privateKey) {
        const point = ecdsa.getPublicKeyPoint(privateKey);
        const pubKeyHash = point.x.toString(16)
            .concat(point.y.toString(16));

        return this.hashSHA256(this.hashSHA256(pubKeyHash));
    }

    static async createWallet() {
        const privateKeyHex = ecdsa.randPrivateKeyNum();

        return new Account(this.convertToAddress(privateKeyHex), privateKeyHex.toString(16), this.#convertToWIF(privateKeyHex.toString(16)));
    }

    static #convertToWIF(privateKey) {
        const extendedKey = "80".concat(privateKey);

        const hash = this.hashSHA256(this.hashSHA256(extendedKey));

        const checkSum = hash.substr(0, 8);

        const extendedWithCheckSum = extendedKey.concat(checkSum);

        return bs58.encode(Buffer.from(extendedWithCheckSum, 'hex'))
    }

    static convertToAddress(privateKey) {
        const point = ecdsa.getPublicKeyPoint(privateKey);

        const pubKeyConcat = "04".concat(point.x.toString(16)
            .concat(point.y.toString(16)));

        const hash = this.hashSHA256(pubKeyConcat);

        const ripeMDHash = this.hashRIPEMD160(hash);

        const prefixedHash = "00".concat(ripeMDHash);

        const sha256CheckSum = this.hashSHA256(this.hashSHA256(prefixedHash));

        const checkSum = sha256CheckSum.substr(0, 8);

        const extendedWithCheckSum = prefixedHash.concat(checkSum);

        return bs58.encode(Buffer.from(extendedWithCheckSum, 'hex'));
    }

    static hashSHA256(data) {
        const wordArray = CryptoJS.enc.Hex.parse(data);

        return CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
    }

    static hashRIPEMD160(data) {
        const wordArray = CryptoJS.enc.Hex.parse(data);

        return CryptoJS.RIPEMD160(wordArray).toString(CryptoJS.enc.Hex);
    }

    static uint8ArrayToHexString(uint8Array) {
        return Array.from(uint8Array, (byte) => {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    }
}

export default CryptographyService;


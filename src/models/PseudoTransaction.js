import CryptographyService from "../services/CryptographyService.js";

import ecdsa from 'ecdsa-secp256k1';
import {SHA256} from "crypto-js";

class PseudoTransaction {
    constructor() {
        this.pseudoHash = "";
        this.from = "";
        this.to = "";
        this.version = 0;
        this.value = "";
        this.nonce = 0;
        this.timeStamp = 0;
        this.fees = "";
        this.status = null;
        this.pubKeyHash = "";
        this.signature = null;
    }

    setPseudoHash(pseudoHash) {
        this.pseudoHash = pseudoHash;
    }

    getPseudoHash () {
        return this.pseudoHash;
    }

    setFrom(from) {
        this.from = from;
    }

    setValue(value) {
        this.value = value;
    }

    setTo(to) {
        this.to = to;
    }

    setVersion(version) {
        this.version = version;
    }

    setNonce(nonce) {
        this.nonce = nonce;
    }

    setTimeStamp(timeStamp) {
        this.timeStamp = timeStamp;
    }

    setFees(fees) {
        this.fees = fees;
    }

    setStatus(status) {
        this.status = status;
    }

    setPubKeyHash(pubKeyHash) {
        this.pubKeyHash = pubKeyHash;
    }

    signPseudoTransaction(privateKey) {
        this.setPubKeyHash(CryptographyService.createPubKeyHash(privateKey));

        const transactionJSON = {
            from: this.from,
            to: this.to,
            version: this.version,
            value: this.value,
            nonce: this.nonce,
            time_stamp: this.timeStamp,
            fees: this.fees,
            pub_key_hash: this.pubKeyHash,
        };

        const sortedKeys = Object.keys(transactionJSON).sort();
        const sortedFields = {};
        for (const key of sortedKeys) {
            sortedFields[key] = transactionJSON[key];
        }


        const sha1 = SHA256(JSON.stringify(sortedFields)).toString();


        const msgDataNum = BigInt('0x' + sha1);

        let sig = ecdsa.sign(privateKey, msgDataNum);

        let r = sig.r.toString(16);
        let s = sig.s.toString(16);

        this.signature = { r, s };

        const hashingFields = {
            from: this.from,
            to: this.to,
            version: this.version,
            value: this.value,
            nonce: this.nonce,
            time_stamp: this.timeStamp,
            fees: this.fees,
            pub_key_hash: this.pubKeyHash,
            signature: this.signature
        };

        const sortedKeysHash = Object.keys(hashingFields).sort();
        const sortedFieldsHash = {};
        for (const key of sortedKeysHash) {
            sortedFieldsHash[key] = hashingFields[key];
        }

        this.pseudoHash = SHA256(JSON.stringify(sortedFieldsHash)).toString();

        //console.log(JSON.stringify(sortedFieldsHash));
    }

    toJSON() {
        return JSON.stringify({
            pseudo_hash: this.pseudoHash,
            from: this.from,
            to: this.to,
            version: this.version,
            value: this.value,
            nonce: this.nonce,
            time_stamp: this.timeStamp,
            fees: this.fees,
            status: this.status,
            pub_key_hash: this.pubKeyHash,
            signature: this.signature,
        });
    }
}

export default PseudoTransaction;
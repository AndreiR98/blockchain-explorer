import APIServices from "../services/APIServices.js";

const TransactionStatus = {
    PENDING: 1,
    VALIDATED: 2,
    PROCESSED: 3,
    SUCCESS: 4,

    getCode() {
        return this.value;
    },

    valueOfCode(code) {
        for (const key of Object.keys(this)) {
            if (this[key] === code) {
                return key;
            }
        }
        return null;
    },
};

export default TransactionStatus;
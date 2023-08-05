class Account {
    constructor(address, privateKey, wif) {
        this.address = address;
        this.privateKey = privateKey;
        this.wif = wif;
    }

    getAddress() {
        return this.address;
    }

    getPrivateKey() {
        return this.privateKey;
    }

    getWif() {
        return this.wif;
    }
}

export default Account;
import axios from 'axios';

class APIServices {
    static searchByDataHash(dataHash) {
        return axios.post('http://3.8.20.9:8080/explorer/', {
            dataHash: dataHash
        });
    }

    static requestAccountBalance(address) {
        return axios.post('http://3.8.20.9:8080/account/addresses', {
            address: address
        });
    }

    static getLatest() {
        return axios.get('http://3.8.20.9:8080/websocket/latest');
    }

    static sendPseudoTransaction(dataJSON) {
        return axios.post('http://3.8.20.9:8080/transaction/send-transaction', JSON.parse(dataJSON));
    }

    static searchTransactionHash(hash) {
        return axios.get('http://3.8.20.9:8080/explorer/transaction/'+hash);
    }

    static searchAccountAddress(address) {
        return axios.get('http://3.8.20.9:8080/explorer/address/'+address);
    }

    static searchBlockIndex(index) {
        return axios.get('http://3.8.20.9:8080/explorer/block/'+index);
    }
}

export default APIServices;
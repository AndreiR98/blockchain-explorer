import axios from 'axios';

class APIServices {
    static searchByDataHash(dataHash) {
        return axios.post('http://localhost:7070/explorer/', {
            dataHash: dataHash
        });
    }

    static requestAccountBalance(address) {
        return axios.post('http://localhost:7070/account/addresses', {
            address: address
        });
    }

    static sendPseudoTransaction(dataJSON) {
        return axios.post('http://localhost:7070/transaction/send-transaction', JSON.parse(dataJSON));
    }

    static searchTransactionHash(hash) {
        return axios.get('http://localhost:7070/explorer/transaction/'+hash);
    }

    static searchAccountAddress(address) {
        return axios.get('http://localhost:7070/explorer/address/'+address);
    }

    static searchBlockIndex(index) {
        return axios.get('http://localhost:7070/explorer/block/'+index);
    }
}

export default APIServices;
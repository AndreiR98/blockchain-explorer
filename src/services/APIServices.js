import axios from 'axios';

class APIServices {
    static searchByDataHash(dataHash) {
        return axios.post('http://localhost:7070/explorer/', {
            dataHash: dataHash
        });
    }

}

export default APIServices;
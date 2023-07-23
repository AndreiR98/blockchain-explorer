class DataUtils {
    static parseResponseExplorer(responseData) {
        if (responseData.status === 'SUCCESS') {
            if(responseData.accountAddress != null) {
                return { category: 'account', data: responseData};
            } else if(responseData.transactionHash != null) {
                return { category: 'transaction', data: responseData };
            } else if (responseData.blockHash != null || responseData.blockIndex != null) {
                return { category: 'block', data: responseData };
            }
        }

        return null;
    }
}

export default DataUtils;
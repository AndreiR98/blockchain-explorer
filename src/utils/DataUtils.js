import bigInt from "big-integer";
import Decimal from "decimal.js";

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

    static formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // Set this to false for 24-hour format
        };
        return date.toLocaleString(undefined, options);
    };

    static currencyFormat = (amount) => {
        const formattedAmount = new Decimal(amount);
        return '' + formattedAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '0,')
    }
}

export default DataUtils;
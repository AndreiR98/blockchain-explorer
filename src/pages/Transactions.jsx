import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import APIServices from "../services/APIServices.js";
import DataUtils from "../utils/DataUtils.js";

const Transactions = () => {
    const { txHash } = useParams();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            APIServices.searchTransactionHash(txHash)
                .then((response) => {
                    setResult(response.data);
                })
                .catch((error) => {
                    // Handle error if needed
                    console.error("Error fetching data:", error);
                });
        };

        fetchData();
    }, [txHash]);

    return (
        <div>
            <h2>Transaction:</h2>
            {result ? (
                <ul>
                    <li>Hash: {result.hash}</li>
                    <li>Pseudo Hash: {result.pseudo_hash}</li>
                    <li>Block Number: <a href={`#/block/${result.block_number}`}>{result.block_number}</a></li>
                    <li>From: <a href={`#/address/${result.from}`}>{result.from}</a></li>
                    <li>To: <a href={`#/address/${result.to}`}>{result.to}</a></li>
                    <li>Fees: {result.fees}</li>
                    <li>Version: {result.version}</li>
                    <li>Transaction Index: {result.transaction_index}</li>
                    <li>Value: {result.value}</li>
                    <li>Nonce: {result.nonce}</li>
                    <li>Time Stamp: {DataUtils.formatDateTime(result.time_stamp)}</li>
                    <li>Confirmations: {result.confirmations}</li>
                    <li>Block Time: {DataUtils.formatDateTime(result.block_time)}</li>
                    <li>Transaction Status: {result.transaction_status}</li>
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Transactions;

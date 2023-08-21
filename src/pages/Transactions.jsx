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
                    //console.log(response.data);
                })
                .catch((error) => {
                    // Handle error if needed
                    console.error("Error fetching data:", error);
                });
        };

        fetchData();
    }, [txHash]);

    return (
        <div className="font-body text-black absolute flex top-[10rem] left-[20rem] w-fit h-fit     ">
            {/*<div className="relative flex top-0 left-2 border-l-2 border-t-2 border-r-2 w-fit h-fit     ">*/}
            {/*    <h2 className="">Transaction:</h2>*/}
            {/*</div>*/}


            {result ? (
                <ul className="flex relative flex-col top-7 right-[7.1rem] ">
                  <div className="flex flex-col relative space-y-2 p-2  border-2  ">
                      <h2 className="">Transaction:</h2>
                    <li className="relative flex  break-all w-[32rem] ">Hash: {result.hash}</li>
                    <li className="relative flex  break-all w-[32rem] ">Pseudo Hash: {result.pseudo_hash}</li>
                  </div>

                      <div className="flex flex-col relative p-2 top-1   border-2 ">
                        <li>From: <a className="hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent "  href={`#/address/${result.from}`}>{result.from}</a></li>
                        <li>To: <a className="hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent " href={`#/address/${result.to}`}>{result.to}</a></li>
                      </div>
                    <div className="relative flex flex-col lg1:-top-[14rem] lg1:left-[35rem] lg:left-[0rem] lg:top-[14] duration-1000 border-2 p-2 ">
                        <p>Advanced Details</p>
                        <li>Block Number: <a className="hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent " href={`#/block/${result.block_number}`}>{result.block_number}</a></li>
                        <li>Fees: {result.fees.fees}</li>
                        <li>Networking Fees: {result.fees.networkFees}</li>
                        <li>Version: {result.version}</li>
                        <li>Transaction Index: {result.transaction_index}</li>
                        <li>Value: {result.value}</li>
                        <li>Nonce: {result.nonce}</li>
                        <li>Time Stamp: {DataUtils.formatDateTime(result.time_stamp)}</li>
                        <li>Confirmations: {result.confirmations}</li>
                        <li>Block Time: {DataUtils.formatDateTime(result.block_time)}</li>
                        <li>Transaction Status: {result.transaction_status}</li>
                    </div>
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Transactions;

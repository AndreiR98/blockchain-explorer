import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import APIServices from "../services/APIServices.js";
import DataUtils from "../utils/DataUtils.js";

const Account = () => {
    const { address } = useParams();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            APIServices.searchAccountAddress(address)
                .then((response) => {
                    setResult(response.data);
                })
                .catch((error) => {
                    // Handle error if needed
                    console.error("Error fetching data:", error);
                });
        };

        fetchData();
    }, [address]);

    return (
        <div className="absolute flex font-body top-[7rem] left-[15rem]   ">
            {result ? (
                <ul>
                    <div className="flex relative border-2 flex-col p-2  ">
                        <h2>Account Details:</h2>
                        <li>Address {result.address}</li>
                    </div>
                    <div className="flex relative border-2 rounded-lg bg-gradient-to-r mt-2 from-textcolor to-textcolor2">
                        <li className="text-white ">Balance: {DataUtils.currencyFormat(result.balance)}</li>
                    </div>
                    <div className="flex relative flex-col border-2 mt-2  ">
                        <li>Outbound amount: {result.outbound_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</li>
                        <li>Inbound amount: {result.inbound_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</li>
                    </div>
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Account;

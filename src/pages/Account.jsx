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
        <div>
            <h2>Account:</h2>
            {result ? (
                <ul>
                    <li>Address {result.address}</li>
                    <li>Balance: {result.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</li>
                    <li>Outbound amount: {result.outbound_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</li>
                    <li>Inbound amount: {result.inbound_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</li>
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Account;

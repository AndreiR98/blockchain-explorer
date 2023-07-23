import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import APIServices from "../services/APIServices.js";
import DataUtils from "../utils/DataUtils.js";

const Blocks = () => {
    const { blockIndex } = useParams();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            APIServices.searchBlockIndex(blockIndex)
                .then((response) => {
                    setResult(response.data);
                })
                .catch((error) => {
                    // Handle error if needed
                    console.error("Error fetching data:", error);
                });
        };

        fetchData();
    }, [blockIndex]);

    return (
        <div>
            <h2>Block: {result.block.index}</h2>
            {result ? (
                <ul>
                    <li>Hash: {result.block.hash}</li>
                    <li>Version: {result.block.version}</li>
                    <li>Markle root: {result.block.markleRoot}</li>
                    <li>Time stamp: {DataUtils.formatDateTime(result.block.timeStamp)}</li>
                    <li>Nonce: {result.block.nonce}</li>
                    {/*TODO:Implement check/format fetch for previous block index based on previousHash*/}
                    <li>Previous hash: <a href={`#/block/${result.block.previousHash}`}>{result.block.previousHash}</a></li>
                    <li>Difficulty: {result.block.difficulty}</li>
                    <li>Fork hash: <a href={`#/block/${result.block.forkHash}`}>{result.block.forkHash}</a></li>
                    <li>Reward: {result.block.reward}</li>
                    <li>Index: <a href={`#/block/${result.block.index}`}>{result.block.index}</a></li>
                    <li>Miner: <a href={`#/address/${result.block.miner}`}>{result.block.miner}</a></li>
                    <li>Confirmations: {result.block.confirmations}</li>
                    <li>Status: {result.block.status}</li>
                    <li>Transactions :</li>
                    {Array.isArray(result.block.transactions) &&
                        result.block.transactions.map((transaction) => (
                            <li key={transaction}><a href={`#/transaction/${transaction}`}>{transaction}</a></li>
                        ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Blocks;

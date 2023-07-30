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
                    setResult(response.data.block);
                })
                .catch((error) => {
                    // Handle error if needed
                    console.error("Error fetching data:", error);
                });
        };

        fetchData();
    }, [blockIndex]);

    return (
        <div className="flex absolute font-body lg:top-[10rem] lg:left-[20rem] xss:top-[10rem] xss:left-[12rem] duration-1000 ">

            {result ? (
                <ul>

                    <div className="relative flex flex-col p-2 border-2 space-y-[5px] lg:w-[50rem] h-fit  duration-1000  ">
                        <div className="relative flex border-2 text-xl mb-4  ">
                            <li>Block:{result.index}</li>
                        </div>
                        <p className="relative flex mb-2 w-fit h-fit text-xl">Details:</p>
                        <div className="border-r-2 w-fit pr-2 space-y-1 ">
                            <li className="flex break-all w-[22rem]">Hash: {result.hash}</li>
                            <li className="flex flex-col w-[22rem]">
                                {result.index !== 0 ? (
                                    <>
                                        Previous hash:{" "}
                                        <a
                                            className="flex break-all w-[22rem] hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent "
                                            href={`#/block/${result.previousHash}`}
                                        >
                                            {result.previousHash}
                                        </a>
                                    </>
                                ) : (
                                    <> </>
                                )}
                            </li>
                            <li className="flex flex-col w-[22rem]">
                                {result.index ==="0000000000000000000000000000000000000000000000000000000000000000" ? (
                                    <>
                                        Fork hash:
                                        <a className="flex break-all w-[20rem] hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent"
                                           href={`#/block/${result.forkHash}`}
                                        >
                                            {result.forkHash}
                                        </a>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </li>

                            <li>Version: {result.version}</li>
                            <li className="flex flex-col w-[25rem] break-all">Markle root: {result.markleRoot}</li>
                            <li>Time stamp: {DataUtils.formatDateTime(result.timeStamp)}</li>
                            <li>Nonce: {result.nonce}</li>
                            {/*TODO:Implement check/format fetch for previous block index based on previousHash*/}
                            <li>Difficulty: {result.difficulty}</li>
                            <li>Reward: {result.reward}</li>
                            <li>Index: <a className="hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent" href={`#/block/${result.index}`}>{result.index}</a></li>

                            <li>Miner:
                                {result.index !==0 ? (
                                        <a className="hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent"
                                           href={`#/address/${result.miner}`}>{result.miner}</a>
                                    ) : (
                                     <>{result.miner}</>
                                    )}
                                </li>

                            <li>Confirmations: {result.confirmations}</li>
                            <li>Status: {result.status}</li>
                        </div>
                        <div className="lg:absolute flex flex-col break-all w-[22rem] lg:top-[4rem] lg:left-[27rem]  duration-1000  space-y-1 ">
                            <li>Transactions :</li>
                            {Array.isArray(result.transactions) &&
                                result.transactions.map((transaction) => (
                                    <li key={transaction}><a className="hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent" href={`#/transaction/${transaction}`}>{transaction}</a></li>
                                ))}
                        </div>
                    </div>



                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Blocks;

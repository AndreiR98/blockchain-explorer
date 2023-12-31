import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import APIServices from "../services/APIServices.js";
import DataUtils from "../utils/DataUtils.js";

const Blocks = () => {
    const { blockIndex } = useParams();
    const [result, setResult] = useState(null);
    const [totalValue ,setTotalValue] = useState(0);
    const [totalFees, setTotalFees] = useState(0);

    const transactionsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    console.log(blockIndex)

    useEffect(() => {
        const fetchData = () => {
            APIServices.searchBlockIndex(blockIndex)
                .then((response) => {
                    setResult(response.data.block);
                    setTotalFees(response.data.total_fees);
                    setTotalValue(response.data.total_value);
                })
                .catch((error) => {
                    // Handle error if needed
                    console.error("Error fetching data:", error);
                });
        };

        fetchData();
    }, [blockIndex]);

    //Logic to get the transactions for the current page
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

    const currentTransactions = Array.isArray(result?.transactions)
        ? result.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
        : [];

    // Function to handle page changes
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex absolute font-body lg:top-[10rem] lg:left-[20rem] xss:top-[10rem] xss:left-[12rem] duration-1000 ">

            {result ? (
                <ul>

                    <div className="relative flex flex-col p-2 border-2 space-y-[5px] lg:w-[50rem] h-fit  duration-1000  ">
                        <div className="relative flex border-2 text-xl mb-4  ">
                            <li>Block:{result.header.index}</li>
                        </div>
                        <p className="relative flex mb-2 w-fit h-fit text-xl">Details:</p>
                        <div className="border-r-2 w-fit pr-2 space-y-1 ">
                            <li className="flex break-all w-[22rem]">Hash: {result.header.hash}</li>
                            <li className="flex flex-col w-[22rem]">
                                {result.header.index !== 0 ? (
                                    <>
                                        Previous hash:{" "}
                                        <a
                                            className="flex break-all w-[22rem] hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent "
                                            href={`#/block/${result.header.previousHash}`}
                                        >
                                            {result.header.previousHash}
                                        </a>
                                    </>
                                ) : (
                                    <> </>
                                )}
                            </li>
                            <li className="flex flex-col w-[22rem]">
                                {result.forkHash !== "0000000000000000000000000000000000000000000000000000000000000000" ? (
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

                            <li>Version: {result.header.version}</li>
                            <li className="flex flex-col w-[25rem] break-all">Markle root: {result.header.markleRoot}</li>
                            <li>Time stamp: {DataUtils.formatDateTime(result.header.timeStamp)}</li>
                            <li>(<i>when mining started</i>)</li>
                            <li>Block time: {DataUtils.formatDateTime(result.header.blockTime)}</li>
                            <li>(<i>when mining finished</i>)</li>
                            <li>Nonce: {result.header.nonce}</li>
                            {/*TODO:Implement check/format fetch for previous block index based on previousHash*/}
                            <li>Difficulty: {result.header.difficulty}</li>
                            <li>Reward: {result.header.reward}</li>
                            <li>Total value: {totalValue}</li>
                            <li>Total fees: {totalFees}</li>
                            <li>Index: <a className="hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent" href={`#/block/${result.header.index}`}>{result.header.index}</a></li>

                            <li>Miner:
                                {result.header.index !== 0 ? (
                                        <a className="hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent"
                                           href={`#/address/${result.header.minerAddress}`}>{result.header.minerAddress}</a>
                                    ) : (
                                     <>{result.header.minerAddress}</>
                                    )}
                                </li>

                            <li>Confirmations: {result.confirmations}</li>
                            <li>Status: {result.status}</li>
                        </div>
                        <div className="lg:absolute flex flex-col break-all w-[22rem] lg:top-[4rem] lg:left-[27rem]  duration-1000  space-y-1 ">
                            <li>Transactions :</li>
                            {currentTransactions.map((transaction) => (
                                <li key={transaction}>
                                    <a
                                        className="hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent"
                                        href={`#/transaction/${transaction}`}
                                    >
                                        {transaction}
                                    </a>
                                </li>
                            ))}
                        </div>
                        <div className="flex relative left-[41rem] w-fit h-fit">
                            <h>Pages:</h>
                            {Array.from({ length: Math.ceil(result?.transactions?.length / transactionsPerPage) || 1 }, (_, index) => index + 1).map(
                                (page) => (
                                    <span className="hover:text-textcolor" key={page} onClick={() => handlePageChange(page)}>
                                       ‎ {page}
                                    </span>
                                )
                            )}
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

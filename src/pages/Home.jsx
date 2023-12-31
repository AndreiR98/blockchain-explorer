import React, { useState, useEffect } from "react";

const Home = ({ apiResponse }) => {
    const response = JSON.parse(apiResponse);

    //Get from store
    const lastIndexStore = localStorage.getItem('blockLastIndex');
    const feesStore = localStorage.getItem('networkFees');

    //const lastIndex = response.blockIndex
    return(
        <div className="font-body relative text-[1.1rem] flex space-x-3  lg3:w-[23rem] lg:w-[0rem] lg:right-[5rem] ss:right-[10rem] xss:right-[10rem] xs:right-[10rem] duration-1000 w-fit h-fit">
            <h1>Last block index:</h1>
            <ul className="hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent">
                <a href={`#/block/${lastIndexStore ?? 0}`}>{lastIndexStore ?? 0}</a>
            </ul>
            <h1>Network fees:</h1>
            <ul className="">
                <p>{feesStore ?? 0}</p>
            </ul>
        </div>
    );
}

export default Home;
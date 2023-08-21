import React, {useEffect, useState} from "react";
import APIServices from "../services/APIServices.js";
import DataUtils from "../utils/DataUtils.js";
import {useLocation, useParams} from "react-router-dom";


function SearchPage() {

    const location = useLocation();
    const searchData = location.state?.data; // Access the search data from location.state

    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        const handleSearch = () => {
            APIServices.searchByDataHash(searchData)
                .then((response) => {
                    const parsedResult = DataUtils.parseResponseExplorer(response.data);

                    setSearchResult(parsedResult);
                })
                .catch((error) => {
                    setSearchResult(null);
                });
        };

        handleSearch();
    }, [searchData]);

    return(
        <>
            <div className="font-body text-black absolute flex top-[10rem] left-[20rem] w-fit h-fit  duration-1000 ">
                <div></div>
                <h1>Search result:</h1>
                {searchResult && (
                    <div className="relative  flex ">
                        {console.log(searchResult.data)}
                        {searchResult.category === 'account' && <p>Account: <a href={`#/address/${searchResult.data.accountAddress}`}>{searchResult.data.accountAddress}</a></p>}
                        {searchResult.category === 'transaction' && <p>Transaction: <a href={`#/transaction/${searchResult.data.transactionHash}`}>{searchResult.data.transactionHash}</a></p>}
                        {searchResult.category === 'block' && <p>Block: <a href={`#/block/${searchResult.data.blockIndex}`}>{searchResult.data.blockIndex}</a></p>}
                    </div>
                )}
            </div>

        </>
    );
}

export default SearchPage;
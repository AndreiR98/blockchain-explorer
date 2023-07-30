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
            <div className="h-fit w-fit flex relative lg3: lg:right-[0rem] md2:right-[20rem] md1:right-[10rem] ss:right-[20rem]  duration-1000 ">
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
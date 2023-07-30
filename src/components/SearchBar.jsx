import React, {useState} from "react";
import APIServices from "../services/APIServices.js";
import DataUtils from "../utils/DataUtils.js";

function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [categoryType, setCategoryType] = useState(null);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        APIServices.searchByDataHash(searchTerm)
            .then((response) => {
                const parsedResult = DataUtils.parseResponseExplorer(response.data);
                console.log(parsedResult);
                setSearchResult(parsedResult);
                //setCategoryType(parsedResult.category);
            })
            .catch((error) => {
                setSearchResult(null);
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return(
        <>
            <div className="h-fit w-fit flex relative lg3: lg:right-[0rem] md2:right-[20rem] md1:right-[10rem] ss:right-[20rem]  duration-1000 ">
                <input
                    type="text"
                    placeholder="Search blocks, transactions, accounts"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="border rounded relative flex px-4 py-2 mr-2 w-96  "
                />
                <button
                    onClick={handleSearch}
                    className="flex relative bg-textcolor text-white px-4 py-2 rounded w-ift"
                >
                    Search
                </button>

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

export default SearchBar;
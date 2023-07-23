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
            <div>
                <input
                    type="text"
                    placeholder="Search blocks, transactions, accounts"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="border rounded px-4 py-2 mr-2 w-96"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Search
                </button>

                {searchResult && (
                    <div className="mt-4">
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
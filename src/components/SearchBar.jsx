import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const navigate = useNavigate();


    const handleSearch = () => {
        console.log('Performing search with search term:', searchTerm);
        // Perform the search logic here or call the API if needed
        // For demonstration purposes, we'll just navigate to the search page with the search term
        navigate('/search', {state: {data: searchTerm}});
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleButtonClick = () => {
        handleSearch();
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
                    onClick={handleButtonClick}
                    className="flex relative bg-textcolor text-white px-4 py-2 rounded w-ift"
                >
                    Search
                </button>
            </div>

        </>
    );
}

export default SearchBar;
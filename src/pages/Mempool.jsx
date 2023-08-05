import React, { useState, useEffect } from "react";
import {test} from "../assets/test.jsx";
import {NavbarItems} from "../assets/NavbarElements.jsx";


const Mempool= () => {



    return (<div></div>);
}
//     return(
//         <div className="relative flex -top-[50rem] w-fit left-[20rem]">
//             {test.map((item) => {
//             return(
//                 <div>
//
//                  <div className="mb-[5rem] mr-[5rem]">
//                 <ul>
//                     <li>
//                         <div className=" flex relative ">
//                         <div className="relative w-[10rem] h-[10rem] bg-box ">
//                             <div className="relative w-[1.3rem] h-full skew-y-[45deg] top-[-0.6rem] left-[-1.3rem] bg-Shadow"/>
//                             <div className="relative w-[10rem] h-[1.3rem] skew-x-[45deg] top-[-11.3rem] left-[-0.7rem] bg-Shadow"/>
//
//                             <p className="relative top-[-10rem] w-fit z-10">asdad</p>
//
//                         </div>
//                         </div>
//                     </li>
//                 </ul>
//                  </div>
//
//                     <div className="mb-[5rem] mr-[5rem]">
//                         <ul>
//                             <li>
//                                 <div className="flex relative ">
//                                     <div className="relative w-[10rem] h-[10rem] bg-box ">
//                                         <div className="relative w-[1.3rem] h-full skew-y-[45deg] top-[-0.6rem] left-[-1.3rem] bg-Shadow"/>
//                                         <div className="relative w-[10rem] h-[1.3rem] skew-x-[45deg] top-[-11.3rem] left-[-0.7rem] bg-Shadow"/>
//                                     </div>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
//
//                     <div className="mr-[5rem]">
//                         <ul>
//                             <li>
//                                 <div className="flex relative ">
//                                     <div className="relative w-[10rem] h-[10rem] bg-box ">
//                                         <div className="relative w-[1.3rem] h-full skew-y-[45deg] top-[-0.6rem] left-[-1.3rem] bg-Shadow"/>
//                                         <div className="relative w-[10rem] h-[1.3rem] skew-x-[45deg] top-[-11.3rem] left-[-0.7rem] bg-Shadow"/>
//                                     </div>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
//                     </div>
//                 );
//             })}
//
//
//
// import React, {useState} from "react";
// import {useNavigate} from "react-router-dom";
//
// function Mempool() {
//
//     const [searchTerm, setSearchTerm] = useState('');
//
//     const handleInputChange = (e) => {
//         setSearchTerm(e.target.value);
//     };
//
//     const navigate = useNavigate();
//
//
//     const handleSearch = () => {
//         console.log('Performing search with search term:', searchTerm);
//         // Perform the search logic here or call the API if needed
//         // For demonstration purposes, we'll just navigate to the search page with the search term
//         navigate('/search', {state: {data: searchTerm}});
//     };
//
//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             handleSearch();
//         }
//     };
//
//     const handleButtonClick = () => {
//         handleSearch();
//     };
//
//     return(
//         <>
//             <div className="h-fit w-fit flex relative lg3: lg:right-[0rem] md2:right-[20rem] md1:right-[10rem] ss:right-[20rem]  duration-1000 ">
//                 <input
//                     type="text"
//                     placeholder="Search blocks, transactions, accounts"
//                     value={searchTerm}
//                     onChange={handleInputChange}
//                     onKeyPress={handleKeyPress}
//                     className="border rounded relative flex px-4 py-2 mr-2 w-96  "
//                 />
//                 <button
//                     onClick={handleButtonClick}
//                     className="flex relative bg-textcolor text-white px-4 py-2 rounded w-ift"
//                 >
//                     Search
//                 </button>
//             </div>
//
//         </>
//     );
// }

export default Mempool;
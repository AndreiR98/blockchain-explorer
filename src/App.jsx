import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/public/vite.svg'
import './App.css'
import {Routes,Route} from 'react-router-dom';
import SearchBar from "./components/SearchBar.jsx";
import DynamicMenu from "./components/DynamicMenu.jsx";
import Transactions from "./pages/Transactions.jsx";
import Account from "./pages/Account.jsx";
import Blocks from "./pages/Blocks.jsx";
import Home from "./pages/Home.jsx";
import NavBar from "./components/NavBar.jsx";
import SearchPage from "./components/SearchPage.jsx";
import Mempool from "./pages/Mempool.jsx";

function App() {
  return (
    <>
        <div className="flex relative w">
            <div className="relative flex space-x-[10rem] w-screen h-fit ml-5 mt-5">
                <NavBar/>
                <DynamicMenu/>
                <SearchBar/>
            </div>
        </div>
      <Routes>
          <Route path="/" exact element={<Home/>}></Route>
          <Route path="/mempool" element={<Mempool/>}></Route>
          <Route path="/transaction/:txHash" element={<Transactions />}></Route>
          <Route path="/address/:address" element={<Account />}></Route>
          <Route path="/block/:blockIndex" element={<Blocks />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
      </Routes>




    </>
  )
}

export default App

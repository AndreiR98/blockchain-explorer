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

function App() {
  return (
    <>

      <Routes>
          <Route path="/transaction/:txHash" element={<Transactions />}></Route>
          <Route path="/address/:address" element={<Account />}></Route>
          <Route path="/block/:blockIndex" element={<Blocks />}></Route>
      </Routes>
        <DynamicMenu/>
      <div className="">
          <SearchBar/>
      </div>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/public/vite.svg'
import './App.css'
import {Routes,Route} from 'react-router-dom';
import SearchBar from "./components/SearchBar.jsx";
import DynamicMenu from "./components/DynamicMenu.jsx";
import Transactions from "./pages/Transactions.jsx";

function App() {
  return (
    <>

      <Routes>
          <Route path="/transaction/:txHash" element={<Transactions />}></Route>
      </Routes>
        <DynamicMenu/>
      <div className="">
          <SearchBar/>
      </div>
    </>
  )
}

export default App

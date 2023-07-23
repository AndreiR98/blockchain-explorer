import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/public/vite.svg'
import './App.css'
import {Route} from "react-router-dom";
import SearchBar from "./components/SearchBar.jsx";
import DynamicMenu from "./components/DynamicMenu.jsx";

function App() {
  return (
    <>
        <DynamicMenu/>
      <div className="">
          <SearchBar/>
      </div>
    </>
  )
}

export default App

import {useEffect, useState} from 'react'
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
import Wallet from "./pages/Wallet.jsx";
import ReconnectingWebSocket from "reconnecting-websocket";

const App = () => {
    const [apiResponse, setApiResponse] = useState(null);

    useEffect(() => {
        // Create a WebSocket connection when the component mounts
        //const socket = new WebSocket('ws://localhost:7071/stateChain');

        const socket = new ReconnectingWebSocket('ws://localhost:7071/stateChain', [], {
            maxReconnectionDelay: 10000,
            minReconnectionDelay: 1000,
            reconnectionDelayGrowFactor: 1.3,
            connectionTimeout: 3000,
            maxRetries: Infinity,
        });

        // Listen for messages from the WebSocket server
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setApiResponse(JSON.stringify(message));

            localStorage.setItem('networkFees', message.networkFees);
            localStorage.setItem('blockLastIndex', message.lastBlockIndex);
        };

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            socket.close();
        };
    }, []);
  return (
    <>
        <div className="flex relative w">
            <div className="relative flex space-x-[10rem] w-screen h-fit ml-5 mt-5">
                <NavBar/>
                <Home apiResponse={apiResponse} />
                <SearchBar/>
            </div>
        </div>
      <Routes>
          <Route path="/" exact element={<Home apiResponse={apiResponse} />}></Route>
          <Route path="/mempool" element={<Mempool/>}></Route>
          <Route path="/transaction/:txHash" element={<Transactions />}></Route>
          <Route path="/address/:address" element={<Account />}></Route>
          <Route path="/block/:blockIndex" element={<Blocks />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/wallet" element={<Wallet apiResponse={apiResponse} />}></Route>
      </Routes>




    </>
  )
}

export default App

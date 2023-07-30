import React, {useEffect, useRef, useState} from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

function DynamicMenu() {
    const [messages, setMessages] = useState([]);
    const [blockIndex, setBlockIndex] = useState(null);

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
            setBlockIndex(message.lastBlockIndex);
            setMessages(message);
        };

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            socket.close();
        };
    }, []);
    return(
        <>
            <div className="font-body relative text-[1.1rem] flex space-x-3  lg3:w-[23rem] lg:w-[0rem] lg:right-[5rem] ss:right-[10rem] xss:right-[10rem] xs:right-[10rem] duration-1000 w-fit h-fit">
                <h1>Last block index:</h1>
                <ul className="hover:bg-gradient-to-r from-textcolor to-textcolor2 bg-clip-text hover:text-transparent">
                    <a href={`#/block/${blockIndex}`}>{blockIndex}</a>
                </ul>
                <h1 className="flex ">Current target:
                    <ul className="">
                        {messages.target}
                    </ul>
                </h1>
            </div>
        </>
    );
}

export default DynamicMenu;
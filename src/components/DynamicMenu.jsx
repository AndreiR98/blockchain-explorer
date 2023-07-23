import React, {useEffect, useRef, useState} from "react";
import APIServices from "../services/APIServices.js";
import DataUtils from "../utils/DataUtils.js";
import * as StompJs from "@stomp/stompjs";
import WebSocketWrapper from "./WebSocketWrapper.jsx";
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
            {/*<WebSocketWrapper*/}
            {/*    url="ws://localhost:7071/stateChain"*/}
            {/*    onMessage={handleMessage}*/}
            {/*    onOpen={handleOpen}*/}
            {/*    onClose={handleClose}*/}
            {/*    onError={handleError}*/}
            {/*/>*/}

            <div>
                <h1>Last block index:</h1>
                <ul>
                    <a href={`#/block/${blockIndex}`}>{blockIndex}</a>
                </ul>
                <h1>Current target:
                    <ul>
                        {messages.target}
                    </ul>
                </h1>
            </div>
        </>
    );
}

export default DynamicMenu;
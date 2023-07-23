import React, {useEffect, useRef} from 'react';
import ReconnectingWebSocket from "reconnecting-websocket";

const WebSocketWrapper = ({ url, onMessage, onOpen, onClose, onError}) => {
    const wsRef = useRef(null);

    useEffect(() => {
        const ws = new ReconnectingWebSocket(url, [], {
            maxReconnectionDelay: 10000,
            minReconnectionDelay: 1000,
            reconnectionDelayGrowFactor: 1.3,
            connectionTimeout: 3000,
            maxRetries: Infinity,
        });

        ws.onopen = (event) => {
            if(onOpen) onOpen(event);
        };

        ws.onmessage = (event) => {
            if(onMessage) onMessage(event);
        };

        ws.onclose = (event) => {
            if (onClose) onClose(event);
        };

        ws.onerror = (event) => {
            if (onError) onError(event);
        };

        wsRef.current = ws;

        return () => {
            wsRef.current && wsRef.current.close();
        };
    }, [url, onMessage, onOpen, onClose, onError]);

    return null;
};

export default WebSocketWrapper;
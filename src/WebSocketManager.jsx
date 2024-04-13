import React from 'react';

export function WebSocketManager(props) {
    const [socket, setSocket] = React.useState(null);

    React.useEffect(() => {
        let ws = new WebSocket(props.url);
        ws.onopen = () => {
            const headerMessage = {
                type: 'header',
                username: props.currentUser,
            }
            ws.send(JSON.stringify(headerMessage));
            console.log('WebSocket connection sucessfully established');
            setSocket(ws);
        };
        ws.onclose = () => {
            console.log('WebSocket connection terminated');
        };
        ws.onmessage = async (event) => {
            const socketInfo = JSON.parse(await event.data.text());
            props.onMessage(socketInfo);
        };

        return () => {
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
            };
        }
    }, [props.url, props.onMessage]);

    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(message);
          console.log('Sent message:', message);
    
          // Example of handling messages on the client-side
          if (message === 'ping') {
            console.log('Received "ping", sending "pong"');
            socket.send('pong');
          }
        } else {
          console.error('WebSocket connection not established or not open');
        }
      };

    return null;
}
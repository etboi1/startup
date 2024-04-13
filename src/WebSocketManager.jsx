import React from 'react';

export function WebSocketManager(props) {
    const [socket, setSocket] = React.useState(null);

    React.useEffect(() => {
        let socket = new WebSocket(props.url);
        socket.onopen = () => {
            const headerMessage = {
                type: 'header',
                username: props.currentUser,
            }
            socket.send(JSON.stringify(headerMessage));
            console.log('WebSocket connection sucessfully established');
        };
        socket.onclose = () => {
            console.log('WebSocket connection terminated');
        };
        socket.onmessage = async (event) => {
            const socketInfo = JSON.parse(await event.data.text());
            props.onMessage(event.data);
        };

        return () => {
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                socket.close();
            };
        }
    }, [props.url, props.onMessage]);

    return null;
}
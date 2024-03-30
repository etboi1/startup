const { WebSocketServer } = require('ws');

function notifyShare(httpServer) {
    //Create a websocket object
    const wss = new WebSocketServer({ noServer: true });

    //Handle the protocol upgrade from HTTP to WebSocket
    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            //This sends back the connection event --> triggers the "onopen" event handler in the configureWebSocket
            wss.emit('connection', ws, request);
        })
    })

    let connections = []

    wss.on('connection', (ws) => {
        //Forward message to the users the goal was shared with, as long as they're active
        let connection = {}

        ws.on('message', function message(message) {
            const data = JSON.parse(message);
            if (data.type === 'header') {
                const username = data.username;
                console.log('Username from header:', username);
                connection = { id: username, alive: true, ws: ws };
                connections.push(connection);
                console.log(connections);
            }
            else {
                const users = data.shareWith;
                connections.forEach((c) => {
                    if (users.includes(c.id)) {
                        c.ws.send(message);
                        console.log(`sent message to ${c.id}`);
                    }
                })
            };
        })

        //Close event handler. Delete connection from the active connections list
        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id)

            if (pos >= 0) {
                connections.splice(pos, 1);
            }

            console.log(`Connection with ${connection.id} terminated`)
        })

        //Respond to pong messages by marking the connection alive (this is for keeping the connection alive)
        ws.on('pong', () => {
            connection.alive = true;
        })
    });

    //Keep active connections alive
    setInterval(() => {
        connections.forEach((c) => {
            //Kill any connection that didn't respond to the ping
            if (!c.alive) {
                c.ws.terminate();
            }
            else {
                c.alive = false;
                c.ws.ping();
            }
        });
    }, 10000)
}

module.exports = { notifyShare };
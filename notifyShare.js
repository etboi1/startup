const { WebSocketServer } = require('ws');
const uuid = require('bcrypt');

async function notifyShare(httpServer) {
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
        //Gets username from the header, hashes it and then adds it to the list of active connections
        const username = req.headers['username'];
        console.log('Username from handshake:', username);
        hashedUsername = bcrypt.hash(username);
        const connection = { id: hashedUsername, alive: true, ws: ws };
        connections.push(hashedUsername);

        //Forward message to the users the goal was shared with, as long as they're active
        ws.on('message', function message(message) {
            const data = JSON.parse(message);
            const users = data.shareWith;
            let hashedUsers = []
            users.foreach((u) => {
                let hashedUser = bcrypt.hash(u);
                hashedUsers.push(hashedUser);
            });
            connections.foreach((c) => {
                if (hashedUsers.includes(c.id)) {
                    c.ws.send(message);
                }
            })
        })

        //Close event handler. Delete connection from the active connections list
        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id)

            if (pos >= 0) {
                connections.splice(pos, 1);
            }
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
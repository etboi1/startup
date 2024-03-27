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
        hashedUser = await bcrypt.hash()
        const connection = { id: }
    })
}

module.exports = { notifyShare };
const express = require('express');
const app = express();
const webSocket = require('ws');
const wss = new webSocket.Server({ port: 8080 },() => {
    console.log('WebSocket server is running on port 8080');
});

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server,{
    cors: {
        origin: ['http://localhost:3000'],
    }
});

const PORT = 5000;

wss.on('connection', (ws) => {
  console.log('ws:クライアントと接続しました');

  ws.on('message', (data, isBinary) => {
    if (isBinary) {
      console.log('ws:バイナリデータを受信');

      // 全クライアントにそのままバイナリを転送
      wss.clients.forEach((client) => {
        if (client.readyState === webSocket.OPEN) {
          client.send(data, { binary: true });
        }
      });
    } else {
      console.log(`ws:テキストデータを受信: ${data.toString()}`);

      // テキストはそのまま返す
      ws.send('ws:サーバーからのメッセージ');
    }
  });

  ws.on('close', () => {
    console.log('ws:クライアントとの接続が切れました');
  });
});


wss.on('listening', () => {
    console.log('ws:サーバーが port:8080 で待機中です'); 
});

//クライアントと通信
io.on('connection', (socket) => {
  console.log('web:クライアントと接続しました');
    // クライアントへメッセージを送信
    io.emit('message', 'web:サーバーからのメッセージ');
    socket.on('disconnect', () => {
        console.log('web:クライアントとの接続が切れました');
    });
});



server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
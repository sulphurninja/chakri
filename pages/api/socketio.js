const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('socket.io server');
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('coupon-number-updated', (couponNum) => {
    io.emit('coupon-number-updated', couponNum);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});

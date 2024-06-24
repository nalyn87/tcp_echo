import net from 'net';

const PORT = 3000;

const server = net.createServer((socket) => {
  console.log(`client connected: ${socket.remoteAddress}:${socket.remotePort}`);

  socket.on('data', (data) => {
    console.log(data);
    socket.write(data);
  });

  socket.on('end', () => {
    console.log(`Client diconnected: ${socket.remoteAddress}:${socket.remotePort}`);
  });

  socket.on('error', (err) => {
    console.log(`Socket error, ${err}`);
  });
});

server.listen(PORT, () => {
  console.log(`Echo server listening on port ${PORT}`);
  console.log(server.address());
});

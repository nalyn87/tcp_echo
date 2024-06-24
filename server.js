import net from 'net';
import { readHeader, writeHeader } from './util.js';
import { HANDLER_ID, TOTAL_LENGTH_SIZE } from './constants.js';

const PORT = 3000;

const server = net.createServer((socket) => {
  console.log(`client connected: ${socket.remoteAddress}:${socket.remotePort}`);

  socket.on('data', (data) => {
    const buffer = Buffer.from(data);

    const {length, handlerId} = readHeader(buffer);
    console.log(`handlerId: ${handlerId}`);
    console.log(`length: ${length}`);

    const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID;
    const message = buffer.slice(headerSize);

    console.log(`client 에게 받은 메세지: ${message}`)

    const responseMessage = "Hi, There";
    const responseBuffer = Buffer.from(responseMessage);

    const header = writeHeader(responseBuffer.length, handlerId);
    const packet = Buffer.concat([header, responseBuffer]);

    socket.write(packet);
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

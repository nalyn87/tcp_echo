import net from 'net';

const HOST = 'localhost';
const PORT = 3000;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log(`Connected to the server ${HOST}:${PORT}`);

  const message = "Hello";
  const buffer = Buffer.from(message);
  client.write(buffer);
});

client.on('data', (data) => {
  console.log(data);
});

client.on('close', () => {
  console.log('Connection closed');
});

client.on('error', (err) => {
  console.error('Client error:', err);
});

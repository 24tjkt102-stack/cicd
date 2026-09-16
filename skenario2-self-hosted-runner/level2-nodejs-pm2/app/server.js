const http = require('http');

const PORT = process.env.PORT || 4100;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    skenario: 2,
    level: 2,
    stack: 'Node.js (native http) + pm2',
    runner: 'self-hosted VM-B',
    pesan: 'Job Actions berjalan langsung di VM-B, tanpa SSH, tanpa Docker.',
    waktu: new Date().toISOString()
  }, null, 2));
});

server.listen(PORT, () => console.log(`Server level2 (skenario2) jalan di port ${PORT}`));

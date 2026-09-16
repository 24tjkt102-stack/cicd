const http = require('http');

const PORT = process.env.PORT || 4000;
const ENV_NAME = process.env.APP_ENV || 'production';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    skenario: 1,
    level: 2,
    stack: 'Node.js (native http, tanpa framework)',
    lingkungan: ENV_NAME,
    pesan: 'Dijalankan sebagai systemd service di VM-A, dideploy lewat SSH ProxyCommand (Cloudflare Access).',
    waktu: new Date().toISOString()
  }, null, 2));
});

server.listen(PORT, () => console.log(`Server level2 jalan di port ${PORT}`));

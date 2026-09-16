# Skenario 1 - Level 2: Node.js + systemd service

Aplikasi Node.js (`server.js`) dideploy ke `/opt/level2-node` di VM-A,
dijalankan sebagai systemd service `level2-node.service`.

## Trigger
- `push` ke branch `main` (path folder `app/`)
- `workflow_dispatch` manual dengan input `restart_only` (true/false) — jika
  `true`, workflow hanya me-restart service tanpa upload ulang file.

## Setup awal (sekali saja, manual di VM-A)
```bash
sudo tee /etc/systemd/system/level2-node.service <<'UNIT'
[Unit]
Description=Skenario1 Level2 Node App
After=network.target

[Service]
WorkingDirectory=/opt/level2-node
ExecStart=/usr/bin/node server.js
Restart=always
Environment=PORT=4000
Environment=APP_ENV=production

[Install]
WantedBy=multi-user.target
UNIT
sudo systemctl daemon-reload
sudo systemctl enable level2-node
```

## Secrets yang dipakai
- CF_ACCESS_HOSTNAME, VPS_USERNAME, VPS_PASSWORD

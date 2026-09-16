# Skenario 2 - Level 2: Node.js + pm2 (self-hosted runner)

Aplikasi Node.js dijalankan dengan `pm2` langsung di VM-B. Karena runner
menempel di VM yang sama dengan target deploy, workflow cukup memanggil
`pm2 restart` secara lokal.

## Trigger
- `pull_request` (target branch `main`) — deploy versi preview saat PR dibuka/diupdate.
- `workflow_dispatch` — trigger manual dari tab Actions, dengan input `port`.

## Setup awal (sekali saja, manual di VM-B)
```bash
sudo npm install -g pm2
mkdir -p /opt/level2-node-pm2
```

## Runner label
`[self-hosted, vm-b]`

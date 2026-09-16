# Skenario 1 - Level 3: Python Flask + gunicorn (release-based)

Aplikasi Flask dideploy ke `/opt/level3-flask` di VM-A, dijalankan lewat
`gunicorn` sebagai systemd service `level3-flask.service`.

## Trigger
- `push` tag berformat `v*` (mis. `v1.0.0`) — dipakai untuk simulasi rilis resmi.
- `schedule` — cron harian jam 02:00 UTC, untuk sinkronisasi ulang/health-refresh
  meskipun tidak ada rilis baru.

## Setup awal (sekali saja, manual di VM-A)
```bash
sudo apt-get install -y python3-venv
sudo mkdir -p /opt/level3-flask && sudo chown $USER:$USER /opt/level3-flask
python3 -m venv /opt/level3-flask/venv

sudo tee /etc/systemd/system/level3-flask.service <<'UNIT'
[Unit]
Description=Skenario1 Level3 Flask App
After=network.target

[Service]
WorkingDirectory=/opt/level3-flask
Environment=APP_VERSION=v0.0.0
ExecStart=/opt/level3-flask/venv/bin/gunicorn -w 2 -b 0.0.0.0:5000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
UNIT
sudo systemctl daemon-reload
sudo systemctl enable level3-flask
```

## Secrets yang dipakai
- CF_ACCESS_HOSTNAME, VPS_USERNAME, VPS_PASSWORD

# Skenario 2 - Level 3: Python Flask multi-branch (self-hosted runner)

Aplikasi Flask dijalankan dengan gunicorn sebagai systemd service
`level3-flask-vmb.service` langsung di VM-B, tanpa SSH.

## Trigger
- `push` ke branch `main` ATAU `staging` — masing-masing dideploy ke folder
  terpisah (`/opt/level3-flask-vmb/main` atau `/staging`) sesuai nama branch.
- `schedule` — cron mingguan setiap Senin jam 03:00 UTC untuk refresh berkala.

## Setup awal (sekali saja, manual di VM-B)
```bash
sudo apt-get install -y python3-venv
sudo mkdir -p /opt/level3-flask-vmb/main /opt/level3-flask-vmb/staging
python3 -m venv /opt/level3-flask-vmb/venv

sudo tee /etc/systemd/system/level3-flask-vmb.service <<'UNIT'
[Unit]
Description=Skenario2 Level3 Flask App (VM-B)
After=network.target

[Service]
WorkingDirectory=/opt/level3-flask-vmb/main
ExecStart=/opt/level3-flask-vmb/venv/bin/gunicorn -w 2 -b 0.0.0.0:5100 app:app
Restart=always

[Install]
WantedBy=multi-user.target
UNIT
sudo systemctl daemon-reload
sudo systemctl enable level3-flask-vmb
```

## Runner label
`[self-hosted, vm-b]`

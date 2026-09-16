# Skenario 1 - Level 1: Static HTML Site

Aplikasi statis (index.html + style.css) di-deploy ke `/var/www/level1-static`
di VM-A menggunakan `scp` lewat ProxyCommand `cloudflared access ssh`.

- Edit file `app/index.html` / `app/style.css` langsung di GitHub GUI (browser).
- Setiap commit ke branch `main` yang menyentuh folder `app/` akan trigger deploy.

## Secrets yang dipakai
- CF_ACCESS_HOSTNAME
- VPS_USERNAME
- VPS_PASSWORD

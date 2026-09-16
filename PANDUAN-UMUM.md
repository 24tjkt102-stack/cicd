# Panduan Umum Praktik CI/CD

Struktur ini berisi 2 skenario, masing-masing 3 level, total 6 repo praktik.
Semua perubahan kode dilakukan LANGSUNG di GitHub GUI (browser) — commit
langsung ke branch, edit file via "Edit this file" di GitHub, tidak ada
push/pull dari VSCode/local git.

## Skenario 1 — GitHub-hosted Runner + SSH ProxyCommand via Cloudflare Access
- Workflow berjalan di runner GitHub (`runs-on: ubuntu-latest`).
- Runner terhubung ke VPS "VM-A" (Ubuntu 24 + cloudflared tunnel) lewat SSH,
  TANPA SSH key. Otentikasi pakai username + password (secrets), tunneling
  koneksi SSH lewat `cloudflared access ssh` sebagai ProxyCommand.
- Tidak ada Docker/container — deploy langsung ke filesystem VM lewat scp/ssh.
- Secrets yang dibutuhkan di repo (Settings > Secrets and variables > Actions):
  - `CF_ACCESS_HOSTNAME` -> hostname SSH yang di-protect Cloudflare Access, mis. `vm1-ssh.contoh-domain.com`
  - `VPS_USERNAME` -> username login SSH di VM-A
  - `VPS_PASSWORD` -> password login SSH di VM-A
  - `CF_ACCESS_CLIENT_ID` & `CF_ACCESS_CLIENT_SECRET` (opsional, jika policy Access pakai Service Token)

## Skenario 2 — Self-hosted Runner
- Runner GitHub Actions di-install & dijalankan LANGSUNG di VPS "VM-B"
  (`./config.sh` + `./run.sh` sebagai service), berbeda VM dari Skenario 1.
- Karena job berjalan di dalam VM-B itu sendiri, TIDAK PERLU SSH sama sekali —
  step workflow tinggal copy file / restart service secara lokal.
- Tidak ada Docker/container.
- Label runner dipakai: `[self-hosted, vm-b]`

## Variasi Trigger yang dipakai
| Level | Skenario 1 trigger | Skenario 2 trigger |
|---|---|---|
| 1 | `push` ke branch `main` (path filter folder app) | `push` ke branch `main` |
| 2 | `push` + `workflow_dispatch` (manual, dengan input) | `pull_request` (target `main`) + `workflow_dispatch` |
| 3 | `push` tag `v*` (release) + `schedule` (cron harian) | `push` ke banyak branch (`main`, `staging`) + `schedule` (cron mingguan) |

## Cara pasang cloudflared di VM-A (VPS Skenario 1)
```bash
# di VM-A (Ubuntu 24)
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
sudo cloudflared service install <TUNNEL_TOKEN>
# Buat public hostname di Zero Trust Dashboard -> Access -> Tunnels
# arahkan hostname (mis. vm1-ssh.contoh-domain.com) ke service ssh://localhost:22
# Tambahkan Access Policy (Application: Self-hosted, type SSH) yang mengizinkan
# login dengan username/password sesuai kebutuhan tim.
```

## Cara pasang self-hosted runner di VM-B (Skenario 2)
```bash
# di VM-B (Ubuntu 24), dari halaman repo: Settings > Actions > Runners > New self-hosted runner
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64.tar.gz -L https://github.com/actions/runner/releases/latest/download/actions-runner-linux-x64.tar.gz
tar xzf actions-runner-linux-x64.tar.gz
./config.sh --url https://github.com/<ORG>/<REPO> --token <TOKEN> --labels vm-b
sudo ./svc.sh install
sudo ./svc.sh start
```

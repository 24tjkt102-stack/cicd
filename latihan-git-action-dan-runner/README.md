# 10 Latihan Pengantar Sebelum Skenario 1 & 2

Latihan ini dikerjakan berurutan dari 1 sampai 10. Latihan 1-5 melatih konsep
**GitHub Actions (git action)** dan berpuncak pada remote sungguhan ke VM.
Latihan 6-10 melatih konsep **self-hosted runner (git runner)** dengan kasus
yang levelnya setara, tapi caranya beda karena runner-nya ada di dalam VM.

Semua langkah dikerjakan dari GitHub web dashboard (tab **Actions**, tombol
**Run workflow**) — tidak perlu terminal lokal, kecuali untuk memasang
self-hosted runner itu sendiri di VM (satu kali di awal).

## Struktur folder

```
latihan-git-action-dan-runner/
├── git-action/          # taruh di .github/workflows/ pada repo kalian
│   ├── latihan-1.yml
│   ├── latihan-2.yml
│   ├── latihan-3.yml
│   ├── latihan-4.yml
│   └── latihan-5.yml
├── git-runner/          # taruh juga di .github/workflows/
│   ├── latihan-6.yml
│   ├── latihan-7.yml
│   ├── latihan-8.yml
│   ├── latihan-9.yml
│   └── latihan-10.yml
└── assets/              # file pendukung yang dipanggil workflow di atas
    ├── latihan-3/index.html
    ├── latihan-4/index.html, banner.svg
    ├── latihan-8/logo.svg
    └── latihan-9/preview.html
```

> Catatan penting: file `.yml` di sini harus dipindah ke folder
> `.github/workflows/` di repo GitHub kalian supaya dikenali sebagai
> workflow. Folder `assets/` cukup ditaruh di root repo, persis seperti
> struktur di atas, karena setiap workflow memanggilnya dengan path
> `assets/latihan-X/...`. Jika suatu saat butuh aset tambahan (gambar
> dengan nama lain, file konfigurasi, dll.), tinggal tambahkan ke dalam
> folder `assets/latihan-X/` masing-masing — foldernya sudah disediakan
> supaya siap diisi kapan saja.

## Peta level

| # | Fokus latihan | Trigger | Catatan |
|---|---|---|---|
| 1 | Runner GitHub itu VM sekali pakai | `workflow_dispatch` | Install apache, curl localhost |
| 2 | Expose ke publik pakai Quick Tunnel | `workflow_dispatch` | Tunnel sementara, URL acak tiap run |
| 3 | Pakai file dari repo sendiri (`assets/`) + artifact | `workflow_dispatch` | Hasil bisa didownload dari halaman run |
| 4 | Input manual + Secrets + dry-run tools | `workflow_dispatch` (dengan input) | Menyiapkan tools sebelum remote sungguhan |
| 5 | Remote sungguhan ke VM (tanpa SSH key) | `workflow_dispatch` | Pakai `URL_VM`, `USER_VPS`, `PASS_VPS` |
| 6 | Kenalan dengan self-hosted runner | `workflow_dispatch` | Job jalan di VM sungguhan, bukan sekali pakai |
| 7 | Tunnel Zero Trust permanen (bukan quick tunnel) | `push` | VM sudah dipasangi tunnel tetap |
| 8 | `assets/` + input pilihan (staging/production) | `workflow_dispatch` (choice) | Belajar `type: choice` |
| 9 | Trigger `pull_request` di self-hosted | `pull_request` | Preview terpisah per nomor PR |
| 10 | Gabungan jadwal + manual, tulis file tanpa SSH | `schedule` + `workflow_dispatch` | Kontras langsung dengan Latihan 5 |

## Secrets yang perlu disiapkan

| Dipakai di | Nama secret | Isi |
|---|---|---|
| Latihan 4 | `CONTOH_SECRET` | Teks bebas, hanya untuk latihan membaca secret |
| Latihan 5 | `URL_VM` | Hostname SSH publik VM (lewat Cloudflare Access) |
| Latihan 5 | `USER_VPS` | Username login Linux di VM |
| Latihan 5 | `PASS_VPS` | Password login Linux di VM |
| Latihan 7 | `CF_HOSTNAME` | Domain publik VM dari Tunnel Zero Trust yang sudah aktif |

## Prasyarat Latihan 6-10 (self-hosted runner)

Sebelum mengerjakan Latihan 6, pasang dulu self-hosted runner di VM
(**Settings → Actions → Runners → New self-hosted runner** di repo kalian,
lalu jalankan perintah `config.sh` + `svc.sh start` yang ditampilkan GitHub
di dalam VM tersebut). VM ini boleh sama dengan VM di Latihan 5, atau VM
terpisah — yang penting sudah terpasang Cloudflare Tunnel Zero Trust untuk
Latihan 7.

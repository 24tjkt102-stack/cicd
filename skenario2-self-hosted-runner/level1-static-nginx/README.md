# Skenario 2 - Level 1: Static Site via Self-hosted Runner

Runner GitHub Actions terpasang & berjalan sebagai service LANGSUNG di VM-B
(beda VM dari Skenario 1). Karena job dieksekusi di dalam VM-B itu sendiri,
deploy cukup dengan `cp` lokal ke folder web root — tidak perlu SSH/ProxyCommand.

## Trigger
- `push` ke branch `main` (path folder `app/`)

## Runner label
`[self-hosted, vm-b]`

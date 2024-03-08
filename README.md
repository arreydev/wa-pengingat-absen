
# WA Pengingat Presensi
Hanya sebuah aplikasi sederhana untuk mengirimkan pesan Whatsapp di jam tertentu setiap harinya. Dalam project ini, pengingat akan dikirimkan setiap jam 7.15 pagi dan 16.01 sore.
Aplikasi ini menggunakan library [whatsapp-web.js](https://wwebjs.dev/).

Dokumentasi code saya usahakan se-clear mungkin, jika ada pertanyaan bisa menghubungi saya melalui WhatsApp, [chat saya](https://wa.me/6282197092440).

### Cara Pasang
Berikut adalah tata cara pemasangan aplikasi. Sebelum lanjut siapkan:
1. PC Server atau PC yang tidak dimatikan sama sekali (99% up-time), jika tidak ada, bisa menggunakan PC biasa namun jika dimatikan, saat dinyalakan maka hidupkan kembali aplikasinya.
2. WhatsApp mobile dan HP yang digunakan untuk scan barcode. Nomor WhatsApp ini yang digunakan untuk mengirim pesan ke para pegawai.
3. Pastikan PC pada poin 1 sudah terinstall node.js dengan versi LTS. Untuk mengecek apakah PC sudah tersedia node.js bisa jalankan `node -v` dan `npm -v` pada CMD. Jika tidak ada silahkan install terlebih dahulu [node](https://nodejs.org/en/download/current).

Jika sudah terpenuhi semua, silahkan lanjut ke pemasangan di bawah ini:
#### Download Dependencies
Masuk ke folder tempat anda mendownload aplikasi ini, kemudian jalankan:

```bash
npm init
```

Tunggu hingga proses selesai, kemudian masuk ke file `nomer.txt` dan masukkan semua nomor WhatsApp pegawai yang ingin anda kirimkan pesan pengingat (1 baris 1 nomor) gunakan +62 sebagai pengganti 0, jadi misal nomor HP 081555xxxxx maka masukkan isikan +6281555xxxxx. Contoh isian di dalam file `nomer.txt`:

```
+6281319xxxxx
+6282122xxxxx
+6285543xxxxx
```

Jika sudah diisikan semua, silahkan memulai server dengan menjalankan perintah di CMD:

```bash
npm start
```

Tunggu hingga bar-code muncul, kemudian lakukan scan barcode menggunakan aplikasi WhatsApp Mobile dengan menambahkan `Linked Device`.

Setelah selesai akan muncul pada console dengan pesan `WhatsApp siap!`.

Selamat, aplikasi akan secara otomatis mengirimkan pengingat kepada seluruh pegawai tiap jam 7.15 dan 16.01.

### Merubah Setting Jam Pengingat
Untuk merubah jamnya anda bisa buka file `index.js` dan rubah 2 baris berikut ini:
```javascript
const jam_absen_pagi = '07.15'
const jam_absen_sore = '16.01'
```

Terimakasih, semoga bisa bermanfaat.
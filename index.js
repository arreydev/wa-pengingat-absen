import { promise as fsPromise } from 'fs' // Import library untuk import file text yang berisi nomer2

const qrcode = require('qrcode-terminal') // Import library qr-code agar bisa scan qr whatsapp hasil emulate browser dari puppeteer

const { Client } = require('whatsapp-web.js') // Import library whatsapp-web.js, modul utama untuk mengirim, menerima dan membalas pesan
const client = new Client() // Buat instance whatsapp

const jam_absen_pagi = '07.15' // Jam pagi saat pesan whatsapp pengingat ingin disampaikan ke orang-orang
const jam_absen_sore = '16.01' // Jam sore saat pesan whatsapp pengingat ingin disampaikan ke orang-orang

client.on('qr', (qr) => { // Ketika whatsapp-web.js mengirimkan perintah qr dari instance puppeteer, maka lakukan hal d bawah ini
    qrcode.generate(qr, { small: true }) // Generate qr-code untuk di scan oleh pengirim whatsapp dimana instance whatsapp web akan terbuat di chromium
});

async function readFile(filename) { // fungsi asynchronous untuk membaca nomor HP pegawai yang ingin dikirim pengingat. Takes: string berisi path dan nama file txt, Return: array berisi nomer2 pegawai
    try {
        const contents = await fsPromise.readFile(filename, 'utf-8') // Membaca file txt yang diberikan melalui parameter
        const arr = contents.split(/\r?\n/) // Convert setiap baris di file txt tersebut sebagai array
        return arr // Mengembalikan array yang berisi nomer2 pegawai yang ingin dikirimkan pesan pengingat
    } catch (err) {
        console.log(err) // Jika error maka akan diberikan trace error di console
    }
}

client.on('ready', () => { // Ketika qr-code sudah di scan, maka session whatsapp web akan ready, dan jalankan perintah di bawah
    console.log('WhatsApp siap!') // Indikator ketika whatsapp web sudah siap
    const number = readFile('./nomer.txt') // panggil fungsi readFile() untuk mendapatkan nomer pegawai dalam bentuk array

    const cekint = setInterval(() => { // Iterasi infinity loop berjalan tiap menit
        let date = new Date() // Instance date object, construct jika tanpa parameter maka menunjukan waktu sekarang
        let jam = date.getHours() // mengambil jam sekarang dalam bentuk integer
        let menit = date.getMinutes() // mengambil menit sekarang dalam bentuk integer
        if (jam === parseInt(jam_absen_pagi.split('.')[0]) && menit === parseInt(jam_absen_pagi.split('.')[1])) { // Jika jam dan menit menunjukan sama dengan variabel jam absen pagi maka lakukan hal di bawah
            console.log('Mengirimkan pengingat presensi pagi.') // Indikator ketika akan mengirim pesan
            number.forEach(element => { // Iterasi untuk mengirim pesan ke seluruh orang yang ada di daftar nomor
                const text = "Bapak/Ibu izin mengingatkan untuk melakukan presensi pagi." // Pesan pengingat
                const chatId = element.substring(1) + "@c.us" // Membuat chatId untuk bisa dichat via whatsApp web
        
                client.sendMessage(chatId, text) // Mengirim pesan WA ke pegawai
            })
        } else if (jam === parseInt(jam_absen_sore.split('.')[0]) && menit === parseInt(jam_absen_sore.split('.')[1])) { // Jika jam dan menit menunjukan sama dengan variabel jam absen sore maka lakukan hal di bawah
            console.log('Mengirimkan pengingat presensi sore.')
            number.forEach(element => {
                const text = "Bapak/Ibu izin mengingatkan untuk melakukan presensi sore."
                const chatId = element.substring(1) + "@c.us"
        
                client.sendMessage(chatId, text)
            })
        } else { // Jika belum jam pulang tiap menit maka akan memberikan pesan di console sebagai indikator server masih aktif
            const text = 'Belum jam pulang jam masuk, masih jam: ' + jam
            console.log(text)
        }
    }, 60000)

})

client.initialize();
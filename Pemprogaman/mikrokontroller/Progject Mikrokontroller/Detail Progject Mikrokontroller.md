# 🚀 **Sistem Absensi Berbasis RFID**

> Kode Arduino ini digunakan untuk mendesain suatu sistem absensi otomatis dengan menggunakan teknologi RFID.

## 📖 Daftar Isi

- [Struktur Program](#struktur-program)
- [Fungsi-fungsi Utama](#fungsi-fungsi-utama)
- [Bagaimana Cara Kerjanya?](#bagaimana-cara-kerjanya)

---

## 🧠 **Struktur Program**

### 📚 **Library**
- Menggunakan `SoftwareSerial.h` untuk memungkinkan komunikasi serial pada pin digital lainnya.

### 🎛 **Inisialisasi**
- Mendefinisikan komunikasi serial dengan pin 0 sebagai RX dan pin 1 sebagai TX menggunakan `SoftwareSerial rf(0, 1);`.

### 📋 **Struktur Data**
- Terdapat struktur data `sT` dengan dua bidang: `NIM` dan `Nama`.
- Array `sTs` berisi daftar data mahasiswa dengan NIM dan nama masing-masing.

---

## 🛠 **Fungsi-fungsi Utama**

### ⚙️ **setup()**
- Menginisialisasi komunikasi serial dengan baud rate 9600.
- Menampilkan pesan awal menginformasikan pengguna untuk menempelkan kartu RFID mereka.

### 🔁 **loop()**
- Fungsi utama yang terus berjalan selama Arduino aktif.
- Jika ada data tersedia di serial, fungsi `checksT()` akan dipanggil.

### 📡 **checksT()**
- Membaca NIM dari RFID.
- Mencocokkan NIM yang dibaca dengan daftar NIM yang ada di array `sTs`.
- Menampilkan pesan selamat datang jika NIM ditemukan atau pesan kesalahan jika tidak.

---

## 🚦 **Bagaimana Cara Kerjanya?**

1. 🕐 Sistem awalnya dalam keadaan menunggu.
2. 🎫 Saat kartu RFID ditempelkan, sistem akan membaca NIM yang tertulis pada RFID.
3. 🖥 Sistem mencari NIM tersebut di dalam daftar NIM yang ada.
4. ✅ Jika NIM ditemukan, sistem akan menampilkan pesan selamat datang beserta nama mahasiswa.
5. ❌ Jika NIM tidak ditemukan, sistem akan menampilkan pesan bahwa akses ke kelas ditolak.

---


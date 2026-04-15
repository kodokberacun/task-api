# Task Management REST API - Tech Lead Assessment

Repositori ini berisi REST API sederhana untuk sistem manajemen tugas (Todo) yang diimplementasikan dengan TypeScript, Express.js, dan PostgreSQL. Proyek ini dikembangkan sebagai bagian dari *coding test* untuk posisi Tech Lead.

## Waktu Pengerjaan
- **Waktu Mulai:** [15 April 2026, 09:00 WIB]
- **Waktu Selesai:** [16 April 2026, 00:20 WIB]
- **Total Durasi:** [-+4 Jam]

---

## Keputusan Teknis (Technical Decisions)

Untuk mencapai keseimbangan antara *code quality*, performa, dan kecepatan pengembangan, berikut adalah keputusan arsitektur dan teknologi yang diterapkan:

1. **Express.js & TypeScript:** Express dipilih karena ekosistemnya yang matang dan ringan. Dikombinasikan dengan TypeScript, proyek ini mendapatkan keuntungan dari *static typing* yang meminimalisir *runtime errors* dan meningkatkan kualitas *developer experience* (DX).
2. **Prisma ORM:** Prisma digunakan alih-alih ORM lain (seperti TypeORM) karena Prisma menawarkan *type safety* secara *end-to-end* yang superior. Pendekatan *schema-first* pada Prisma mempermudah visualisasi relasi database, pembuatan migrasi, dan *seeding* data.
3. **Zod Validation:** Validasi input sangat penting untuk keamanan dan stabilitas API. Zod dipilih karena terintegrasi sangat mulus dengan TypeScript, memungkinkan inferensi tipe data secara langsung dari skema validasi tanpa perlu mendefinisikan *interface* terpisah secara manual.
4. **Database Indexing (PostgreSQL):** Pada model `Task`, dilakukan *indexing* pada kolom `status` (`@@index([status])`). Keputusan ini diambil karena dalam aplikasi manajemen tugas, *query* untuk melakukan *filtering* berdasarkan status (misal: mencari semua task yang `PENDING`) adalah salah satu operasi yang paling sering dilakukan.
5. **Layered Architecture:** Kode dipisahkan ke dalam lapisan *Routes*, *Controllers*, *Middlewares*, dan *Validations*. Pemisahan ini (*separation of concerns*) membuat kode lebih modular, mudah dibaca, dan jauh lebih mudah untuk diuji (*testable*).

---

## Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di lingkungan lokal.

### 1. Prasyarat
- Node.js (versi 16 atau lebih baru)
- PostgreSQL (sudah terinstal dan berjalan di lokal, atau menggunakan Docker)

### 2. Instalasi
Clone repositori ini dan instal semua dependensi:
```bash
git clone [URL_REPOSITORI]
cd task-api
npm install

### 3. Konfigurasi Environment Variables
- Buat file .env di root direktori proyek dan sesuaikan koneksi database PostgreSQL Anda:

DATABASE_URL="postgresql://[USER]:[PASSWORD]@localhost:5432/[NAMA_DATABASE]?schema=public"
PORT=3000

### 4. Setup Database (Migration & Seeding)
- Jalankan perintah berikut untuk membuat tabel di database dan mengisi sample data:

# Menjalankan migrasi untuk membuat skema database
npx prisma migrate dev --name init

# Memasukkan data awal (seeding)
npx prisma db seed

### 5. Menjalankan Server
- Untuk menjalankan server dalam mode pengembangan dengan fitur hot-reload:
npm run dev
- API akan berjalan di http://localhost:3000

### 6. Menjalankan Unit Test
- Pengujian (testing) menggunakan Jest dan Supertest difokuskan pada endpoint-endpoint kritis (seperti pembuatan task dan validasi input). Untuk menjalankan test suite, gunakan perintah:
npm test
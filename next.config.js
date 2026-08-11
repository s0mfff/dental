/** @type {import('next').NextMode} */
const nextConfig = {
  output: 'export', // Говорит Next.js скомпилировать сайт в статические файлы
  images: {
    unoptimized: true, // Чтобы картинки работали на GitHub Pages без сервера
  },
};

module.exports = nextConfig;
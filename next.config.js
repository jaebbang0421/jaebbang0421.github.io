/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export', // static site for GitHub Pages (written to out/)
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true }
}

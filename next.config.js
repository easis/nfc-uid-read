const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/nfc-uid-read',
};

module.exports = nextConfig;

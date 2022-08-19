const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    basePath: '/nfc-uid-read',
    assetPrefix: isProd ? '/nfc-uid-read/' : '',
};

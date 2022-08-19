const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    basePath: '/nfc-uid-read',
    assetPrefix: isProd ? '/your-github-repo-name/' : '',
};

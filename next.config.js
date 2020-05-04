const withLess = require('@zeit/next-less')
const isProd = process.env.NODE_ENV === 'production'
module.exports = withLess({
  assetPrefix: isProd ? '/blog' : '/blog',
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]__[hash:base64:5]",
  }
})
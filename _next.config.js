const withLess = require('@zeit/next-less')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const isProd = process.env.NODE_ENV === 'production'
const PROXY_PREFIX = ''

module.exports = withLess({
  assetPrefix: isProd ? PROXY_PREFIX : PROXY_PREFIX,
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]__[hash:base64:5]",
  },
  webpack: (config, { defaultLoaders, isServer, webpack }) => {
    config.module.rules.push(
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          name: 'static/[path][name].[ext]',
          limit: '10240'
        }
      }
    )
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.PROXY_PREFIX': JSON.stringify(PROXY_PREFIX)
    }))
    if (isServer) {
      // 服务端webpack配置默认无MiniCssExtractPlugin
      config.plugins.push(new MiniCssExtractPlugin({
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[name].chunk.css'
      }))
    }
    return config
  }
})
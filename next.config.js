module.exports = {
  webpack(config) {
    // config.module.rules.unshift({
    //   test: /\.tsx?$/,
    //   loader: "eslint-loader",
    //   enforce: "pre",
    //   exclude: /node_modules/,
    // });
    return config;
  },
};

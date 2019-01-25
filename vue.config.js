module.exports = {
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('babel-loader')
  }
}
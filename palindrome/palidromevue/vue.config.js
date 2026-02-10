module.exports = {
  transpileDependencies: [],

  chainWebpack: config => {
    ['js', 'vue', 'css', 'scss', 'sass'].forEach(rule => {
      if (config.module.rules.has(rule)) {
        config.module
          .rule(rule)
          .uses.delete('cache-loader')
      }
    })
  }
}

module.exports = {
  runtimeCompiler: true,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        return [{template: 'vue.html'}]
      })
  },
  devServer: {
    proxy: {
      // Gir tilgang til Wordpress apien lokalt på:
      // http://localhost:8080/api
      // Du må kanskje bytte http://localhost:5000 med
      // din localhost for wordpress
      '/api': {
				target: 'https://bak.mk.victorberland.com/api',
        pathRewrite: { '^/api': '' }
      }
    }
  }
}

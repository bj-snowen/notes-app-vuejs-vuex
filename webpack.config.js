module.exports = {
  entry: './main.js',
  output: {
    path: './static',
    publicPath: '/static/',
    filename: 'build.js'
  },
  module: {
    preLoaders: [{
      test: /\.vue$/,
      loader: 'eslint'
    }, {
      test: /\.js$/,
      loader: 'eslint'
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.vue$/,
      loader: 'vue'
    }]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  devtools: '#source-map'
}

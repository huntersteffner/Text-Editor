var HtmlWebpackPlugin = require('html-webpack-plugin')
var WebpackPwaManifest = require('webpack-pwa-manifest')
var path = require('path')
var { InjectManifest } = require('workbox-webpack-plugin')

// TODO: Add and configure workbox plugins for a service worker and manifest file.

// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html', title: 'JATE' }),
      new InjectManifest({ swSrc: './src-sw.js', swDest: 'src-sw.js' }),
      new WebpackPwaManifest({
        inject: true,
        name: 'Text Editor',
        short_name: 'JATE',
        background_color: '#999',
        theme_color: '#111',
        start_url: '/',
        publicPath: '/',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ],
            },
          },
        },
      ],
    },
  }
}

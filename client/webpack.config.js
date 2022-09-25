const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //webpack plugin create html file 
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      //code origin from module 19.5
      new InjectManifest({
        swSrc: './sw.js',
        swDest: 'service-worker.js',
      }), 
      //creating manifest.json file
      new WebpackPwaManifest({
        /*sources explaining this section
        https://tylergaw.com/blog/building-my-first-pwa/
        https://www.w3.org/TR/appmanifest/

        */
        fingerprints: false,
        inject: true,
        name: 'Text Editor',
        short_name: 'JATE',
        description: 'Text Editor with with PWA capabilites',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          //multiple sizes
          sizes:[96, 128, 192,  256, 384, 512],
          destination: path.join('assets', 'icons')

        },],
        
      }),

      
    ],

    module: {
      //add css loader and babel loader
      //code origin from module 19.5 and modify to use with this PWA
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: / node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-specify',
                '@babel/transform-runtime'
              ],

            },
          },
        },
        
      ],
    },
  };
};

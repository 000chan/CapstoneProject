const HtmlWebpackPlugin = require('html-webpack-plugin'); //추가
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = (env, options) => {
  dotenv.config({
    // path: './env/dev.env',
  });
  return {
    entry: ['@babel/polyfill', './src/index.js'],

    mode: 'development',

    plugins: [
      new webpack.ProvidePlugin('@emotion'),
      new HtmlWebpackPlugin({ template: './base-dev.html' }),
      new webpack.DefinePlugin({
      }),
      // new BundleAnalyzerPlugin()
    ],

    output: {
      publicPath: '/',
      path: __dirname + '/public' + process.env.OUTPUT,
      filename: 'dev-bundle.js',
    },

    devServer: {
      historyApiFallback: true,
      port: 80,
      static: {
        directory: __dirname + '/public',
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
  };
};

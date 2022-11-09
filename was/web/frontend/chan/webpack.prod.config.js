const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, options) => {
  // console.log(options.env.site);
  //npm run build -- --env site=asdf
  dotenv.config({
    // path: './env/prod.env',
  });
  return {
    entry: ['@babel/polyfill', './src/index.js'],

    plugins: [
      new webpack.ProvidePlugin('@emotion'),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!css/**', '!images/**', '!js/**', '!json_data/**', '!jslib/**'],
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ko|en/),
      new HtmlWebpackPlugin({ template: './base-dev.html' }),
      new webpack.DefinePlugin({
      }),
      new MiniCssExtractPlugin({
        linkType: false,
        filename: '[name].[chunkhash:8].css',
        chunkFilename: '[name].[chunkhash:8].css',
      }),
      // new BundleAnalyzerPlugin()
    ],

    output: {
      publicPath: '/',
      path: __dirname + '/public',
      filename: '[name].[chunkhash:8].js',
      chunkFilename: '[name].[chunkhash:8].js',
    },

    optimization: {
      minimize: true,
      splitChunks: {
        cacheGroups: {
          vendors: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
            priority: 1,
          },
          styles: {
            chunks: 'all',
            test: /\.s?css$/,
            enforce: true,
            reuseExistingChunk: true,
            priority: 0,
          },
        },
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
              loader: MiniCssExtractPlugin.loader,
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
              loader: MiniCssExtractPlugin.loader,
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

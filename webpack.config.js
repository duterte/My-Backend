const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].[contenthash:8].js',
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html'),
      // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // Use this code on production build

      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true,
      // },

      // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/index.[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          outputPath: 'static/media',
          name: '[name].[contenthash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          outputPath: 'static/fonts',
          name: '[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      'global-components': path.resolve(__dirname, 'src/global-components'),
    },
    extensions: ['.js', '.jsx', 'json', 'ejs', '.css'],
  },
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ? './.env.production' : './.env.development';
const env = dotenv.config({ path: envFile }).parsed;

module.exports = {
  entry: './src/main.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
    stats: {
        colors: true,
        reasons: true,
        errorDetails: true
    },


    resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@img': path.resolve(__dirname, 'src/assets/img'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@cart': path.resolve(__dirname, 'src/components/cart'),
        '@products': path.resolve(__dirname, 'src/components/products'),
        '@interfaces': path.resolve(__dirname, 'src/interfaces')




    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|jpg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

     new webpack.DefinePlugin({
          'process.env': JSON.stringify(env)
        })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: 8080,
    open: true,
    //disableHostCheck: true,
    allowedHosts: 'all'
  },
  devtool: 'source-map',
  mode: 'development',
};

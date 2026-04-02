const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
   static: {
        directory: path.join(__dirname, "dist"), // serve from dist
      },
    liveReload: true,    // fallback reload
    hot: true,           // enable HMR
    open: true,         // auto open browser
    port: 8080,
    watchFiles: ["src/**/*"], // watch source files


   /* static: ['./'],*/
  },
});

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: path.resolve('src/main.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/ThoughtProcessing',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('website/index.html'),
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve('dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    liveReload: false,
    // client: {
    //   overlay: false,
    // },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: 'asset/resource', // ✅ tells Webpack to emit the file and return its URL
            generator: {
                       filename: 'assets/img/[name][ext]',
                     },
       },
       {
             test: /\.css$/i,
             use: ['style-loader', 'css-loader'],
           },



],
  },
  resolve: {
    alias: {
     '@img': path.resolve(__dirname, 'src/assets/img'),

 // ✅ alias now included
    },
    extensions: ['.tsx', '.ts', '.js', '.json', '.png'],
  },
};

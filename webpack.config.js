// webpack.config.mjs
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: path.resolve('src/main.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist'),
        publicPath: '/',
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
        liveReload: false,// ✅ prevents full page reload


       /*client: {
           overlay: false, // ✅ disables the big red error overlay
*/

    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

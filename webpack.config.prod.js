import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

export default {
    mode: 'production',
    devtool: 'source-map',
    entry:{
        vendor: path.resolve(__dirname, 'src/vendor'),
        main: path.resolve(__dirname, 'src/index.js')
    },
    target: 'web',
    output:{
        path:path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
          })
        ],
        splitChunks: {
            cacheGroups: {
              vendor: {
                chunks: "initial",
                test: "vendor",
                name: "vendor",
                enforce: true
              }
            }
        }
      },
    plugins: [
        new WebpackMd5Hash(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true
        })
    ],
    module:{
        rules:[
            {test:/\.js$/, exclude:/node_modules/, loaders: ['babel-loader']},
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']}
        ]
    }
}
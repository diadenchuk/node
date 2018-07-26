import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
//import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    mode: 'production',
    devtool: 'source-map', // adds original js files for debugging in browser
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
        // minify JS
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
          })
        ],
        // use CommonChunkPlugin to create a separate bundle of vendor libraries so that they're cached separately
        // in the old webpack 2 version probably it was placed in 'plugins' section
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
        // cache busting. we'll only get a new file when the css has actually changed
        // generate an external css file with a hash in the filename
        //new ExtractTextPlugin('[name].[contenthash].css'),

        // hash the files using MD5 so that their names change when the content changes
        new WebpackMd5Hash(),

        // create HTML file that includes reference to bundled JS
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true
        })
    ],
    module:{
        rules:[
            {test:/\.js$/, exclude:/node_modules/, loaders: ['babel-loader']},
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']} // ExtractTextPlugin doesn't work for some reason
        ]
    }
}
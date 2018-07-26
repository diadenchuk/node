import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    //noInfo: false,
    entry:[
        path.resolve(__dirname, 'src/index.js')
    ],
    target: 'web',
    output:{
        path:path.resolve(__dirname, 'src'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify:{
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash:true,
                minifyJS:true,
                minifyCSS: true,
                minifyURLs: true
            },
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
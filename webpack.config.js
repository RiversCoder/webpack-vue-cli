const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devtool: 'inline-source-map',
    devServer:{
        contentBase: path.resolve(__dirname,'dist'),
        port: 3002,
        open: true,
        hot: true
    },
    module:{
        rules: [{
            test:/\.js$/, 
            loader: 'babel-loader', 
            exclude:/node_modules/
        },{
            test:/\.css$/,
            use:[ miniCssExtractPlugin.loader, {
                loader: 'css-loader',
                options: {
                    url: false
                }
            }]
        },{
            test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: 'file-loader',
                options:{
                    limit:10000,
                    name:'dist/img/[name].[ext]?[hash]'
                }
            }]
        },{
            test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use:[{
                loader: "url-loader",
                options:{
                    limit:10000,
                    name:'dist/fonts/[name].[ext]?[hash]'
                }
            }]
        },
        {
            test:/\.less$/,
            use:[ 'vue-style-loader', 'css-loader', 'less-loader' ]
        },
        {
            test:/\.vue$/,
            loader:'vue-loader',
            options:{
                loaders: {
                    'css': '',
                    'less': [ 'vue-style-loader', 'css-loader', 'less-loader']
                }
            }
        }]
    },
    resolve:{
        extensions: ['.js', '.vue', '.json'],
        alias:{
            'vue$':'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname,'./src'),
        }
    },
    plugins:[
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            hash: true,
            open: true,
            filename: 'index.html',
            title:'webpack-vue',
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new miniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    externals:{
        'jquery': 'window.jQuery'
    }
}

/*
* 生成生产代码的时候才触发 新增全局 process.env.NODE_ENV = "production"
*/
if (process.env.NODE_ENV === 'production') {
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
    ])
}


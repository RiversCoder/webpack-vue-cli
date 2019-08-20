const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        publicPath: './'
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
            use:[ miniCssExtractPlugin.loader, 'css-loader']
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
            use:[ miniCssExtractPlugin.loader, 'css-loader', 'less-loader' ]
        },
        {
            test:/\.vue$/,
            loader:'vue-loader',
            options:{
                loaders: {
                    'css': '',
                    'less': [ miniCssExtractPlugin.loader, 'css-loader', 'less-loader']
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
        // 加载 vue-loader 插件
        new VueLoaderPlugin(),
        // 生成 index.html
        new htmlWebpackPlugin({
            hash: true,
            open: true,
            filename: 'index.html',
            title:'webpack-vue',
            template: './index.html'
        }),
        // 热模块替换 HMR
        new webpack.HotModuleReplacementPlugin(),
        // 从文件中提取 css
        new miniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css',
        }),
        // 压缩 css
        new OptimizeCSSAssetsPlugin({}) 
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                }
            }
        }
    },
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


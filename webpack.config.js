const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module:{
        rules: [{
            test:/\.js$/, 
            loader: 'babel-loader', 
            exclude:/node_modules/
        },{
            test:/\.css$/,
            use:[ 'style-loader', 'css-loader']
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
                    'less': [ 'vue-style-loader', 'css-loader', 'less-loader']
                }
            }
        }]
    },
    resolve:{
        //引入路径是不用写对应的后缀名
        extensions: ['.js', '.vue', '.json'],
        //缩写扩展
        alias:{
            //正在使用的是vue的运行时版本，而此版本中的编译器时不可用的，我们需要把它切换成运行时 + 编译的版本
            'vue$':'vue/dist/vue.esm.js',// 'vue/dist/vue.common.js' for webpack 1
            //用@直接指引到src目录下，如：'./src/main'可以写成、'@/main'
            '@': path.resolve(__dirname,'./src'),
        }
    },
    plugins:[
        new VueLoaderPlugin()
    ]
}
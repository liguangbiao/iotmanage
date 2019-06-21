// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    publicPath: './',
    //开发代理
    devServer:{
        proxy: {
            '/api': {
                target: 'http://api.test.chuangfeigu.com/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
    //打包压缩图片
    // chainWebpack: config => {
    //     config.module
    //         .rule('images')
    //         .use('image-webpack-loader')
    //         .loader('image-webpack-loader')
    //         .options({
    //             bypassOnDebug: true
    //         })
    //         .end()
    // },
    //代码压缩配置
    // configureWebpack:{
    //     optimization: {
    //         minimizer: [
    //             new UglifyJsPlugin({
    //                 uglifyOptions: {
    //                     compress: {
    //                         warnings: false,
    //                         drop_console: true, //console
    //                         drop_debugger: false // pure_funcs: ['console.log']移除
    //                     }
    //                 }
    //             })
    //         ]
    //     }
    // }
}
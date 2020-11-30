const path = require("path");
module.exports = {
    productionSourceMap: false,
    publicPath: './',
    outputDir: 'iguard-vue', //打包后的名字
    // 我也不知道是什么，复制的
    chainWebpack: config => {
        config.plugin("define").tap(args => {
            args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
            return args;
        });
        // config.optimization.minimize(true);
    },
    // baseUrl: process.env.NODE_ENV === 'production' ? './' : './',
    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
    // 配置alias
    configureWebpack: () => ({
        resolve: {
            alias: {
                "@": path.resolve("./src")
            }
        }
    }),
    devServer: {
        port: 8888, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: '<url>',
                ws: true,
                changeOrigin: true
            },
            '/foo': {
                target: '<other_url>'
            },
            '/sns': {
                target: 'https://api.weixin.qq.com'
            }
        }
    }
};
module.exports = {
    lintOnSave: true,
    assetsDir: "assets",
    publicPath: "./",
    productionSourceMap: false,
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import '@/assets/css/variables.scss';
                    @import '@/assets/css/mixins.scss';
                `
            }
        }
    },
    devServer: {
        open: true,
        proxy: {
            public: {
                target: "http://h5.tucy.top",
                // target: "http://localhost:7010",
                ws: true,
                changeOrigin: true
            },
            api: {
                target: "http://h5.tucy.top", //要代理的本地api地址，也可以换成线上测试地址
                // target: "http://localhost:7010",
                changeOrigin: true //允许跨域
                // pathRewrite: { "^/api": "" } //将/api开头替换为/api
            }
        }
    }
}

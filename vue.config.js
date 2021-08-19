const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  lintOnSave: false,
  assetsDir: "assets",
  pages: {
    index: {
      // page 的入口
      entry: "src/main",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "H5制作平台",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
    // .set('assets', resolve('src/assets'))
    // .set('components', resolve('src/components'))
    // .set('views', resolve('src/views'))
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: "chunk-vendors",
          minChunks: 4,
          test: /node_modules/,
          priority: -10,
          chunks: "initial",
        },
        common: {},
      },
    });
  },
  configureWebpack: (config) => {
    // if (process.env.VUE_APP_ANALYZER == "1") {
    //   const BundleAnalyzerPlugin =
    //     require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
    //   config.plugins.push(new BundleAnalyzerPlugin());
    // }
  },
  // webpack-dev-server 相关配置
  // devServer: {
  //     open: process.platform === "darwin",
  //     host: "0.0.0.0",
  //     port: 8080,
  //     https: false,
  //     hotOnly: true,
  //     proxy: {
  //         // file: {
  //         //   target: process.env.VUE_APP_SERVER_URL,
  //         //   ws: true,
  //         //   changeOrigin: true,
  //         // },
  //         // hyperone: {
  //         //   target: process.env.VUE_APP_SERVER_URL,
  //         //   ws: true,
  //         //   changeOrigin: true,
  //         // },
  //     } // 设置代理
  //     // before: app => {}
  // }
};

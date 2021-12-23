module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
        plugins: "@/plugins",
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://www.codeman.ink:3000", //代理URL
        changeOrigin: true, //是否跨域
        ws: true, //开实时通信
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};

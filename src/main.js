import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
import "lib-flexible";
import "./less/index.less";
import { Lazyload } from "vant";
import "./less/iconfont.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "./utils/dayjs";
import "swiper/css/swiper.css";
import { ImagePreview } from "vant";
import 'animate.css';
import '@/utils/anime.min.js'
// 全局注册
Vue.use(ImagePreview);
Vue.use(VueAwesomeSwiper /* { default options with global component } */);
Vue.use(Vant);
Vue.use(Lazyload, {
  lazyCompile: true,
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

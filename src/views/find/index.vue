<template>
  <div class="find  ">
    <van-nav-bar class="app-nav-bar animate__flipInX animate__animated">
      <van-button
        class="searchbtn"
        slot="title"
        size="small"
        round
        type="info"
        icon="search"
        to="/search"
      >
        搜索
      </van-button>
      <van-icon
        size="25"
        slot="left"
        name="bar-chart-o"
        color="#707177"
        @click="showPopup"
      ></van-icon>
      <van-icon
        size="25"
        slot="right"
        name="service"
        color="#707177"
      ></van-icon>
    </van-nav-bar>
    <div class="components">
      <Swipe :home="home" />
      <List />
      <Songtitle />
      <Recommendedlist />
      <Newdisc></Newdisc>
    </div>
    <van-popup
      v-model="show"
      position="left"
      :style="{ height: '100%', width: '50%' }"
      round
    >
      <Layout></Layout>
    </van-popup>
  </div>
</template>

<script>
import Swipe from "./components/Swipe.vue";
import Songtitle from "./components/recommendsong.vue";
import Recommendedlist from "./components/recommendedlist.vue";
import List from "./components/recommendlist.vue";
import Newdisc from "./components/Newdisc.vue";
import Layout from "@/views/my/components/layout.vue";
import { gethome} from "@/api/find.js";
export default {
  name: "find",
  components: {
    Swipe,
    List,
    Songtitle,
    Recommendedlist,
    Newdisc,
    Layout,
  },
  data() {
    return {
      show: false,
      home:{}
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
     async gethome(){
      const { data } = await gethome({
        refresh:true
      });
      this.home=data
      // console.log(data.data);
    }
  },
  created(){
    
       this.gethome();
  }
};
</script>

<style lang="less" scoped>
.find {
  .app-nav-bar {
    background-image: -moz-linear-gradient(
      135deg,
      rgb(205, 253, 254),
      rgb(252, 207, 248)
    );

    background-image: -webkit-linear-gradient(
      135deg,
      rgb(205, 253, 254),
      rgb(252, 207, 248)
    );

    background-image: linear-gradient(
      135deg,
      rgb(205, 253, 254),
      rgb(252, 207, 248)
    );
    margin-bottom: 20px;
    .searchbtn {
      /deep/ .van-nav-bar__title {
        max-width: none;
      }
      width: 215px;
      height: 32px;
      background: #fbfbfc;
      border: none;
      /deep/ .van-button__text {
        color: #e5e5e6;
      }
      /deep/ .van-icon-search {
        color: #e3e3e4;
      }
    }
  }
  .components {
    height: 80vh;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>

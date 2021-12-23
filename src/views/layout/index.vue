<template>
  <div class="layout">
    <van-tabbar v-model="active" active-color="#ea4c44">
      <van-tabbar-item to="/" icon="wap-home-o">发现</van-tabbar-item>
      <van-tabbar-item to="/podcast" icon="service-o">播客</van-tabbar-item>
      <van-tabbar-item to="/my" icon="music-o">我的</van-tabbar-item>
      <van-tabbar-item to="/follow" icon="success">关注</van-tabbar-item>
      <van-tabbar-item to="Yuncun" icon="fire-o">云村</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.layout {
  background: transparent;
  /deep/ .van-hairline--top-bottom,
  .van-tabbar,
  .van-tabbar--fixed {
    background: transparent;
  }
  /deep/ .van-tabbar-item--active {
    background-image: -moz-linear-gradient(
      135deg,
      rgb(255, 204, 205),
      rgb(208, 251, 249)
    ) !important;

    background-image: -webkit-linear-gradient(
      135deg,
      rgb(255, 204, 205),
      rgb(208, 251, 249)
    ) !important;

    background-image: linear-gradient(
      135deg,
      rgb(255, 204, 205),
      rgb(208, 251, 249)
    ) !important;
  }
  /deep/ .van-tabbar-item--active,.van-tabbar-item {
    transition: all 0.5s;
  }
}
</style>
>

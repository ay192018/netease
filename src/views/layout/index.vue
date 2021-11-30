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
}
</style>
>

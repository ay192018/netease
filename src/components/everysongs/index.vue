<template>
  <div class="everysongs">
    <van-nav-bar
      title="每日推荐歌单"
      left-arrow
      @click-left="onClickLeft"
      fixed
      :border="false"
    />
    <van-image width="100vw" height="200" :src="list[random].al.picUrl" class="animate__rubberBand  animate__animated" />
    <Songs :list="list"></Songs>
  </div>
</template>

<script>
import { getmeirituijiangequ } from "@/api/login.js";
import { random } from "@/utils/formatnumbers.js";
import Songs from "./songs.vue";
export default {
  name: "everysongs",
  beforeCreate() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
  },
  data() {
    return {
      list: [],
    };
  },
  components: {
    Songs,
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async getmeirituijiangequ() {
      const { data } = await getmeirituijiangequ();
      this.list = data.data.dailySongs;
      //   console.log(data.data);
    },
  },
  created() {
    this.getmeirituijiangequ();
    // console.log(this.random);
    this.$toast.success("搜索成功");
  },
  computed: {
    random() {
      return parseInt(Math.random() * (this.list.length - 1 - 0) + 0);
    },
  },
};
</script>

<style lang="less" scoped>
.everysongs {
  margin: auto;
  /deep/ .van-nav-bar {
    background-color: transparent;
    border: none;
    color: aqua;
  }
  /deep/ .van-nav-bar__title {
    color: #e4e4e4;
  }
  /deep/ .van-cell,
  .van-cell--clickable {
    background: transparent;
  }
}
</style>

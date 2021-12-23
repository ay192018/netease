<template>
  <div class="Taste">
    <van-cell
      title="听歌排行"
      :label="`累计听歌${data.listenSongs}首`"
      clickable
      :border="false"
    />
    <van-cell
      title="我喜欢的音乐"
      label="累计听歌12首"
      clickable
      :to="{
        name: 'songsinfo',
        params: {
          id: userplaylist[0].id,
        },
      }"
    />
    <Likemusic :userplaylist="userplaylist"></Likemusic>
  </div>
</template>

<script>
import Likemusic from "@/views/my/components/likemusic.vue";
import { getusergedas, getmeirituijiangequ } from "@/api/login.js";
export default {
  name: "Taste",
  components: { Likemusic },
  data() {
    return {
      userplaylist: [],
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async getusergedas() {
      //用户歌单
      const { data } = await getusergedas(this.data.profile.userId);
      console.log(data.playlist);
      this.userplaylist = data.playlist;
     
    },
    async getmeirituijiangequ() {
      const { data } = await getmeirituijiangequ();
      // console.log(data, 1);
     
    },
  },
  created() {
    this.getusergedas();
    this.getmeirituijiangequ();
  },
};
</script>

<style lang="less" scoped>
.Taste {
  background: transparent;
  position: absolute;
  top: 85%;
  width: 95vw;
  margin-left: 10px;
  /deep/ .van-cell,
  .van-cell--clickable,
  .van-cell--borderless {
    font-size: 12px;
    background: transparent;
  }
}
</style>

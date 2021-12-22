<template>
  <div class="like">
    <div class="likemusic" v-for="(item, index) in userplaylist" :key="index" >
      <div class="img">
        <van-image
          class="toux"
          width="40"
          height="40"
          radius="15"
          fit="cover"
          :src="item.coverImgUrl"
        />
      </div>
      <van-cell
        :to="{
          name: 'songsinfo',
          params: {
            id: item.id,
          },
        }"
        :title="item.name"
        :label="`${item.trackCount}首, ${item.creator.nickname}`"
      />
    </div>
  </div>
</template>

<script>
import { getuserinfo, getusergedan, getusergedas } from "@/api/login.js";
import { mapState } from "vuex";
export default {
  name: "likemusic",
  props: {
    userplaylist: {
      type: Array,
      required: true,
      
    },
  },
  data() {
    return {};
  },
  methods: {
    async getuserinfo() {
      const { data } = await getuserinfo(this.profile.userId);
      // console.log(data, this.profile.userId);
      this.$store.commit("getuserxinxi", data);
    },
    async getusergedan() {
      const { data } = await getusergedan();
      // console.log(data);
    },
  },
  computed: {
    ...mapState(["userxinxi", "profile"]),
  },
  created() {
    this.getuserinfo();
    this.getusergedan();
  },
};
</script>

<style lang="less" scoped>
.like {
  background-color: transparent;
  padding-bottom: 100px;
  .likemusic {
    width: 95vw;
    margin: auto;
    height: 70px;
    border-radius: 15px;
    margin-top: 15px;
    border: 2px solid #ccc;
    display: flex;
    align-items: center;
    .img {
      margin-left: 15px;
    }
    .like {
      margin-left: 15px;
      .count {
        margin-top: 6px;
      }
    }
  }
  /deep/ .van-cell {
    background: transparent;
  }
}
</style>

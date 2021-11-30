<template>
  <router-link
    :to="{
      name: 'songsinfo',
      params: {
        id: userplaylist[0].id,
      },
    }"
  >
    <div class="likemusic">
      <div class="img">
        <van-image
          class="toux"
          width="40"
          height="40"
          radius="15"
          fit="cover"
          :src="userplaylist[0].coverImgUrl"
        />
      </div>
      <div class="like">
        <div class="Ilike">{{ userplaylist[0].name }}</div>
        <div class="count">{{ userplaylist[0].trackCount }}首</div>
      </div>
    </div>
  </router-link>
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
.likemusic {
  width: 95vw;
  margin: auto;
  height: 70px;
  border-radius: 15px;
  margin-top: 15px;
  background-color: #ccc;
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
</style>

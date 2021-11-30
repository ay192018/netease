<template>
  <div class="my">
    <Userinfo></Userinfo>
    <Fun></Fun>
    <Likemusic :userplaylist="userplaylist"></Likemusic>
    <Gedan :userplaylist="userplaylist"></Gedan>
    <Layout></Layout>
  </div>
</template>

<script>
import Fun from "./components/fun.vue";
import Userinfo from "./components/userinfo.vue";
import Layout from "./components/layout.vue";
import Likemusic from "./components/likemusic.vue";
import Gedan from "./components/gedan.vue";
import { getusergedas, getmeirituijiangequ } from "@/api/login.js";
import { mapState } from "vuex";
export default {
  name: "my",
  data() {
    return {
      userplaylist: [],
    };
  },
  components: {
    Userinfo,
    Fun,
    Likemusic,
    Gedan,
    Layout,
  },
  methods: {
    async getusergedas() {
      //用户歌单
      const { data } = await getusergedas(this.profile.userId);
      // console.log(data.playlist);
      this.userplaylist = data.playlist;
    },
    async getmeirituijiangequ() {
      const { data } = await getmeirituijiangequ();
      console.log(data, 1);
    },
  },
  created() {
    this.getusergedas();
    this.getmeirituijiangequ();
  },
  computed: {
    ...mapState(["userxinxi", "profile"]),
  },
};
</script>

<style></style>

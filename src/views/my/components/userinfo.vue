<template>
  <div class="userinfo">
    <div class="ziliaol" v-if="token">
      <div style="text-align: center">
        <van-image
          class="toux"
          width="60"
          height="60"
          round
          fit="cover"
          :src="profile.avatarUrl"
        />
        <div class="lijilogin">{{ profile.nickname }}</div>
        <div class="xinxi">
          <span>{{ profile.follows }}关注</span>
          <span>{{ profile.followeds }}粉丝</span>
          <span>Lv.{{ userxinxi.level }}</span>
        </div>
      </div>
    </div>
    <div class="ziliao" v-else>
      <div style="text-align: center" @click="show = true">
        <van-image
          class="toux"
          width="60"
          height="60"
          round
          fit="cover"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="lijilogin">立即登录</div>
      </div>
    </div>
    <van-popup v-model="show" round position="top" :style="{ height: '50%' }">
      <Login :show="show"></Login>
    </van-popup>
  </div>
</template>

<script>
import Login from "./login.vue";
import { getshuaxin } from "@/api/login.js";
import { mapState } from "vuex";
export default {
  name: "userinfo",
  components: { Login },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapState(["token", "profile", "userxinxi"]),
  },
  methods: {
    async getshuaxin() {
      await getshuaxin();
    },
  },
  created() {
    this.getshuaxin();
  },
};
</script>

<style lang="less" scoped>
.userinfo {
  position: relative;
  margin-top: 50px;
  .ziliao {
    border-radius: 15px;
    width: 95vw;
    height: 100px;
    margin: auto;
    background: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ziliaol {
    border-radius: 15px;
    width: 95vw;
    height: 100px;
    margin: auto;
    background: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .toux {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%);
  }
  .xinxi {
    margin-top: 10px;
    & span {
      margin-right: 6px;
    }
  }
  .lijilogin {
    margin-top: 10px;
    font-size: 15px;
    font-weight: bold;
  }
}
</style>

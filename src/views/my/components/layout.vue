<template>
  <div class="layout" v-if="token">
    <van-cell
      title="退出登录"
      clickable
      class="layoutlogin"
      @click="notlogin"
    />
  </div>
</template>

<script>
import { grtlogout } from "@/api/login.js";
import { mapState } from "vuex";
export default {
  name: "layout",
  methods: {
    notlogin() {
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "确认退出？",
        })
        .then(() => {
          // on confirm
          grtlogout();
          this.$toast.success("退出成功");
          localStorage.removeItem("cookie");
          localStorage.removeItem("token");
          localStorage.removeItem("profile");
          location.reload();
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  computed: {
    ...mapState(["token"]),
  },
};
</script>

<style lang="less" scoped>
.layout {
  margin-bottom: 150px;
  width: 50vw;
  margin: auto;

  .layoutlogin {
    margin-top: 15px;
    border-radius: 15px;
    text-align: center;
    background: #ccc;
    & span {
      color: #d86262;
    }
  }
}
</style>

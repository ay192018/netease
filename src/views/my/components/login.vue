<template>
  <div class="code">
    <van-nav-bar class="navlogin" title="手机号登录"> </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号码"
      />
      <van-field
        v-model="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        type="password"
      >
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" class="btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getlogin } from "@/api/login.js";
export default {
  name: "login",
  data() {
    return {
      iskowmshow: false,
      phone: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      //   console.log("submit", values);
      const { data } = await getlogin(this.phone, this.password);
      console.log(data);
      if (data.code === 200) {
        this.$toast.success("登录成功");

        // this.$store.commit("getcookie", data.cookie);

        // this.$store.commit("gettoken", data.token);
        this.$store.commit("islogin");
        this.$store.commit("islogin");
        window.localStorage.setItem("profile", JSON.stringify(data.profile));
        window.localStorage.setItem("cookie", JSON.stringify(data.cookie));
        window.localStorage.setItem("token", JSON.stringify(data.token));
        // window.localStorage.setItem("userId", data.profile.userId);

        //   this.$store.commit("getcookie");
        location.reload();
        this.$router.push("/my");
      } else {
        this.$toast.fail("登录失败");
      }
    },
  },
};
</script>

<style></style>

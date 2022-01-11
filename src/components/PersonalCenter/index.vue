<template>
  <div class="PersonalCenter" ref="imgurl">
    <van-nav-bar
      :title="data.profile.nickname"
      left-arrow
      @click-left="$router.back()"
      fixed
      :border="false"
    />
    <van-image
      class="img"
      width="100%"
      height="40vh"
      :src="data.profile.backgroundUrl"
    />
    <div class="info" style="text-align: center">
      <van-image
        class="toux"
        width="60"
        height="60"
        round
        fit="cover"
        :src="data.profile.avatarUrl"
      />
      <div class="lijilogin">{{}}</div>
      <div class="xinxi">
        <router-link
          :to="{
            name: 'userprofile',
            params: {
              id: this.id,
            },
          }"
          class="to"
        >
          <span>{{ data.profile.followeds | handleNum }}关注</span>
        </router-link>
        <router-link
          :to="{
            name: 'userprofile',
            params: {
              id: this.id,
            },
          }"
          class="to"
        >
          <span>{{ data.profile.follows | handleNum }}粉丝</span>
        </router-link>
        <span>Lv.{{ data.level }}</span>
      </div>
      <div class="all">
        <div class="like">
          {{ data.profile.province + " " + data.profile.city }}
        </div>
      </div>
      <van-button
        round
        class="btn"
        type="small"
        size="50"
        icon="plus"
        v-if="token"
        color=" linear-gradient(180deg, rgb(253, 206, 215), rgb(252, 226, 207))"
        >关注</van-button
      >
    </div>
    <dynamic :data="data" :id="id"></dynamic>
    <Taste :data="data"></Taste>
  </div>
</template>

<script>
import { mapState } from "vuex";
import dynamic from "./dynamic.vue";
import Taste from "./Taste.vue";
import { getuserinfo } from "@/api/login.js";
import { ImagePreview } from "vant";
export default {
  name: "PersonalCenter",
  data() {
    return {
      data: {},
    };
  },
  props: {
    id: {
      type: [String, Number, Array],
      required: true,
    },
  },
  components: { dynamic, Taste },
  methods: {
    async getuserinfo() {
      const { data } = await getuserinfo(this.id);
      this.data = data;
      console.log(this.data.profile);
      this.$nextTick(() => {
        this.img();
      });
    },
    // async getusergedan() {
    //   const { data } = await getusergedan();

    //   console.log(data);
    // },
    img() {
      const imgurl = this.$refs["imgurl"];

      let imgs = imgurl.querySelectorAll("img");
      // console.log(imgs);
      const imgPath = [];
      imgs.forEach((img, index) => {
        imgPath.push(img.src);
        img.addEventListener("click", () => {
          ImagePreview({
            images: imgPath,
            startPosition: index,
          });
        });
      });
    },
  },
  created() {
    this.getuserinfo();
  },
  computed: {
    ...mapState(["token"]),
  },
  filters: {
    handleNum(num) {
      if (num > 100000000) {
        num = (num / 100000000).toFixed(2);
        return num + "亿";
      } else if (num > 10000) {
        num = (num / 1000).toFixed(2);
        return num + "万";
      } else {
        return num;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.PersonalCenter {
  width: 100vw;
  margin: auto;
  margin-bottom: 500px;
  /deep/ .van-nav-bar {
    background: transparent;
  }
  .img {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
  }
  .info {
    width: 95vw;
    margin-left: 10px;
    border-radius: 15px;
    background-image: linear-gradient(
      90deg,
      rgb(254, 223, 205),
      rgb(205, 250, 254)
    );
    height: 150px;
    position: absolute;
    top: 30%;
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
  .toux {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%);
  }
  .like {
    width: auto;
    height: 20px;
    border-radius: 15px;
    background: #ccc;
    margin-right: 15px;
    border: 1px solid #ededed;
    text-align: center;
  }
  .all {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn {
    margin-top: 10px;
  }
  /deep/ .van-nav-bar__title {
    font-size: 15px;
  }
  .to {
    color: #000;
  }
}
</style>

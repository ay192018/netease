<template>
  <div class="audio animate__lightSpeedInLeft animate__animated">
    <div class="left" @click="show = true">
      <div ref="img">
        <van-image
          ref="img"
          width="30"
          height="30"
          round
          :src="playlist[currentPlay].al.picUrl"
        />
      </div>
      <div class="songsname van-ellipsis">
        {{
          `${playlist[currentPlay].name}--   
             ${playlist[currentPlay].ar[0].name}`
        }}
      </div>
    </div>

    <div class="right">
      <van-icon
        name="play-circle-o "
        size="25"
        color="#6c6c6c"
        @click="play"
        v-show="!isPlaying"
      />
      <van-icon
        name="stop-circle-o"
        size="25"
        color="#6c6c6c"
        @click="pause"
        v-show="isPlaying"
      />
      <van-icon name="bars" size="25" color="#6c6c6c" />
    </div>
    <audio
      class="audios"
      ref="getaudio"
      @ended="ended"
      @error="error"
      @loadedmetadata="onLoadedmetadata"
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[currentPlay].id}.mp3`"
    ></audio>
    <div class="getContainer">
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '100%', width: '100%' }"
        get-container="#app"
      >
        <van-nav-bar
          :title="`${playlist[currentPlay].name}--   
             ${playlist[currentPlay].ar[0].name}`"
          :border="false"
          ref="bg"
          class="animate__animated animate__rollIn"
        >
          <van-icon
            name="arrow-down"
            @click="closes"
            slot="left"
            size="23"
            color="#e4e4e4"
          />
          <div slot="right">
            <van-icon name="share-o" slot="right" size="23" color="#e4e4e4" />
          </div>
        </van-nav-bar>
        <Playmusic
          :play="play"
          :pause="pause"
          :closes="closes"
          ref="Playmusic"
          :duration="duration"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import Playmusic from "./playmusic.vue";
import { mapState } from "vuex";
const random = (m, n) => {
  const num = Math.floor(Math.random() * (m - n) + n);
  return num;
};

export default {
  name: "audios",
  components: { Playmusic },
  computed: {
    ...mapState([
      "playlist",
      "currentPlay",
      "intvalID",
      "isPlaying",
      "ref",
      "searchlist",
      "playmodel",
    ]),
  },
  data() {
    return {
      show: false,
      duration: "",
    };
  },

  methods: {
    play() {
      if (this.$refs.getaudio.paused) {
        this.$store.commit("switchPlayPause");
        this.$store.commit("setintvalID", this.playlist[this.currentPlay].id);
        this.$refs.getaudio.play();
      }
    },
    pause() {
      if (!this.$refs.getaudio.paused) {
        this.$store.commit("switchPlayPause");
        this.$refs.getaudio.pause();
      }
    },
    rotate() {
      let rotateVal = 0;
      let img = this.$refs.img;
      setInterval(() => {
        rotateVal += 3;
        img.style.transform = "rotate(" + rotateVal + "deg)";
        img.style.transition = "0.1s linear";
      }, 300);
    },
    closes() {
      this.show = false;
    },
    ended() {
      this.$nextTick(() => {
        this.$store.commit("switchPlayPause");
        this.$refs.getaudio.pause();
      });
      if (this.playmodel === 0) {
        if (this.currentPlay + 1 >= this.playlist.length) {
          this.$toast.fail("没有下一首咯");
          return;
        }
      } else if (this.playmodel === 1) {
        if (
          random(0, this.playlist.length - 1 || this.searchlist.length - 1) >=
          this.playlist.length
        ) {
          this.$toast.fail("没有下一首咯");
          return;
        }
      }
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.$store.commit("setcurrentPlay", this.currentPlay + 1);
      this.$store.commit(
        "setintvalID",
        this.$store.state.playlist[this.currentPlay].id
      );
      this.$nextTick(() => {
        this.ref.play();
        if (this.ref.played) {
          this.$store.commit("switchPlayPause");
          this.$toast.clear({
            clearAll: true,
          });
        }
      });
    },
    error() {
      this.$toast.fail("歌曲暂时不能播放");
      this.$nextTick(() => {
        this.$store.commit("switchPlayPause");
        this.$refs.getaudio.pause();
      });
      if (this.playlist.length < this.currentPlay + 2) {
        this.$toast.fail("没有下一首咯");
        return;
      }
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.$store.commit("setcurrentPlay", this.currentPlay + 1);
      this.$store.commit(
        "setintvalID",
        this.$store.state.playlist[this.currentPlay].id
      );
      this.$nextTick(() => {
        this.ref.play();
        if (this.ref.played) {
          this.$store.commit("switchPlayPause");
          this.$toast.clear({
            clearAll: true,
          });
        }
      });
    },
    onLoadedmetadata(e) {
      this.duration = e.target.duration;
    },
    // playing(e) {
    //   if (e.target.paused) {
    //     this.$store.commit("switchPlayPause");
    //     console.log(1);
    //   }
    //   if (e.target.played) {
    //     this.$store.commit("switchPlayPause");
    //   }
    // },
  },

  mounted() {
    this.rotate();
    this.$store.commit("setref", this.$refs.getaudio);
  },
};
</script>

<style lang="less" scoped>
.audio {
  border-top: 1px solid #99ffc9;
  border-bottom: 1px solid #99ffc9;

  background-image: -moz-linear-gradient(
    0deg,
    rgb(250, 209, 229),
    rgb(207, 236, 252)
  );

  background-image: -webkit-linear-gradient(
    0deg,
    rgb(250, 209, 229),
    rgb(207, 236, 252)
  );

  background-image: linear-gradient(
    0deg,
    rgb(250, 209, 229),
    rgb(207, 236, 252)
  );
  position: fixed;
  bottom: 50px;
  width: 95%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-left: 10px;
  border-radius: 25px;
  .right {
    width: 80px;
    display: flex;
    justify-content: space-between;
  }
  .left {
    margin-left: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .songsname {
      width: 160px;
      margin-left: 15px;
      color: #6c6c6c;
    }
  }
  .audios {
    position: fixed;
    right: 0;
    width: 30vh;
  }
}
/deep/ .van-nav-bar__title {
  color: #000;
  font-size: 12px;
}

/deep/ .van-nav-bar__content,
.van-nav-bar {
  background: linear-gradient(79deg, rgb(205, 254, 239), rgb(251, 208, 219));
}
</style>

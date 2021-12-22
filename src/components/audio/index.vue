<template>
  <div class="audio animate__bounce animate__animated">
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
      <van-icon name="points" size="25" color="#6c6c6c" />
    </div>
    <audio
      class="audios"
      ref="getaudio"
      controls="controls"
      loop
      hidden
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[currentPlay].id}.mp3`"
    ></audio>
    <div class="getContainer">
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '100%', width: '100%' }"
        get-container="body"
      >
        <van-nav-bar
          :title="`${playlist[currentPlay].name}--   
             ${playlist[currentPlay].ar[0].name}`"
          :border="false"
          ref="bg"
          class="animate__animated animate__jello"
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
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import Playmusic from "./playmusic.vue";
import { mapState } from "vuex";
export default {
  name: "audios",
  components: { Playmusic },
  computed: {
    ...mapState(["playlist", "currentPlay", "intvalID", "isPlaying"]),
  },
  data() {
    return {
      show: false,
      audio: this.$refs.getaudio,
    };
  },

  methods: {
    play() {
      if (this.$refs.getaudio.paused) {
        this.$store.commit("switchPlayPause");
        // console.log([this.$refs.getaudio]);
        this.$refs.getaudio.autoplay = true;
        this.$store.commit("setintvalID", this.playlist[this.currentPlay].id);
        this.$refs.getaudio.play();
      }

      // this.paused = this.$refs.getaudio.paused;

      // console.log(this.playlist[this.currentPlay].id);

      // this.$store.dispatch("actisPlaying", this.$refs.getaudio.paused);
    },
    pause() {
      if (!this.$refs.getaudio.paused) {
        this.$store.commit("switchPlayPause");
        // console.log(this.isPlaying);
        this.$refs.getaudio.pause();
      }
      // console.log(this.$refs.getaudio.paused);

      // this.paused = this.$refs.getaudio.paused;
    },
    // switchPlayPause() {
    //   if (this.$refs.getaudio.paused) {
    //     this.$refs.getaudio.play();
    //     this.$store.commit("switchPlayPause", !this.isPlaying);
    //     // console.log("播放");
    //   } else {
    //     this.$refs.getaudio.pause();
    //     this.$store.commit("switchPlayPause", !this.isPlaying);
    //     // console.log("暂停");
    //   }
    // },
    rotate() {
      let rotateVal = 0;
      let img = this.$refs.img;
      setInterval(() => {
        rotateVal += 3;
        img.style.transform = "rotate(" + rotateVal + "deg)";
        img.style.transition = "0.1s linear";
      }, 300);
    },
    // updatetime() {
    //   this.$store.state.intvalID = setInterval(() => {
    //     this.$store.commit("setcurrent", this.$refs.getaudio.currentTime);
    //   }, 1000);
    // },
    getContainer() {
      return document.querySelector(".getContainer");
    },
    closes() {
      this.show = false;
    },
  },
  watch: {
    audio(ne, old) {
      console.log();
    },
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

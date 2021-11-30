<template>
  <div class="audio">
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
        {{ playlist[currentPlay].name }}
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
          :title="playlist[currentPlay].name"
          :border="false"
          ref="bg"
        >
          <van-icon
            name="arrow-down"
            @click="show = false"
            slot="left"
            size="23"
            color="#e4e4e4"
          />
          <div slot="right">
            <van-icon name="share-o" slot="right" size="23" color="#e4e4e4" />
          </div>
        </van-nav-bar>
        <Playmusic :play="play" :pause="pause" />
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
    };
  },

  methods: {
    play() {
      if (this.$refs.getaudio.paused) {
        this.$store.commit("switchPlayPause", !this.isPlaying);
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
        this.$store.commit("switchPlayPause", !this.isPlaying);
        // console.log(this.isPlaying);
        this.$refs.getaudio.pause();
      }
      // console.log(this.$refs.getaudio.paused);

      // this.paused = this.$refs.getaudio.paused;
    },
    switchPlayPause() {
      if (this.$refs.getaudio.paused) {
        this.$refs.getaudio.play();
        this.$store.commit("switchPlayPause", !this.isPlaying);
        // console.log("播放");
      } else {
        this.$refs.getaudio.pause();
        this.$store.commit("switchPlayPause", !this.isPlaying);
        // console.log("暂停");
      }
    },
    rotate() {
      let rotateVal = 0;
      let img = this.$refs.img;
      setInterval(() => {
        rotateVal += 3;
        img.style.transform = "rotate(" + rotateVal + "deg)";
        img.style.transition = "0.1s linear";
      }, 100);
    },
    // updatetime() {
    //   this.$store.state.intvalID = setInterval(() => {
    //     this.$store.commit("setcurrent", this.$refs.getaudio.currentTime);
    //   }, 1000);
    // },
    getContainer() {
      return document.querySelector(".getContainer");
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
  background: linear-gradient(90deg, rgb(253, 204, 255), rgb(153, 236, 255));
  position: fixed;
  bottom: 50px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>

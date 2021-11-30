<template>
  <div class="playmusic">
    <van-image
      class="bigimg"
      width="100%"
      height="650"
      :src="playlist[currentPlay].al.picUrl"
    />
    <div class="imge" ref="img" v-show="songs" @click="songs = !songs">
      <van-image
        width="100%"
        height="100%"
        round
        :src="playlist[currentPlay].al.picUrl"
      />
    </div>
    <div class="songs" v-show="!songs" @click="songs = !songs">
      <!-- <p v-for="(item, index) in Lyriclist" :key="index" class="Lyric">
        {{ item.Lyric }}
      </p> -->
    </div>
    <div class="bottom">
      <div class="icons">
        <van-icon
          size="22"
          v-if="like"
          color="#97a0a2"
          name="like-o"
          @click="likes"
        />
        <van-icon
          size="22"
          v-else
          color="#97a0a2"
          name="like"
          @click="nolikes"
        />
        <van-icon size="22" color="#97a0a2" name="down" />
        <van-icon size="22" color="#97a0a2" name="chat-o" @click="go" />
        <van-icon size="22" color="#97a0a2" name="ellipsis" />
      </div>
      <div class="progress">
        <van-slider v-model="value" @change="onChange" />
      </div>
      <div class="play">
        <van-icon color="#97a0a2" size="28" name="replay" />
        <van-icon
          color="#97a0a2"
          size="28"
          name="arrow-left"
          @click="goplay(-1)"
        />
        <van-icon
          color="#97a0a2"
          size="35"
          name="play-circle-o"
          v-show="!isPlaying"
          @click="play"
        />

        <van-icon
          color="#97a0a2"
          @click="pause"
          size="35"
          name="stop-circle-o"
          v-show="isPlaying"
        />
        <van-icon name="arrow" color="#97a0a2" size="28" @click="goplay(1)" />
        <van-icon color="#97a0a2" size="28" name="music-o" />
      </div>
    </div>
    <van-popup v-model="minishow" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar title="评论" :border="false" class="commentss">
        <van-icon
          name="arrow-left"
          slot="left"
          size="23"
          color="#e4e4e4"
          @click="minishow = false"
        />
        <div slot="right">
          <van-icon name="share-o" slot="right" size="23" color="#e4e4e4" />
        </div>
      </van-nav-bar>
      <Comment
        :comment="comment"
        :hotComments="hotComments"
        @unshift="unshift"
      ></Comment>
    </van-popup>
  </div>
</template>

<script>
import { gethotcomment } from "@/api/comment.js";
import Comment from "@/components/comment/";
import { mapState, mapGetters } from "vuex";
export default {
  name: "playmusic",
  components: {
    Comment,
  },
  data() {
    return {
      show: false, //弹出层开关
      minishow: false, //评论弹出层开关
      like: true, //是否收藏
      value: 1, //播放进度
      songs: true, //歌词的切换
      lyric: {}, //歌词内容
      actives: 0, //歌词索引
      comment: [], //最新评论
      hotComments: [], //最热评论
    };
  },
  computed: {
    ...mapState([
      "playlist",
      "currentPlay",
      "intvalID",
      "Lyric",
      "current",
      "isPlaying",
      "ref",
    ]),
    // ...mapGetters(["Lyriclist"]),
  },

  methods: {
    play() {
      this.$attrs.play();
    },
    pause() {
      this.$attrs.pause();
    },
    rotate() {
      let rotateVal = 0;
      let img = this.$refs.img;
      setInterval(() => {
        rotateVal += 1;
        img.style.transform = "rotate(" + rotateVal + "deg)";
        img.style.transition = "0.8s linear";
      }, 100);
    },
    goplay(num) {
      // console.log(num);
      // console.log(this.playlist, this.currentPlay, this.intvalID);
      let index = this.currentPlay + num;
      if (index < 0) {
        index = this.playlist.length - 1;
      } else if (index == this.playlist.length) {
        index = 0;
      }
      this.$store.commit("setcurrentPlay", index);
      this.$store.commit(
        "setintvalID",
        this.$store.state.playlist[this.currentPlay].id
      );
    },

    likes() {
      this.$toast.success("已添加到我喜欢的音乐");
      this.like = false;
    },
    nolikes() {
      this.$toast.success("已取消喜欢");
      this.like = true;
    },
    onChange(value) {
      this.$toast("当前值：" + value);
    },
    async go() {
      this.minishow = true;
      const { data } = await gethotcomment(this.intvalID);
      console.log(data);
      this.comment = data.comments;
      this.hotComments = data.hotComments;
    },
    unshift(data) {
      console.log(data);
      this.comment.unshift(data.comment);
    },
  },
  mounted() {
    this.rotate();
    setInterval(() => {
      this.value++;
    }, 1300);
  },
  updated() {},
};
</script>

<style lang="less" scoped>
.playmusic {
  position: relative;
  width: 100%;
  height: 621px;
  overflow: hidden;
  .imge {
    width: 200px;
    height: 200px;
    position: absolute;
    border-radius: 50%;
    border: 5px solid rgba(190, 255, 179, 0.5);

    top: 20%;
    left: 21%;
    transform: translate(-50%, -50%);
  }
  .songs {
    width: 300px;
    height: 500px;
    position: absolute;

    overflow-y: scroll;
    top: 41%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .Lyric {
      color: #fff;
      font-size: 18px;
    }
    .active {
      color: #bbffb3;
      font-size: 22px;
    }
  }
  .bigimg {
    filter: blur(40px);
    z-index: -99;
  }
  .bottom {
    width: 100%;
    height: 150px;
    bottom: 0%;
    left: 0;
    right: 0;
    position: absolute;

    .icons {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 30px;
    }
    .play {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 30px;
    }
  }
  .commentss {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }
}
</style>

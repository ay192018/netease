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

    <div class="songs " v-show="!songs" @click="songs = !songs" ref="box"  >
      <p
        v-for="(item, index) in gc"
        :key="index"
        class="Lyric"
        :class="
          currtime >= key[index] && currtime < key[index + 1] ? 'active' : ''
        "
      >
        {{ item[1] }}
      </p>
    </div>

    <div class="bottom">
      <div class="icons">
        <van-icon
          size="22"
          v-if="!like"
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
        <van-slider v-model="value" @change="onChange" step="0.01" :max="1" />
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
    <van-popup
      v-model="minishow"
      position="bottom"
      :style="{ height: '100%' }"
      :get-container="getContainer"
    >
      <van-nav-bar title="评论" :border="false" class="commentss">
        <van-icon
          name="arrow-left"
          slot="left"
          size="23"
          color="#e4e4e4"
          @click="close"
        />
        <div slot="right">
          <van-icon name="share-o" slot="right" size="23" color="#e4e4e4" />
        </div>
      </van-nav-bar>
      <Comment
        :comment="comment"
        :hotComments="hotComments"
        @unshift="unshift"
        :tuijiancooments="tuijiancooments"
        :close="close"
        :closes="closes"
      ></Comment>
    </van-popup>
  </div>
</template>

<script>
import http from "@/utils/http.js";
import { debounce } from "lodash";
import { gethotcomment, getlike, getnewcomment } from "@/api/comment.js";
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
      like: false, //是否收藏
      value: 1, //播放进度
      songs: true, //歌词的切换
      gc: null,
      key: [],
      actives: 0, //歌词索引
      comment: [], //最新评论
      hotComments: [], //最热评论
      tuijiancooments: [], //推荐评论
      id: this.intvalID,
    };
  },
  props: {
    closes: {
      type: Function,
      required: true,
    },
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
      "currtime",
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
      if (this.isPlaying == true) {
        clearInterval(timer);
      }
      let rotateVal = 0;
      let img = this.$refs.img;
      let timer = setInterval(() => {
        rotateVal += 5;
        img.style.transform = `rotate( ${rotateVal}deg)`;

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
      if (this.isPlaying == false) {
        this.$store.commit("switchPlayPause");
      }
      this.$store.commit("setcurrentPlay", index);
      this.$store.commit(
        "setintvalID",
        this.$store.state.playlist[this.currentPlay].id
      );
    },

    async likes() {
      this.like = true;
      const { data } = await getlike({
        id: this.intvalID,
        like: true,
      });
      // console.log(this.playlist);
      this.$toast.success("已添加到我喜欢的音乐");
    },
    async nolikes() {
      this.$toast.success("已取消喜欢");
      this.like = false;
      const { data } = await getlike({
        id: this.intvalID,
        like: false,
      });
      // console.log(data);
    },
    onChange(value) {
      this.$toast("当前音量：" + value * 100);
      this.ref.volume = value;

      console.log(this.ref.currentTime);
      // this.$nextTick(() => {
      //   this.ref.fastSeek(5);
      // });
      // this.ref.duration
    },
    async go() {
      this.minishow = true;

      const datas = await getnewcomment({
        id: this.intvalID,
        type: 0,
        pageSize: 2000000,
      });

      console.log(datas.data.data.comments);
      this.tuijiancooments = datas.data.data.comments;
      let commnew = Date.parse(new Date());
      const { data } = await gethotcomment({
        id: this.intvalID,
        limit: 5000,
        timestamp: commnew,
      });
      // console.log(data);
      this.comment = data.comments;
      this.hotComments = data.hotComments;
    },
    unshift(data) {
      // console.log(data);
      this.comment.unshift(data.comment);
    },
    getContainer() {
      return document.querySelector(".playmusic");
    },
    close() {
      this.minishow = false;
    },
    monitor() {
      http({
        url: "/lyric",
        params: {
          id: this.intvalID,
        },
      }).then(({ data }) => {
        // console.log(data);
        let lyrics = data.lrc.lyric;
        let arr = lyrics.split("\n");
        let array = [];
        // let obj = {};
        let time = "";
        let value = "";
        let result = [];
        let key = [];
        //去除空行
        arr.forEach((item) => {
          if (item != "") {
            array.push(item);
          }
        });
        arr = array;
        arr.forEach((item) => {
          time = item.split("]")[0];
          value = item.split("]")[1];
          //去掉时间里的中括号得到xx:xx.xx
          var t = time.slice(1).split(":");
          //将结果压入最终数组
          result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
          key.push(parseInt(t[0], 10) * 60 + parseFloat(t[1]));
        });
        this.gc = result;
        this.key = key;
      });
    },
  },
  watch: {
    intvalID: {
      handler(n, old) {
        // console.log(n, old);
        this.monitor();
      },
      immediate: true,
    },

    currtime: {
      handler: debounce(function (newval, oldval) {
        // console.log(newval, oldval);
        let p = document.querySelector(".active");

        this.$refs.box.scrollTop = p.offsetTop - 150;

        // if (
        //   this.currtime >= this.key[index] &&
        //   this.currtime < this.key[index + 1]
        // ) {
        //   console.log(1);
        // }
      }, 300),
      immediate: true,
    },
  },
  mounted() {
    this.rotate();
    setInterval(() => {
      this.$store.commit("currtime", this.ref.currentTime.toFixed(2));
    }, 1000);
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
    border: 5px solid #fbd0db;

    top: 20%;
    left: 21%;
    transform: translate(-50%, -50%);
  }
  .songs {
    width: 300px;
    height: 350px;
    position: absolute;
    transition-delay: 0.5s;
    transition-timing-function: linear;
    transition-property: scroll;
    overflow-y: scroll;
    top: 41%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .Lyric {
      color: #ccc;
      font-size: 16px;
      transition: all 0.5s;
      margin-top: 1px;
    }
    .active {
      border-radius: 15px;
      color: #fbd0db;
      transform: rotateX(360deg);

      text-shadow: 2px 2px 4px #fbd0db;
      transition: all 0.5s;
      font-size: 20px;

      transition: all 0.5s;
    }
  }
  .bigimg {
    filter: blur(35px);

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

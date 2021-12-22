<template>
  <div class="songsinfo auto">
    <img class="filterimg" :src="playlist.coverImgUrl" />
    <van-nav-bar title="歌单" class="nav" :border="false">
      <van-icon
        name="arrow-left"
        slot="left"
        size="23"
        @click="$router.back()"
        color="#e4e4e4"
      />
      <div slot="right">
        <van-icon name="search" slot="right" size="23" color="#e4e4e4" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-icon name="ellipsis" slot="right" size="23" color="#e4e4e4" />
      </div>
    </van-nav-bar>
    <div class="songsmaterial" ref="imgurl">
      <div class="left">
        <van-image
          class="userimgs"
          width="130"
          height="130"
          radius="15"
          :src="playlist.coverImgUrl"
        />
        <div class="count">{{ playlist.playCount | handleNum }}</div>
      </div>
      <div class="right">
        <div class="userinfo">
          <div class="info van-ellipsis">{{ playlist.name }}</div>
          <div class="infoname">
            <van-image
              width="25"
              height="25"
              round
              fit="cover"
              :src="playlist.creator.avatarUrl"
            />

            <span class="username">{{ playlist.creator.nickname }}</span>

            <van-button round type="info" size="mini" color="#666565">
              <van-icon name="plus" slot="icon" />
            </van-button>
          </div>
        </div>
        <div class="usertitle van-ellipsis">
          {{ playlist.description }}
        </div>
      </div>
    </div>
    <div class="xuanxiang">
      <div class="item">
        <van-icon size="20" color="#484949" name="add-o" />
        <div>{{ playlist.subscribedCount | handleNum }}</div>
      </div>
      <div class="item">
        <van-icon size="20" color="#484949" name="chat-o" />
        <div>{{ playlist.commentCount | handleNum }}</div>
      </div>
      <div class="item">
        <van-icon size="20" color="#484949" name="share-o" />
        <div>{{ playlist.shareCount | handleNum }}</div>
      </div>
    </div>
    <div class="audiolist">
      <div class="allplay">
        <van-icon name="play-circle-o" size="18" color="#ea4d44" />
        <span class="allplaytitle">播放全部</span>
        <span class="playcount">({{ playlist.trackCount | handleNum }}首)</span>
      </div>
      <div class="iconlist">
        <van-icon name="down" color="#6c6c6c" size="18" />
        <van-icon name="success" color="#6c6c6c" size="18" class="gou" />
      </div>
    </div>
    <div class="box">
      <div class="allist" v-for="(songs, index) in tracks" :key="index" :class="index%2===0?'animate__animated animate__bounceInLeft':'animate__animated animate__bounceInRight'">
        <div class="index">{{ index + 1 }}</div>
        <van-cell
          :label="`${songs.ar[0].name}-${songs.name}`"
          clickable
          @click="getaudio(songs, index)"
          class="list"
        >
          <template #title>
            <span class="songname">{{ songs.name }}</span>
            <span class="songname" v-if="songs.alia.length === 1"
              >({{ songs.alia[0] }})</span
            >
          </template>
          <template #right-icon>
            <van-icon name="ellipsis" size="18" />
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getrsonginfo, getallsonginfo } from "@/api/find.js";
import { ImagePreview } from "vant";
export default {
  name: "songsinfo",
  beforeCreate() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
  },
  data() {
    return {
      playlist: {}, //歌单信息
      tracks: [],
    };
  },
  props: {
    id: {
      type: [String, Number, Array],
      required: true,
    },
  },
  methods: {
    getrsonginfo() {
      getrsonginfo(this.id)
        .then(({ data }) => {
          this.playlist = data.playlist;
          this.tracks = data.playlist.tracks;
          this.$nextTick(() => {
            this.img();
          });
        })
        .catch((err) => {
          console.log(err);
        });
      getallsonginfo(this.id)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {});
    },
    // getallsonginfo() {
    //   getallsonginfo(this.id)
    //     .then(({ data }) => {
    //       console.log(data);
    //       // this.playlist = data.playlist;
    //       // this.tracks = data.playlist.tracks;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    getaudio(songs, index) {
      // console.log(this.tracks[this.currentPlay].id);
      this.$store.commit("setplaylist", this.tracks);
      this.$nextTick(() => {
        if (this.ref.paused) {
          this.ref.autoplay = true;
          this.ref.play();

          if (this.isPlaying == false) {
            this.$store.commit("switchPlayPause");
          }
        }
      });
      this.$store.commit("setcurrentPlay", index);
      this.$store.commit(
        "setintvalID",
        this.$store.state.playlist[this.currentPlay].id
      );
    },

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
    this.getrsonginfo();
    // this.getallsonginfo();
    this.$toast.success("加载成功");
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
  computed: {
    ...mapState(["currentPlay", "intvalID", "isPlaying", "ref"]),
  },
};
</script>

<style lang="less" scoped>
.songsinfo {
  position: relative;
  width: 100%;
  background: transparent;
  .filterimg {
    width: 100%;
    height: 250px;
    z-index: -1;
    filter: blur(40px);
  }
  /deep/ .van-nav-bar {
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    background: transparent;
  }
  /deep/ .van-nav-bar__title {
    color: #e4e4e4;
  }
  .songsmaterial {
    width: 350px;
    height: 130px;
    position: absolute;
    top: 40px;
    left: 12px;
    display: flex;
    justify-content: space-between;
    .left {
      position: relative;
      .count {
        position: absolute;
        right: 5px;
        top: 5px;
        color: antiquewhite;
      }
    }
    .right {
      width: 200px;
      .userinfo {
        width: 100%;
        .info {
          color: #dfdfdf;
          font-size: 15px;
          font-weight: 500;
        }
        .infoname {
          margin-top: 10px;
          display: flex;
          align-items: center;
          .userimgs {
            margin-right: 8px;
          }
          .username {
            color: #dfdfdf;
            margin-right: 8px;
          }
        }
      }
      .usertitle {
        margin-top: 50px;
        color: #dfdfdf;
      }
    }
  }
  .xuanxiang {
    width: 270px;
    height: 40px;
    background: #e8e8e8;
    border-radius: 20px;
    position: absolute;
    left: 55px;
    top: 220px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
      display: flex;
      flex-wrap: nowrap;
      & div {
        margin-left: 5px;
      }
    }
  }
  .audiolist {
    width: 350px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .allplay {
      display: flex;
      .allplaytitle {
        margin: 0 5px 5px;
        font-size: 13px;
        color: #414142;
        font-weight: bold;
      }
      .playcount {
        font-size: 13px;
        color: #414142;
        font-weight: bold;
      }
    }
    .gou {
      margin-left: 8px;
    }
  }
  .allist {
    width: 95vw;
    margin: auto;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .index {
      color: #9c9c9d;
      font-size: 15px;
    }
    .allist {
      height: 50px;
      /deep/ .van-cell__title {
        display: flex;
      }
      .songname {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .list {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  /deep/.van-cell {
    background: transparent;
  }
  .box {
    height: 45vh;
    overflow-y: auto;
  }
}
</style>

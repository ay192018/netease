<template>
  <div class="historyplay">
    <van-nav-bar
      title="最近播放"
      :border="false"
      ref="bg"
      class="animate__animated animate__rollIn"
    >
      <van-icon
        name="arrow-down"
        @click="$router.back()"
        slot="left"
        size="23"
        color="#e4e4e4"
      />
    </van-nav-bar>
    <div class="audiolist">
      <div class="allplay">
        <van-icon name="play-circle" size="18" color="#ea4d44" />
        <span class="allplaytitle">播放全部</span>
        <span class="playcount">({{ songs.length }}首)</span>
      </div>
      <div class="iconlist">
        <van-icon name="success" color="#6c6c6c" size="18" class="gou" />
      </div>
    </div>
    <div class="list">
      <van-cell
        clickable
        v-for="(item, index) in songs"
        :key="index"
        class="animate__animated animate__rollIn"
        @click="play(index)"
      >
        <div class="items">
          <div class="item">
            <div class="leftimg">
              <van-image
                width="40"
                height="40"
                radius="8"
                :src="item.al.picUrl"
              />
            </div>
            <div class="title">
              <div class="songsname">{{ item.name }}</div>
              <div class="songstitle">
                {{ `${item.ar[0].name}-${item.name}` }}
              </div>
            </div>
          </div>
          <div class="icon"><van-icon name="ellipsis" size="20" /></div>
        </div>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { Historyplay } from "@/api/login.js";
import { mapState } from "vuex";
export default {
  name: "historyplay",
  data() {
    return {
      songs: [],
    };
  },
  methods: {
    async Historyplay() {
      const { data } = await Historyplay({
        uid: this.profile.userId,
        type: 1,
      });
      // console.log(data.weekData);
      data.weekData.forEach((item) => {
        this.songs.push(item.song);
      });
      console.log(this.songs);
    },
    play(index) {
      // console.log(index);

      this.$store.commit("setplaylist", this.songs);
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
      console.log(this.intvalID);
    },
  },
  computed: {
    ...mapState(["profile", "currentPlay", "intvalID", "isPlaying", "ref"]),
  },
  mounted() {
    this.Historyplay();
  },
};
</script>

<style lang="less" scoped>
.historyplay {
  background-color: transparent;
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
  .list {
    height: 80vh;
    overflow-y: auto;
    .items {
      display: flex;
      align-items: center;
      .item {
        display: flex;
        align-items: center;
        .title {
          width: 70vw;
          margin-left: 10px;
          height: 50px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          .songsname {
            color: #5b5b5b;
            font-size: 14px;
            font-weight: bold;
          }
          .songstitle {
            color: #c4c4c4;
            font-size: 10px;
          }
        }
      }
    }
  }
  /deep/ .van-cell {
    background-color: transparent;
  }
  /deep/ .van-nav-bar {
    background-color: transparent;
  }
}
</style>

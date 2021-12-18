<template>
  <div class="songs">
    <div class="audiolist">
      <div class="allplay">
        <van-icon name="play-circle" size="18" color="#ea4d44" />
        <span class="allplaytitle">播放全部</span>
        <span class="playcount">({{ list.length }}首)</span>
      </div>
      <div class="iconlist">
        <van-icon name="success" color="#6c6c6c" size="18" class="gou" />
      </div>
    </div>
    <div class="list">
      <van-cell
        clickable
        v-for="(item, index) in list"
        :key="index"
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
import { mapMutations, mapState } from "vuex";
export default {
  name: "songs",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapMutations(["setcurrentPlay"]),
    play(index) {
      console.log(index);
      this.$store.commit("setplaylist", this.list);
      this.$nextTick(() => {
        if (this.ref.paused) {
          this.ref.play();
          this.ref.autoplay = true;
          if (this.isPlaying == false) {
            this.$store.commit("switchPlayPause");
          }
        }
      });

      this.setcurrentPlay(index);
      this.$store.commit(
        "setintvalID",
        this.$store.state.playlist[this.currentPlay].id
      );
    },
  },
  computed: {
    ...mapState(["currentPlay", "intvalID", "isPlaying", "ref"]),
  },
};
</script>

<style lang="less" scoped>
.songs {
  width: 95vw;
  height: 200px;

  margin: auto;
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
    height: 47vh;
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
}
</style>

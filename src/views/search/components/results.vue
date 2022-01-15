<template>
  <div class="results">
    <van-cell
      clickable
      v-for="(item, index) in searchlist"
      :key="index"
      :class="
        index % 2 === 0
          ? 'animate__animated animate__bounceInLeft'
          : 'animate__animated animate__bounceInRight'
      "
      @click="getaudio(index)"
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
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "results",
  props: {},
  beforeCreate() {},
  methods: {
    getaudio(index) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.$store.commit("setplaylist", this.searchlist);
      if (this.ref.paused) {
        this.setcurrentPlay(index);
        this.$store.commit("switchPlayPause");
        this.$store.commit(
          "setintvalID",
          this.$store.state.playlist[this.currentPlay].id
        );
        this.$nextTick(() => {
          this.ref.play();
          this.$store.commit("switchPlayPause");
        });
      } else {
        this.$nextTick(() => {
          this.$store.commit("switchPlayPause");
          this.ref.pause();
        });
        this.$store.commit("setcurrentPlay", index);
        this.$store.commit(
          "setintvalID",
          this.$store.state.playlist[this.currentPlay].id
        );
        this.$nextTick(() => {
          this.$store.commit("switchPlayPause");
          this.ref.play();
        });
      }
    },
    ...mapMutations(["setcurrentPlay"]),
  },
  computed: {
    ...mapState(["currentPlay", "intvalID", "searchlist", "ref", "isPlaying"]),
  },
};
</script>

<style lang="less" scoped>
.results {
  width: 95vw;
  margin: auto;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  overflow: auto;
  height: 80vh;
  .allist {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .index {
      color: #9c9c9d;
      font-size: 14px;
    }
    .songname {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow-x: hidden !important;
    }
  }
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
</style>

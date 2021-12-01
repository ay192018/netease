<template>
  <div class="results">
    <div class="allist" v-for="(songs, index) in searchlist" :key="index">
      <div class="index">{{ index + 1 }}</div>
      <van-cell
        :label="`${songs.ar[0].name}-${songs.name}`"
        @click="getaudio(index)"
        clickable
      >
        <template #title>
          <span class="songname van-ellipsis">{{ songs.name }}</span>
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
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "results",
  props: {},
  methods: {
    getaudio(index) {
      this.$nextTick(() => {
        if (this.ref.paused) {
          this.ref.play();
          this.ref.autoplay = true;
          this.$store.commit("switchPlayPause", !this.isPlaying);
        }
      });
      this.$store.commit("switchPlayPause", !this.isPlaying);
      this.$store.commit("setplaylist", this.searchlist);
      this.$store.commit(
        "setintvalID",
        this.$store.state.playlist[this.currentPlay].id
      );
      // this.$store.dispatch("requestLyric", this.intvalID);
      this.setcurrentPlay(index);
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
      overflow: hidden;
    }
  }
}
</style>

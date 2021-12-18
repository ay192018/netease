<template>
  <div class="song auto">
    <van-cell title="推荐歌单">
      <template #right-icon>
        <van-button
          round
          type="info"
          size="mini"
          color="linear-gradient(to right, #ffd1b8, #d59eff)"
          to="/Gedansquare"
          >点击更多</van-button
        >
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.song {
  background: transparent;
  /deep/ .van-cell {
    background: transparent;
    padding: 0;
    /deep/ .van-cell__title {
      font-weight: 800;
      font-size: 16px;
    }
  }
}
</style>

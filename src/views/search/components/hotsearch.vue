<template>
  <div class="hotsearch">
    <div class="title">热搜榜</div>
    <div class="content">
      <div
        class="list"
        v-for="(item, index) in hotsearch"
        :key="index"
        @click="gosearch(item.searchWord)"
      >
        <div class="number" :class="{ active: index < 3 }">{{ index + 1 }}</div>
        <div class="name" :class="{ hot: index < 3 }">
          {{ item.searchWord }}
        </div>
        <van-icon
          name="fire-o"
          color="#ee0a24"
          class="icon"
          v-if="index == 0"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hotsearch",

  props: {
    hotsearch: {
      type: Array,
      required: true,
    },
  },
  methods: {
    gosearch(item) {
      // console.log(item);
      this.$parent.value = item;
      this.$parent.onSearch(item);
    },
  },
};
</script>

<style lang="less" scoped>
.hotsearch {
  width: 95vw;
  margin: 0 auto;
  .title {
    font-size: 15px;
  }
  .content {
    width: 100%;
    background: #ff6700;
    margin-top: 10px;

    .list {
      float: left;
      width: 50%;
      flex: 1;
      display: flex;
      font-size: 15px;

      .number {
        width: 12%;
        margin-right: 5px;
        font-size: 12px;
        vertical-align: middle;
      }
      .active {
        color: red;
        font-weight: bold;
      }
      .hot {
        font-size: 15px;
        font-weight: bold;
        color: #cfd2fc;
      }
    }
  }
  .name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
  }
  /deep/ .icon,
  .van-icon,
  .van-icon-fire-o {
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>

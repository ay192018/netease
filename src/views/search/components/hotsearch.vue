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
      console.log(item);
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
      }
      .active {
        color: #9effe0;
      }
      .hot {
        font-weight: bold;
        color: #ffccc2;
      }
    }
  }
}
</style>

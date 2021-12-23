<template>
  <div class="history" v-if="searchhistory.length">
    <div class="title">历史</div>
    <div class="content">
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in searchhistory"
            :key="index"
            :class="
              index % 2 === 0
                ? 'animate__animated animate__bounceInLeft'
                : 'animate__animated animate__bounceInRight'
            "
            @click="gosearch(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="delete">
      <van-icon name="delete-o" size="25" color="#ccc" @click="deletes" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getsearchinfo } from "@/api/search.js";
export default {
  name: "history",
  computed: { ...mapState(["searchhistory"]) },
  data() {
    return {
      historylist: [],
    };
  },
  props: {},
  methods: {
    deletes() {
      if (this.searchhistory.length !== 0) {
        this.$dialog
          .confirm({
            title: "确认",
            message: "确定清空历史记录码",
          })
          .then(() => {
            // on confirm
            this.$store.commit("qingkongsearchhistory", []);
            this.$toast.success("删除成功");
          })
          .catch(() => {
            // on cancel
            this.$toast.fail("取消删除");
          });
      }
    },
    async gosearch(item) {
      this.$parent.value = item;
      this.$parent.onSearch(item);
    },
  },
};
</script>

<style scoped>
.history {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95vw;
  height: auto;

  margin: auto;
}
.content {
  width: 70vw;
}

.swiper {
  height: 100%;
  overflow: auto;
}
.swiper-wrapper {
  margin-top: 5px;
  width: 80px;
  height: auto;
}
.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 15px;
  text-align: justify;
  margin-right: 5px;
  color: #ccc;
  min-width: auto;
  background-image: -moz-linear-gradient(
    90deg,
    rgb(208, 241, 251),
    rgb(254, 220, 205)
  );

  background-image: -webkit-linear-gradient(
    90deg,
    rgb(208, 241, 251),
    rgb(254, 220, 205)
  );

  background-image: linear-gradient(
    90deg,
    rgb(208, 241, 251),
    rgb(254, 220, 205)
  );
  width: auto !important;
}

.title {
  font-size: 15px;
}
</style>

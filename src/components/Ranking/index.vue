<template>
  <div class="Ranking">
    <van-nav-bar
      title="排行榜"
      left-arrow
      @click-left="$router.back()"
      fixed
      :border="false"
    />
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in Ranking"
        :key="index"
        :class="{ active: index % 2 === 0 }"
      >
        <div class="left">
          <div class="title">{{ item.name }}</div>
          <van-image
            width="70"
            height="70"
            radius="15"
            :src="item.coverImgUrl"
          />
        </div>
        <div class="right">
          <div v-for="(itemsongs, index) in item.tracks" :key="index">
            {{ index + 1 }},{{ itemsongs.first }}
          </div>
          <div v-if="item.tracks.length === 0">暂无TOP3排行歌曲</div>
        </div>
        <div class="everyday">{{ item.updateFrequency }}</div>
        <van-button
          round
          text="点击查看排行榜"
          type="info"
          class="btn"
          color="linear-gradient(180deg, rgb(168, 194, 255), rgb(153, 231, 255))"
          :to="{
            name: 'songsinfo',
            params: {
              id: item.id,
            },
          }"
        ></van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getRanking } from "@/api/find.js";
export default {
  name: "Ranking",
  beforeCreate() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
  },
  data() {
    return {
      Ranking: [],
    };
  },
  methods: {
    async getRanking() {
      const { data } = await getRanking();
      console.log(data);
      this.Ranking = data.list;
    },
    add() {
      console.log(1);
    },
  },
  created() {
    this.$toast.success("加载成功");
  },
  mounted() {
    this.getRanking();
  },
};
</script>

<style lang="less" scoped>
.Ranking {
  width: 95vw;
  margin: 0 auto;
  .content {
    margin-top: 50.78px;
    height: 77vh;
    overflow: auto;
    .item {
      margin-top: 20px;
      position: relative;
      background: linear-gradient(
        90deg,
        rgb(168, 196, 255),
        rgb(255, 248, 153)
      );
      width: 100%;
      height: 100px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      .left {
        width: 70px;
        margin-left: 15px;
        .title {
          width: 100%;
          margin-bottom: 5px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .right {
        margin-left: 15px;
        & div {
          margin-top: 5px;
        }
      }
      .everyday {
        position: absolute;
        right: 10px;
        top: 10px;
        color: #d0c7cb;
      }
      .btn {
        position: absolute;
        right: 5px;
        top: 40px;
      }
      /deep/ .van-button__text {
        font-size: 10px;
        height: 10px;
        line-height: 10px;
      }
    }
  }
  .active {
    background: linear-gradient(
      135deg,
      rgb(250, 209, 248),
      rgb(205, 254, 215)
    ) !important;
  }
  /deep/ .van-nav-bar {
    background: linear-gradient(135deg, rgb(246, 206, 253), rgb(251, 217, 208));
  }
}
</style>

<template>
  <div class="comment">
    <div class="comments">评论区</div>
    <van-tabs v-model="active" animated>
      <van-tab title="推荐">
        <div
          class="everycomments"
          v-for="(item, index) in tuijiancooments"
          :key="index"
        >
          <div class="info">
            <div class="left">
              <router-link
                :to="{
                  name: 'PersonalCenter',
                  params: {
                    id: item.user.userId,
                  },
                }"
              >
                <van-image
                  width="30"
                  height="30"
                  round
                  fit="cover"
                  :src="item.user.avatarUrl"
                  @click="show"
                />
              </router-link>
              <div class="title">
                <div class="username">{{ item.user.nickname }}</div>
                <div class="fabutime">{{ item.time | datetime }}</div>
              </div>
            </div>

            <div class="likecount">
              {{ item.likedCount
              }}<van-icon
                :name="item.liked ? 'good-job' : 'good-job-o'"
                slot
                size="25"
                @click="like(item)"
              />
            </div>
          </div>

          <div class="content">
            {{ item.content }}
          </div>
          <div class="replay" v-if="item.showFloorComment !== null">
            {{ item.showFloorComment.replyCount }}条回复>
          </div>
        </div>
      </van-tab>
      <van-tab title="最新">
        <div
          class="everycomments"
          v-for="(item, index) in comment"
          :key="index"
        >
          <div class="info">
            <div class="left">
              <router-link
                :to="{
                  name: 'PersonalCenter',
                  params: {
                    id: item.user.userId,
                  },
                }"
              >
                <van-image
                  width="30"
                  height="30"
                  round
                  fit="cover"
                  :src="item.user.avatarUrl"
                  @click="show"
                />
              </router-link>
              <div class="title">
                <div class="username">{{ item.user.nickname }}</div>
                <div class="fabutime">{{ item.time | datetime }}</div>
              </div>
            </div>

            <div class="likecount">
              {{ item.likedCount
              }}<van-icon
                :name="item.liked ? 'good-job' : 'good-job-o'"
                slot
                size="25"
                @click="like(item)"
              />
            </div>
          </div>

          <div class="content">
            {{ item.content }}
          </div>
          <div class="replay" v-if="item.showFloorComment !== null">
            {{ item.showFloorComment.replyCount }}条回复>
          </div>
        </div>
      </van-tab>

      <van-tab title="最热">
        <div
          class="everycomments"
          v-for="(item, index) in hotComments"
          :key="index"
        >
          <div class="info">
            <div class="left">
              <router-link
                :to="{
                  name: 'PersonalCenter',
                  params: {
                    id: item.user.userId,
                  },
                }"
              >
                <van-image
                  width="30"
                  height="30"
                  round
                  fit="cover"
                  :src="item.user.avatarUrl"
                  @click="show"
                />
              </router-link>
              <div class="title">
                <div class="username">{{ item.user.nickname }}</div>
                <div class="fabutime">{{ item.time | datetime }}</div>
              </div>
            </div>

            <div class="likecount">
              {{ item.likedCount | handleNum
              }}<van-icon
                :name="item.liked ? 'good-job' : 'good-job-o'"
                slot
                size="25"
                @click="like(item)"
              />
            </div>
          </div>

          <div class="content">
            {{ item.content }}
          </div>
          <div class="replay" v-if="item.showFloorComment !== null">
            {{ item.showFloorComment }}条回复>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-popup position="bottom" v-model="ispostshoow" class="pl">
      <van-field
        v-model="message"
        rows="1"
        autosize
        label="评论"
        type="textarea"
        placeholder="说点好听的吧"
        show-word-limit
      />
      <van-button color="#7232dd" size="small" slot @click="fabu()"
        >评论</van-button
      >
    </van-popup>
    <van-button
      color="linear-gradient(90deg,rgb(255,214,204),rgb(255,163,249))"
      class="btn"
      round
      @click="ispostshoow = true"
      >点击评论</van-button
    >
  </div>
</template>

<script>
import { gethuifucomment, getgoodjob } from "@/api/comment.js";
import { mapState } from "vuex";

export default {
  name: "comment",

  data() {
    return {
      active: 0,
      message: "", //评论内容
      ispostshoow: false,
    };
  },
  props: {
    comment: {
      type: Array,
      required: true,
    },
    hotComments: {
      type: Array,
      required: true,
    },
    tuijiancooments: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async fabu() {
      const cookie = localStorage.getItem("cookie");

      try {
        const { data } = await gethuifucomment(
          cookie,
          this.intvalID,
          this.message
        );
        console.log(data);
        this.$emit("unshift", data);
        this.ispostshoow = false;
        this.message = "";
        this.$toast.success("评论成功");
      } catch (error) {
        console.log(error);
        this.$toast.fail("评论失败,请登录");
      }
    },
    show() {
      this.$attrs.close();
      this.$attrs.closes();
      console.log(this.$attrs);
    },
    async like(item) {
      const { data } = await getgoodjob({
        id: this.intvalID,
        cid: item.commentId,
        t: item.liked == false ? 1 : 0,
        type: 0,
      });
      item.liked = !item.liked;
      item.liked == false ? item.likedCount-- : item.likedCount++;
      this.$toast.success(`${item.liked == false ? "取消点赞" : "点赞"}成功`);
    },
  },
  computed: {
    ...mapState(["intvalID"]),
  },
  created() {},
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
};
</script>

<style lang="less" scoped>
.comment {
  width: 95vw;
  margin: 50px auto;
  background: transparent;
  .everycomments {
    margin-top: 10px;
    background: transparent;
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      .title {
        margin-left: 10px;
        .username {
          color: #000;
          font-size: 14px;
        }
        .fabutime {
          font-size: 10px;
          color: #959595;
        }
      }
    }
    .likecount {
      font-size: 15px;
    }
  }
  .content {
    margin-top: 8px;
    font-size: 13px;
    color: #969799;
  }
  .content {
    margin-left: 36px;
  }
  .btn {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100vw;
  }
  .pl {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  /deep/ .van-cell,
  .van-cell--clickable,
  .van-cell--borderless {
    font-size: 12px;
    background: transparent;
  }
  .replay {
    margin-left: 35px;
    font-size: 12px;
    color: tomato;
    text-decoration: underline;
  }
}
</style>

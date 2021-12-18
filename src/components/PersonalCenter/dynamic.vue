<template>
  <div class="dynamic">
    <van-tabs v-model="active" animated>
      <van-tab title="主页">
        <div class="jibeninfo">
          <div class="xinxi">基本信息</div>
          <div class="ages">
            村龄:{{ data.profile.createTime | relativeTime }}({{
              data.profile.createTime | datetime
            }}注册)
          </div>
          <div class="sex">
            性别:{{ data.profile.gender === 1 ? "男" : "女" }}
          </div>
          <div class="age">年龄:{{ data.profile.birthday | datetime }}</div>
          <div class="my">
            个人简介:
            {{
              data.profile.signature == "" ? "暂无介绍" : data.profile.signature
            }}
          </div>
        </div>
      </van-tab>
      <van-tab title="动态">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "dynamic",
  data() {
    return {
      active: 2,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.dynamic {
  width: 95vw;
  margin-left: 10px;
  position: absolute;
  top: 55%;
  margin-bottom: 500px;
  .jibeninfo {
    background-image: -moz-linear-gradient(
      45deg,
      rgb(207, 252, 207),
      rgb(208, 210, 251)
    );

    background-image: -webkit-linear-gradient(
      45deg,
      rgb(207, 252, 207),
      rgb(208, 210, 251)
    );

    background-image: linear-gradient(
      45deg,
      rgb(207, 252, 207),
      rgb(208, 210, 251)
    );
    height: 200px;
    border-radius: 12px;
  }
  .jibeninfo {
    height: auto;
    & div {
      margin-top: 10px;
      margin-left: 15px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .xinxi {
      margin-top: 10px;
      font-weight: bold;
      font-size: 16px;
    }
    .ages,
    .sex,
    .age,
    .my {
      color: #ababac;
    }
  }
  /deep/ .van-tabs__wrap {
    background: transparent;
  }
  /deep/ .van-tabs__nav,
  .van-tabs__nav--line {
    background: transparent;
  }
}
</style>

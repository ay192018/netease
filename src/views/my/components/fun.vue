<template>
  <div class="fun" v-if="token" >
    <ul class="top" >
      <li>
        <img
          src="./新建文件夹/cc8caa49-ee02-4f63-9235-5205b9ed5f40.png"
          alt=""
        />
        <span>最近播放</span>
      </li>
      <li>
        <img src="./新建文件夹/Snipaste_2021-11-28_21-09-27.png" alt="" />
        <span>本地/下载</span>
      </li>
      <li>
        <img
          src="./新建文件夹/8ef68864-9747-4bd0-af39-5b4aa1e84574.png"
          alt=""
        />
        <span>云盘</span>
      </li>
      <li>
        <img src="./新建文件夹/Snipaste_2021-11-28_21-09-52.png" alt="" />
        <span>已购</span>
      </li>
    </ul>
    <ul class="bottom">
      <li>
        <img src="./新建文件夹/Snipaste_2021-11-28_21-09-08.png" alt="" />
        <span>我的好友</span>
      </li>
      <li>
        <img
          src="./新建文件夹/62744cb9-d1f3-4b72-979d-2686763ffa69.png"
          alt=""
        />
        <span>收藏和赞</span>
      </li>
      <li>
        <img src="./新建文件夹/Snipaste_2021-11-28_21-09-46.png" alt="" />
        <span>我的播客</span>
      </li>
      <li>
        <img
          src="./新建文件夹/eb94a4ee-8372-415b-902b-3f3a4fd34ac7.png"
          alt=""
        />
        <span>音乐罐子</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  anme: "fun",
  computed: {
  ...mapState(['token'])
  },
};
</script>

<style lang="less" scoped>
.fun {
  width: 95vw;
  margin: auto;
  height: 120px;
  border-radius: 15px;
  margin-top: 15px;
 background: transparent;

  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    li {
      text-align: center;
      flex: 1;
      span {
        display: block;
      }
    }
  }
}
</style>

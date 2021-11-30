<template>
  <div class="list auto">
    <div class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img
            class="fimg"
            src="./网易云图标/Snipaste_2021-11-28_21-19-56.png"
            alt=""
          />
          <span>每日推荐</span>
        </div>
        <div class="swiper-slide">
          <div class="icons">
            <img src="./网易云图标/Snipaste_2021-11-28_21-30-52.png" alt="" />
          </div>
          <span>私人FM</span>
        </div>

        <div class="swiper-slide">
          <router-link to="/Gedansquare">
            <div class="icons">
              <img src="./网易云图标/Snipaste_2021-11-28_21-20-12.png" alt="" />
            </div>
          </router-link>
          <span>歌单</span>
        </div>

        <div class="swiper-slide">
          <div class="icons">
            <img src="./网易云图标/Snipaste_2021-11-28_21-20-19.png" alt="" />
          </div>
          <span>排行榜</span>
        </div>
        <div class="swiper-slide">
          <div class="icons">
            <img src="./网易云图标/Snipaste_2021-11-28_21-20-28.png" alt="" />
          </div>
          <span>直播</span>
        </div>
        <div class="swiper-slide">
          <div class="icons">
            <img src="./网易云图标/Snipaste_2021-11-28_21-20-28.png" alt="" />
          </div>
          <span>数字专辑</span>
        </div>
        <div class="swiper-slide">
          <div class="icons">
            <img src="./网易云图标/Snipaste_2021-11-28_21-20-12.png" alt="" />
          </div>
          <span>专注冥想</span>
        </div>
        <div class="swiper-slide">
          <div class="icons">
            <img src="./网易云图标/Snipaste_2021-11-28_21-19-56.png" alt="" />
          </div>
          <span>歌房</span>
        </div>
        <div class="swiper-slide">
          <div class="icons">
            <img src="./网易云图标/Snipaste_2021-11-28_21-19-56.png" alt="" />
          </div>
          <span>游戏专区</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
};
</script>

<style scoped>
.list {
  border-bottom-color: #f6f6f6 1px solid;
  overflow-x: auto;
}
.swiper {
  width: 50px;
  height: 80px;
}

.swiper-slide {
  text-align: center;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.iconfont {
  color: #ef7771;
  font-size: 23px;
}
.icons {
  border-radius: 50%;
  margin-bottom: 5px;
}
.fimg {
  margin-left: 5px;
  margin-bottom: 1px;
}
</style>

<template>
  <div class="list auto">
    <div class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide animate__shakeY animate__animated">
          <router-link to="everysongs">
            <div class="icons">
              <img
                class="fimg"
                src="./网易云图标/Snipaste_2021-11-28_21-30-52.png"
                alt=""
              />
            </div>
          </router-link>
          <span>每日推荐</span>
        </div>
        <div class="swiper-slide animate__shakeX animate__animated" @click="personal">
          <div class="icons">
            <img src="./网易云图标/Snipaste_2021-11-28_21-30-52.png" alt="" />
          </div>
          <span>私人FM</span>
        </div>

        <div class="swiper-slide animate__shakeY animate__animated">
          <router-link to="/Gedansquare">
            <div class="icons">
              <img src="./网易云图标/Snipaste_2021-11-28_21-20-12.png" alt="" />
            </div>
          </router-link>
          <span>歌单</span>
        </div>

        <div class="swiper-slide animate__shakeX animate__animated">
          <router-link to="Ranking">
            <div class="icons">
              <img src="./网易云图标/Snipaste_2021-11-28_21-20-19.png" alt="" />
            </div>
          </router-link>
          <span>排行榜</span>
        </div>
        <div class="swiper-slide animate__shakeY animate__animated">
          <div class="icons">
            <img src="./网易云图标/Snipaste_2021-11-28_21-20-28.png" alt="" />
          </div>
          <span>直播</span>
        </div>
        <div class="swiper-slide animate__shakeX animate__animated">
          <div class="icons">
            <img src="./网易云图标/Snipaste_2021-11-28_21-20-28.png" alt="" />
          </div>
          <span>数字专辑</span>
        </div>
        <div class="swiper-slide animate__shakeX animate__animated">
          <div class="icons">
            <img src="./网易云图标/Snipaste_2021-11-28_21-20-12.png" alt="" />
          </div>
          <span>专注冥想</span>
        </div>
        <div class="swiper-slide animate__shakeX animate__animated">
          <div class="icons">
            <img src="./网易云图标/Snipaste_2021-11-28_21-19-56.png" alt="" />
          </div>
          <span>歌房</span>
        </div>
        <div class="swiper-slide animate__shakeY animate__animated">
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
import { getfindlist, getpersonal ,gethome} from "@/api/find.js";
import { mapMutations, mapState } from "vuex";
export default {
  name: "list",
  data() {
    return {
      findlist: [],
    };
  },
  methods: {
    async getfindlist() {
      const { data } = await getfindlist();
      // console.log(data);
      this.findlist = data.data;
    },
    async personal() {
        // console.log(this.isPlaying);
      const { data } = await getpersonal();
      this.$nextTick(() => {
        if (this.ref.paused) {
          this.ref.play();
          this.ref.autoplay = true;
          if (this.isPlaying == false) {          
            this.$store.commit("switchPlayPause");                     
          }
        }
      });
      this.$store.commit("setplaylist", data.data);
      this.$store.commit("setintvalID", this.$store.state.playlist[0].id);
    },
   
  },
  mounted() {
    this.getfindlist();
    
  },
  computed: {
    ...mapState(["currentPlay", "intvalID", "isPlaying", "ref", "playlist"]),
  },
};
</script>

<style scoped>
.list {
  border-bottom-color: #f6f6f6 1px solid;
  overflow-x: auto;
  background: transparent;
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
  width: 100%;
  height: 100%;

  margin-left: 5px;
  margin-bottom: 1px;
}
</style>

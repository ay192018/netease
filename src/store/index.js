import Vue from "vue";
import Vuex from "vuex";
import { getrsongeci } from "@/api/find.js";

Vue.use(Vuex);
// let defaultMusic = {
//   name: "STAY",
//   id: 1859245776,
//   ar: [
//     {
//       id: 32795025,
//       name: "The Kid LAROI",
//       tns: [],
//       alias: [],
//     },
//     {
//       id: 35531,
//       name: "Justin Bieber",
//       tns: [],
//       alias: [],
//     },
//   ],
//   al: {
//     id: 130016223,
//     name: "STAY",
//     picUrl:
//       "http://p3.music.126.net/e5cvcdgeosDKTDrkTfZXnQ==/109951166155165682.jpg",
//     tns: [],
//     pic_str: "109951166155165682",
//     pic: 109951166155165680,
//   },
// };
let defaultMusic = {
  name: "Black Magic",
  id: 1805317558,
  ar: [
    {
      id: 28527997,
      name: "Jonasu",
      tns: [],
      alias: [],
    },
  ],
  al: {
    id: 120609644,
    name: "Black Magic",
    pic: 109951165549454430,
    picUrl:
      "http://p3.music.126.net/KFS9Z18U07UQKuhXWaFZOg==/109951165549454434.jpg",
    pic_str: "109951165549454434",
  },
};
export default new Vuex.Store({
  state: {
    playlist: [defaultMusic], //播放列表
    currentPlay: 0, //播放列表当前索引值
    isPlaying: false, //播放状态
    intvalID: defaultMusic.id, //当前音乐id
    Lyric: {}, //歌词
    current: 0, //当前音乐的时间
    ref: null,
    searchlist: {}, //搜索结果歌单
    searchhistory: [], //搜索历史
    cookie: "", //cookie
    login: "", //登录状态
    token: JSON.parse(window.localStorage.getItem("token")), //token
    profile: JSON.parse(window.localStorage.getItem("profile")), //profile
    userxinxi: {}, //用户详情信息
  },

  mutations: {
    setplaylist(state, data) {
      state.playlist = data;
    },

    setcurrentPlay(state, data) {
      //切换歌曲
      state.currentPlay = data;
    },
    setintvalID(state, data) {
      state.intvalID = data; //音乐ID
    },
    setLyric(state, data) {
      state.Lyric = data;
    },
    setcurrent(state, data) {
      state.current = data;
    },
    switchPlayPause(state) {
      state.isPlaying = !state.isPlaying;
    },
    setref(state, data) {
      state.ref = data;
    },
    setsearchlist(state, data) {
      state.searchlist = data;
    },
    setsearchhistory(state, data) {
      state.searchhistory.unshift(data);
    },
    qingkongsearchhistory(state, data) {
      state.searchhistory = data;
    },
    getuserxinxi(state, data) {
      state.userxinxi = data;
    },
    getcookie(state, data) {
      // console.log(1);
      state.cookie = data;
    },
    islogin(state) {
      // console.log(1);
      state.login = 200;
    },
    // getprofile(state, data) {
    //   state.profile = data;
    // },
    // getuserid(state, data) {
    //   state.userid = data;
    // },
  },
  actions: {
    async requestLyric(content, options) {
      // console.log(content, options);
      let { data } = await getrsongeci(options);

      content.commit("setLyric", data.lrc.lyric);
    },
  },
  modules: {},
  // getters: {
  //   currentMusic(state) {
  //     return state.playList[state.currentIndex];
  //   },
  //   Lyriclist(state) {
  //     let Lyrics = state.Lyric.split(/\n/gis).map((item, index, arr) => {
  //       let min = parseInt(item.slice(1, 3));
  //       let sec = parseInt(item.slice(4, 6));
  //       let mill = parseInt(item.slice(7, 10));

  //       return {
  //         min,
  //         sec,
  //         mill,
  //         Lyric: item.slice(12, item.length),
  //         content: item,
  //         time: mill + sec * 1000 + min * 60 * 1000,
  //       };
  //     });

  //     return Lyrics;
  //   },
  // },
});

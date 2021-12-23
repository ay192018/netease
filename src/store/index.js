import Vue from "vue";
import Vuex from "vuex";

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
  name: "哪里都是你2.0",
  id: 1363642136,
  ar: [
    {
      name: "队长",
    },
  ],
  al: {
    picUrl:
      "http://p4.music.126.net/dcPHOdEv_27Xk56CDBox4w==/109951164055238135.jpg",
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
    currtime: "", //当前音乐时间
  },

  mutations: {
    currtime(state, time) {
      state.currtime = time;
    },
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
      const index = state.searchhistory.indexOf(data);
      if (index !== -1) {
        state.searchhistory.splice(index, 1);
      }
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
    // async requestLyric(content, options) {
    //   // console.log(content, options);
    //   let { data } = await getrsongeci(options);
    //   content.commit("setLyric", data.lrc.lyric);
    // },
  },
  modules: {},
});

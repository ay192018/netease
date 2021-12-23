import http from "@/utils/http.js";
export const getcode = (phone) => {
  return http({
    method: "GET",
    url: `/captcha/sent?phone=${phone}`,
  });
};
export const getlogin = (phone, password) => {
  return http({
    method: "GET",
    url: `/login/cellphone?phone=${phone}&password=${password}`,
  });
};
export const getuserinfo = (uid) => {
  return http({
    method: "GET",
    url: `/user/detail?uid=${uid}`,
  });
};
export const getusergedan = () => {
  return http({
    method: "GET",
    url: "/user/subcount",
  });
};
export const getshuaxin = () => {
  return http({
    method: "GET",
    url: "/login/refresh",
  });
};
export const getusergedas = (uid) => {
  //用户歌单
  return http({
    method: "GET",
    url: `/user/playlist?uid=${uid}`,
  });
};
export const getmeirituijiangequ = () => {
  //每日推荐
  return http({
    method: "GET",
    url: "/recommend/songs",
  });
};
export const grtlogout = () => {
  //用户歌单
  return http({
    method: "GET",
    url: "/logout",
  });
};

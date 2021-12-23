import http from "@/utils/http.js";
export const getbanner = (type = 2) => {
  return http({
    method: "GET",
    url: `/banner?type=${type}`,
  });
};
export const getrecommendsong = (limit = 3000) => {
  return http({
    method: "GET",
    url: "/personalized",
    params: {
      limit,
    },
  });
};
export const getrsonginfo = (id) => {
  return http({
    method: "GET",
    url: `/playlist/detail?id=${id}`,
  });
};
export const getallsonginfo = (id, limit = 3000) => {
  return http({
    method: "GET",
    url: `/playlist/track/all?id=${id}&limit=${limit}`,
  });
};
export const getrsongeci = (id) => {
  return http({
    method: "GET",
    url: `/lyric?id=${id}`,
  });
};
export const getallxindie = (cookie, limit) => {
  return http({
    method: "GET",
    url: "/album/new",
    params: {
      cookie: cookie,
      limit: limit,
    },
  });
};
export const getjingxuanxindie = (cookie, limit) => {
  return http({
    method: "GET",
    url: "/top/playlist",
    params: {
      cookie: cookie,
      limit: limit,
    },
  });
};
export const getfindlist = () => {
  return http({
    method: "GET",
    url: "/homepage/dragon/ball",
  });
};
export const getpersonal = () => {
  return http({
    method: "GET",
    url: "/personal_fm",
  });
};
export const getRanking = () => {
  return http({
    method: "GET",
    url: "/toplist/detail",
  });
};
export const getallsongs = (params) => {
  return http({
    method: "GET",
    url: "/song/detail",
    params
  });
};
export const gethome = (params) => {
  return http({
    method: "GET",
    url: "/homepage/block/page",
    params
  });
};

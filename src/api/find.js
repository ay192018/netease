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

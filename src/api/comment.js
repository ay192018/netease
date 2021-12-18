import http from "@/utils/http.js";
export const gethotcomment = (params) => {
  return http({
    method: "GET",
    url: `/comment/music`,
    params,
  });
};
export const getnewcomment = (params) => {
  return http({
    method: "GET",
    url: "/comment/new",
    params,
  });
};
export const gethuifucomment = (cookie, id, content) => {
  return http({
    method: "GET",
    // url: `/comment?t=${t}&type=${type}&id=${id}&content=${content}`,
    url: "/comment",
    params: {
      cookie: cookie,
      t: 1,
      type: 0,
      id: id,
      content: content,
    },
  });
};
export const getlike = (params) => {
  return http({
    method: "GET",
    // url: `/comment?t=${t}&type=${type}&id=${id}&content=${content}`,
    url: "/like",
    params,
  });
};

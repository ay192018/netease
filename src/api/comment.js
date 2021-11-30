import http from "@/utils/http.js";
export const gethotcomment = (id, limit = 100000) => {
  return http({
    method: "GET",
    url: `/comment/music?id=${id}&limit=${limit}`,
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

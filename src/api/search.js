import http from "@/utils/http.js";
export const getsearchinfo = (keywords) => {
  return http({
    method: "GET",
    url: `/cloudsearch?keywords=${keywords}`,
  });
};
export const getsearchsuggest = (keywords) => {
  return http({
    method: "GET",
    url: `/search/suggest?keywords=${keywords}`,
  });
};
export const gethotsearch = () => {
  return http({
    method: "GET",
    url: "/search/hot/detail",
  });
};
export const getdefaultsearch = () => {
  return http({
    method: "GET",
    url: "/search/default",
  });
};

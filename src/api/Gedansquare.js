import http from "@/utils/http.js";
export const getGedansquare = () => {
  return http({
    method: "GET",
    url: "/playlist/highquality/tags",
  });
};
export const getallGedan = (params) => {
  return http({
    method: "GET",
    url: `/top/playlist/highquality`,
    params,
  });
};

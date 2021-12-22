import http from "@/utils/http.js";
export const getfens = (params) => {
  return http({
    method: "GET",
    url: '/user/follows',
    params,
  });
};
export const getguanzhu = (params) => {
  return http({
    method: "GET",
    url: '/user/followeds',
    params,
  });
};
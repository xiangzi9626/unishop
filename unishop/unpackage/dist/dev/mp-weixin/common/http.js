"use strict";
const common_vendor = require("./vendor.js");
const common_config = require("./config.js");
const BASE_URL = common_config.APP_CONFIG.SERVER_URL;
const request = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: BASE_URL + options.url,
      method: options.method || "POST",
      data: options.data || {},
      success: (res) => {
        if (res.statusCode !== 200) {
          return common_vendor.index.showToast({
            title: "获取数据失败"
          });
        }
        resolve(res.data);
      },
      fail: (err) => {
        common_vendor.index.showToast({
          title: "请求接口失败"
        });
        reject(err);
      },
      complete: (res) => {
        if (res.data == "login") {
          try {
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.removeStorageSync("user");
            common_vendor.index.switchTab({
              url: "/pages/my/my"
            });
          } catch (e) {
          }
        }
      }
    });
  });
};
exports.request = request;

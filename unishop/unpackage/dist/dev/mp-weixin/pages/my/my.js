"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (MyUserInfo + MyLogin)();
}
const MyLogin = () => "../../conponents/my-login/my-login.js";
const MyUserInfo = () => "../../conponents/my-userinfo/my-userinfo.js";
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const data = common_vendor.reactive({
      token: ""
    });
    const getToken = () => {
      common_vendor.index.getStorage({
        key: "user",
        success: function(res) {
          data.user = JSON.parse(res.data);
        }
      });
      common_vendor.index.getStorage({
        key: "token",
        success: function(res) {
          data.token = res.data;
        }
      });
    };
    common_vendor.onMounted(() => {
      getToken();
    });
    const test = () => {
      common_vendor.index.navigateTo({
        url: "/pages/test/test"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: data.token != ""
      }, data.token != "" ? {} : {}, {
        b: common_vendor.o(test)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"], ["__file", "E:/uniapp/unishop/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);

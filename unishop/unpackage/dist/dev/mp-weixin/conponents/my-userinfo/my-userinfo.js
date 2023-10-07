"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "my-userinfo",
  setup(__props) {
    const data = common_vendor.reactive({
      user: {}
    });
    const getUserInfo = () => {
      common_vendor.index.getStorage({
        key: "user",
        success: function(res) {
          data.user = JSON.parse(res.data);
        }
      });
    };
    common_vendor.onMounted(() => {
      getUserInfo();
    });
    const deliveryAddress = () => {
      common_vendor.index.navigateTo({
        url: "/pages/delivery-address/delivery-address"
      });
    };
    const logout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定退出登录吗?",
        success: function() {
          try {
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.removeStorageSync("user");
            common_vendor.index.reLaunch({
              url: "/pages/my/my"
            });
          } catch (e) {
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(data.user.username),
        b: common_vendor.p({
          type: "location",
          size: "18"
        }),
        c: common_vendor.o(deliveryAddress),
        d: common_vendor.p({
          type: "contact",
          size: "18"
        }),
        e: common_vendor.p({
          type: "flag",
          size: "18"
        }),
        f: common_vendor.o(logout)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5a40ec3f"], ["__file", "E:/uniapp/unishop/conponents/my-userinfo/my-userinfo.vue"]]);
wx.createComponent(Component);

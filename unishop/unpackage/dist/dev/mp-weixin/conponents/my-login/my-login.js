"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
require("../../common/config.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "my-login",
  setup(__props) {
    const form = common_vendor.reactive({
      username: "",
      password: ""
    });
    const login = async () => {
      form.username = form.username.trim();
      if (form.username == "" || form.password == "") {
        return common_vendor.index.showToast({
          title: "请输入用户名和密码",
          icon: "none"
        });
      }
      const res = await common_http.request({ url: "/user/login", data: form });
      if (res.code == 200) {
        common_vendor.index.setStorage({
          key: "user",
          data: JSON.stringify(res.data.user)
        });
        common_vendor.index.setStorage({
          key: "token",
          data: res.data.token,
          success: function() {
            common_vendor.index.reLaunch({
              url: "/pages/my/my"
            });
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "用户名或密码错误",
          icon: "none"
        });
      }
    };
    const wxLogin = () => {
      common_vendor.wx$1.login({
        success: (res) => {
          console.log(res);
          common_vendor.index.setStorage({
            key: "token",
            data: "user",
            success: function() {
              common_vendor.index.reLaunch({
                url: "/pages/my/my"
              });
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "contact-filled",
          size: "100",
          color: "#AFAFAF"
        }),
        b: form.username,
        c: common_vendor.o(($event) => form.username = $event.detail.value),
        d: form.password,
        e: common_vendor.o(($event) => form.password = $event.detail.value),
        f: common_vendor.o(login),
        g: common_vendor.o(wxLogin)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp/unishop/conponents/my-login/my-login.vue"]]);
wx.createComponent(Component);

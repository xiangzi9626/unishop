"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  MyCart();
}
const MyCart = () => "../../conponents/my-cart/my-cart.js";
const _sfc_main = {
  __name: "cart",
  setup(__props) {
    const data = common_vendor.reactive({
      cart: []
    });
    common_vendor.onReady((param) => {
      getCart();
    });
    const getCart = () => {
      common_vendor.index.getStorage({
        key: "cart",
        success: (res) => {
          data.cart = JSON.parse(res.data);
          console.log(data.cart);
        }
      });
    };
    const clearCart = () => {
      common_vendor.index.clearStorage({
        key: "cart",
        success: () => {
          common_vendor.index.showToast({
            title: "清空成功",
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(clearCart),
        b: data.cart.length !== 0
      }, data.cart.length !== 0 ? {
        c: common_vendor.p({
          cart: data.cart
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp/unishop/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);

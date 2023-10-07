"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "category",
  setup(__props) {
    const data = common_vendor.reactive({
      cateList: [{ cid: 1, name: "手机" }, { cid: 2, name: "手机" }, { cid: 3, name: "手机" }, { cid: 4, name: "手机" }],
      active: 0
    });
    const activeChanged = (i) => {
      data.active = i;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.cateList, (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.n(i === data.active ? "active" : ""),
            c: common_vendor.o(($event) => activeChanged(i), i),
            d: i
          };
        }),
        b: common_vendor.f(data.cateLevel2, (item2, i2, i0) => {
          return {
            a: common_vendor.t(item2.name),
            b: i2
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8145b772"], ["__file", "E:/uniapp/unishop/pages/category/category.vue"]]);
wx.createPage(MiniProgramPage);

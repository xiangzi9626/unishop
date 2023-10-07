"use strict";
const common_vendor = require("../common/vendor.js");
const common_config = require("../common/config.js");
const wxs_number = require("../wxs/number.js");
const _sfc_main = {
  __name: "GoodsList",
  props: {
    goodsList: []
  },
  setup(__props) {
    const props = __props;
    const toDetailPage = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?id=" + item.id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.goodsList, (item, index, i0) => {
          return {
            a: common_vendor.unref(common_config.APP_CONFIG).SERVER_URL + "/upload/img/goods/" + item.img.split(",")[0],
            b: common_vendor.t(item.title),
            c: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(item.price)[0]),
            d: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(item.price)[1]),
            e: common_vendor.o(($event) => toDetailPage(item), index),
            f: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b86960f2"], ["__file", "E:/uniapp/unishop/conponents/GoodsList.vue"]]);
wx.createComponent(Component);

"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
require("../../common/config.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_easyinput + GoodsList)();
}
const GoodsList = () => "../../conponents/GoodsList.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const data = common_vendor.reactive({
      search: "",
      goodsList: []
    });
    const page = common_vendor.reactive({
      currentPage: 1,
      pageSize: 20
    });
    const getData = async () => {
      const res = await common_http.request({ url: "/goods/list", data: page });
      data.goodsList = res.data;
    };
    common_vendor.onLoad(() => {
      getData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => data.search = $event),
        b: common_vendor.p({
          inputBorder: false,
          prefixIcon: "search",
          confirmType: "搜索",
          placeholder: "请输入关键字搜索",
          modelValue: data.search
        }),
        c: common_vendor.o((...args) => _ctx.toClassifyPage && _ctx.toClassifyPage(...args)),
        d: common_vendor.o((...args) => _ctx.toClassifyPage && _ctx.toClassifyPage(...args)),
        e: common_vendor.o((...args) => _ctx.toClassifyPage && _ctx.toClassifyPage(...args)),
        f: common_vendor.o((...args) => _ctx.toCouponCenter && _ctx.toCouponCenter(...args)),
        g: common_vendor.p({
          goodsList: data.goodsList
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/uniapp/unishop/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

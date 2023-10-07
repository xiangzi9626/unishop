"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  methods: {
    open() {
      this.$refs.popup.open("bottom");
    }
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.open && $options.open(...args)),
    b: common_vendor.sr("popup", "464757f9-0"),
    c: common_vendor.p({
      type: "bottom"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp/unishop/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);

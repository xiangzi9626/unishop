"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
require("../../common/config.js");
const _sfc_main = {
  __name: "delivery-address",
  setup(__props) {
    const data = common_vendor.reactive({
      addressList: [],
      user: {}
    });
    const getUser = () => {
      common_vendor.index.getStorage({
        key: "user",
        success: (res) => {
          data.user = JSON.parse(res.data);
        }
      });
    };
    const getAddressList = async () => {
      const list = await common_http.request({ url: "/user/address/list?uid=" + data.user.id });
      data.addressList = list;
    };
    common_vendor.onLoad(() => {
      getUser();
    });
    common_vendor.onReady(() => {
      getAddressList();
    });
    const onAddAddr = () => {
      common_vendor.index.navigateTo({
        url: "/pages/addAddress/addAddress"
      });
    };
    const onDefaultAddr = async (index) => {
      if (Number(data.addressList[index].selected) != 1) {
        const res = await common_http.request({ url: "/user/address/default?uid=" + data.user.id + "&id=" + data.addressList[index].id });
        if (res.code == 200) {
          for (let i = 0; i < data.addressList.length; i++) {
            data.addressList[i].selected = 0;
          }
          data.addressList[index].selected = 1;
        } else {
          return common_vendor.index.showToast({
            title: "设置失败请重试",
            icon: "none"
          });
        }
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: data.addressList.length == 0
      }, data.addressList.length == 0 ? {} : {}, {
        b: common_vendor.f(data.addressList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.phone),
            c: item,
            d: common_vendor.o(($event) => _ctx.edit(item.id), index),
            e: common_vendor.t(item.province),
            f: common_vendor.t(item.city),
            g: common_vendor.t(item.area),
            h: common_vendor.t(item.detail),
            i: common_vendor.o(($event) => _ctx.selAddrToOrder(item), index),
            j: item.id,
            k: item.selected == 1,
            l: common_vendor.o(($event) => onDefaultAddr(index), index),
            m: item.id,
            n: index
          };
        }),
        c: common_vendor.o(onAddAddr)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0bd1d793"], ["__file", "E:/uniapp/unishop/pages/delivery-address/delivery-address.vue"]]);
wx.createPage(MiniProgramPage);

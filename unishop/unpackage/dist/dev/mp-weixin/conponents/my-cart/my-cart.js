"use strict";
const common_vendor = require("../../common/vendor.js");
const common_config = require("../../common/config.js");
const wxs_number = require("../../wxs/number.js");
if (!Array) {
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _component_uni_swipe_action_item = common_vendor.resolveComponent("uni-swipe-action-item");
  (_easycom_uni_number_box2 + _component_uni_swipe_action_item)();
}
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
if (!Math) {
  _easycom_uni_number_box();
}
const _sfc_main = {
  __name: "my-cart",
  props: { cart: [] },
  setup(__props) {
    const props = __props;
    const data = common_vendor.reactive({
      total: 0,
      select: false
    });
    const radioClick = (index) => {
      props.cart[index].state = !props.cart[index].state;
      totalPrice();
      let n = 0;
      for (let i = 0; i < props.cart.length; i++) {
        if (props.cart[i].state) {
          n++;
        }
      }
      if (n == props.cart.length) {
        data.select = true;
      } else {
        data.select = false;
      }
    };
    const numChange = (index, count) => {
      props.cart[index].count = count;
      totalPrice();
    };
    const deleteGoods = () => {
      if (data.total == 0) {
        common_vendor.index.showToast({
          title: "请勾选商品",
          icon: "error"
        });
        return;
      }
    };
    const settlement = () => {
      if (data.total == 0) {
        common_vendor.index.showToast({
          title: "请勾选商品",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/submit-order/submit-order"
      });
    };
    const selectAll = () => {
      data.select = !data.select;
      for (let i = 0; i < props.cart.length; i++) {
        props.cart[i].state = data.select;
      }
      totalPrice();
    };
    const totalPrice = () => {
      let total_price = 0;
      for (let i = 0; i < props.cart.length; i++) {
        if (props.cart[i].state) {
          total_price += props.cart[i].price * props.cart[i].count;
        }
      }
      data.total = total_price;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.cart, (goods, i, i0) => {
          return {
            a: goods.state,
            b: common_vendor.o(($event) => radioClick(i), i),
            c: common_vendor.unref(common_config.APP_CONFIG).SERVER_URL + "/upload/img/goods/" + goods.img,
            d: common_vendor.t(goods.title),
            e: common_vendor.f(goods.spec, (v, k, i1) => {
              return {
                a: common_vendor.t(k),
                b: common_vendor.t(v)
              };
            }),
            f: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(goods.price)[0]),
            g: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(goods.price)[1]),
            h: common_vendor.o(($event) => numChange(i, $event), i),
            i: "d6538169-1-" + i0 + "," + ("d6538169-0-" + i0),
            j: common_vendor.p({
              min: 1,
              value: goods.count
            }),
            k: "d6538169-0-" + i0,
            l: i
          };
        }),
        b: data.select,
        c: common_vendor.o(selectAll),
        d: common_vendor.o(deleteGoods),
        e: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(data.total)[0]),
        f: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(data.total)[1]),
        g: common_vendor.o(settlement)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d6538169"], ["__file", "E:/uniapp/unishop/conponents/my-cart/my-cart.vue"]]);
wx.createComponent(Component);

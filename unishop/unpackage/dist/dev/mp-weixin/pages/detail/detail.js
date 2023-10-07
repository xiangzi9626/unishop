"use strict";
const common_vendor = require("../../common/vendor.js");
const common_config = require("../../common/config.js");
const common_http = require("../../common/http.js");
const wxs_number = require("../../wxs/number.js");
if (!Array) {
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_goods_nav2 + _easycom_uni_icons2 + _easycom_uni_number_box2 + _easycom_uni_popup2)();
}
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_goods_nav + _easycom_uni_icons + _easycom_uni_number_box + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const swiperHeight = common_vendor.ref("750rpx");
    const popup = common_vendor.ref(null);
    const data = common_vendor.reactive({
      token: "",
      showAddCartButton: false,
      goodsImg: "",
      goods: {},
      cart: [],
      maxPrice: 0,
      minPrice: 0,
      select: {},
      selectAll: false,
      address: {},
      user: {}
    });
    const options = common_vendor.reactive([
      {
        icon: "home",
        text: "首页"
      },
      {
        icon: "cart",
        text: "购物车",
        info: data.cart.length,
        infoBackgroundColor: "#C00000",
        infoColor: "white"
      }
    ]);
    const order = common_vendor.reactive({
      title: data.goods.title,
      img: data.goods.img,
      count: 1,
      gid: data.goods.id,
      spec: {},
      address: data.address
    });
    const jumpAddress = () => {
      popup.value.close("bottom");
      common_vendor.index.navigateTo({
        url: "/pages/delivery-address/delivery-address"
      });
    };
    const getAddress = async () => {
      if (data.token == "" || data.token == void 0)
        return false;
      const res = await common_http.request({ url: "/user/address/get?uid=" + data.user.id });
      data.address = res;
    };
    const addCart = () => {
      if (!data.selectAll && Object.keys(data.select).length > 0) {
        return common_vendor.index.showToast({
          title: "请选择规格",
          icon: "none"
        });
      }
      let id = data.goods.id;
      let title = data.goods.title;
      let img = data.goodsImg;
      let price = order.spec.price;
      let spec = order.spec;
      delete spec.price;
      delete spec.stock;
      let count = order.count;
      let obj = { "id": id, "title": title, "img": img, "price": price, "spec": spec, "count": count, "state": false };
      data.cart.push(obj);
      common_vendor.index.setStorage({
        key: "cart",
        data: JSON.stringify(data.cart),
        success: function() {
          options[1].info = data.cart.length;
          common_vendor.index.showToast({
            icon: "none",
            title: "加入购物车成功"
          });
          popup.value.close("bottom");
        },
        fail: function() {
          common_vendor.index.showToast({
            icon: "none",
            title: "加入购物车失败请重试"
          });
        }
      });
    };
    const submitOrder = async () => {
      if (!data.selectAll && Object.keys(data.select).length > 0) {
        return common_vendor.index.showToast({
          title: "请选择规格",
          icon: "none"
        });
      }
      const res = await common_http.request({ url: "/user/order/add", data: order });
      console.log(res);
    };
    const select = (key, index) => {
      order.count = 1;
      for (let i = 0; i < data.select[key].length; i++) {
        if (i == index) {
          continue;
        } else {
          data.select[key][i].active = false;
        }
      }
      data.select[key][index].active = !data.select[key][index].active;
      if (data.select[key][index].active) {
        order.spec[key] = data.select[key][index].val;
      } else {
        if (key in order.spec) {
          delete order.spec[key];
        }
      }
      let sel = {};
      for (let key2 in data.select) {
        if (key2 in order.spec) {
          sel[key2] = order.spec[key2];
        }
      }
      order.spec = sel;
      if (Object.keys(data.select).length == Object.keys(order.spec).length) {
        data.selectAll = true;
        for (let i = 0; i < data.goods.sale.length; i++) {
          let n = 0;
          for (let key2 in data.goods.sale[i]) {
            if (data.goods.sale[i][key2] == order.spec[key2]) {
              n++;
            }
          }
          if (n == Object.keys(order.spec).length) {
            order.spec["price"] = Number(data.goods.sale[i]["price"]);
            order.spec["stock"] = Number(data.goods.sale[i]["stock"]);
            break;
          } else {
            if ("price" in order.spec)
              delete order.spec["price"];
            if ("stock" in order.spec)
              delete order.spec["stock"];
          }
        }
      } else {
        data.selectAll = false;
      }
    };
    const numChange = () => {
      let stock = Number(data.goods.stock);
      if (Object.keys(data.select).length > 0) {
        stock = Number(order.spec.stock);
      }
      if (order.count >= stock) {
        order.count = stock;
      }
    };
    const getData = async (id) => {
      const res = await common_http.request({
        url: "/goods/get?id=" + id
      });
      const cartStr = common_vendor.index.getStorageSync("cart");
      if (cartStr != "" && cartStr != void 0) {
        data.cart = JSON.parse(cartStr);
        options[1].info = data.cart.length;
      }
      res.sale = JSON.parse(res.sale);
      res.content = res.content.replace(/<img/g, `<img class='img'`);
      res.content += `<div style='width:100%;height:80px;'></div>`;
      res.img = res.img.split(",");
      data.goodsImg = res.img[0];
      data.goods = res;
      let priceArr = [];
      for (let i = 0; i < res.sale.length; i++) {
        let price = Number(res.sale[i]["price"]);
        priceArr.push(price);
      }
      priceArr.sort((a, b) => a - b);
      data.minPrice = priceArr[0];
      data.maxPrice = priceArr[priceArr.length - 1];
      for (let i = 0; i < res.sale.length; i++) {
        for (let key in res.sale[i]) {
          let b = false;
          if (Number(res.sale[i]["active"]) == 1) {
            b = true;
          }
          if (i == 0 && key != "price" && key != "stock" && key != "active") {
            let val = [];
            val.push({
              "val": res.sale[i][key],
              "active": b
            });
            data.select[key] = val;
          } else if (i > 0 && key != "price" && key != "stock" && key != "active") {
            let isExist = false;
            for (let k in data.select) {
              for (let index in data.select[k]) {
                if (data.select[k][index].val == res.sale[i][key]) {
                  isExist = true;
                }
              }
            }
            if (!isExist) {
              data.select[key].push({
                "val": res.sale[i][key],
                "active": b
              });
            }
          }
        }
      }
    };
    const buttonGroup = common_vendor.reactive([
      {
        text: "加入购物车",
        backgroundColor: "black",
        color: "#fff"
      },
      {
        text: "立即购买",
        backgroundColor: "#C00000",
        color: "#fff"
      }
    ]);
    const setSwiperHeight = () => {
      const query = common_vendor.index.createSelectorQuery();
      query.select(".img-box").boundingClientRect((rect) => {
        swiperHeight.value = rect.height + "px";
      });
      query.exec();
    };
    const getStorage = () => {
      data.token = common_vendor.index.getStorageSync("token");
      let user = common_vendor.index.getStorageSync("user");
      if (user != void 0 && user != "") {
        data.user = JSON.parse(user);
      }
    };
    common_vendor.onLoad((param) => {
      getStorage();
      getData(param.id);
      setSwiperHeight();
      getAddress();
    });
    const buttonClick = (e) => {
      switch (e.index) {
        case 0:
          data.showAddCartButton = true;
          popup.value.open("bottom");
          break;
        case 1:
          let token = common_vendor.index.getStorageSync("token");
          if (token == void 0 || token == "") {
            common_vendor.index.switchTab({
              url: "/pages/my/my"
            });
          } else if (data.address.name == void 0) {
            common_vendor.index.navigateTo({
              url: "/pages/addAddress/addAddress"
            });
          } else {
            getAddress();
            data.showAddCartButton = false;
            popup.value.open("bottom");
          }
          break;
      }
    };
    const onClick = (e) => {
      let index = e.index;
      switch (index) {
        case 0:
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
          break;
        case 1:
          common_vendor.index.switchTab({
            url: "/pages/cart/cart"
          });
          break;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(common_config.APP_CONFIG).SERVER_URL + "/upload/img/goods/" + data.goodsImg,
        b: common_vendor.s("height:" + swiperHeight.value),
        c: common_vendor.s("height:" + swiperHeight.value),
        d: common_vendor.t(data.goods.title),
        e: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(data.goods.price)[0]),
        f: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(data.goods.price)[1]),
        g: data.goods.content,
        h: common_vendor.o(onClick),
        i: common_vendor.o(buttonClick),
        j: common_vendor.p({
          ["button-group"]: buttonGroup,
          options
        }),
        k: Object.keys(data.address).length > 0
      }, Object.keys(data.address).length > 0 ? {
        l: common_vendor.p({
          type: "location",
          size: "25"
        }),
        m: common_vendor.t(data.address.name),
        n: common_vendor.t(data.address.phone),
        o: common_vendor.t(data.address.province),
        p: common_vendor.t(data.address.city),
        q: common_vendor.t(data.address.area),
        r: common_vendor.t(data.address.detail),
        s: common_vendor.p({
          type: "forward",
          size: "25"
        }),
        t: common_vendor.o(jumpAddress)
      } : {}, {
        v: common_vendor.unref(common_config.APP_CONFIG).SERVER_URL + "/upload/img/goods/" + data.goodsImg,
        w: data.selectAll
      }, data.selectAll ? common_vendor.e({
        x: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(order.spec.price)[0]),
        y: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(order.spec.price)[1]),
        z: data.selectAll
      }, data.selectAll ? {
        A: common_vendor.t(order.spec.stock)
      } : {}) : data.maxPrice == data.minPrice ? common_vendor.e({
        C: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(data.goods.price)[0]),
        D: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(data.goods.price)[1]),
        E: Object.keys(data.select).length == 0
      }, Object.keys(data.select).length == 0 ? {
        F: common_vendor.t(data.goods.stock)
      } : {}) : {
        G: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(data.minPrice)[0]),
        H: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(data.minPrice)[1]),
        I: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(data.maxPrice)[0]),
        J: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(data.maxPrice)[1])
      }, {
        B: data.maxPrice == data.minPrice,
        K: Object.keys(order.spec).length > 0
      }, Object.keys(order.spec).length > 0 ? {} : {}, {
        L: common_vendor.f(order.spec, (value, key, i0) => {
          return common_vendor.e({
            a: key != "price" && key != "stock"
          }, key != "price" && key != "stock" ? {
            b: common_vendor.t(key),
            c: common_vendor.t(value)
          } : {});
        }),
        M: data.selectAll
      }, data.selectAll ? {
        N: common_vendor.o(numChange),
        O: common_vendor.o(($event) => order.count = $event),
        P: common_vendor.p({
          min: 1,
          max: order.spec.stock,
          step: 1,
          modelValue: order.count
        })
      } : Object.keys(data.select).length == 0 ? {
        R: common_vendor.o(numChange),
        S: common_vendor.o(($event) => order.count = $event),
        T: common_vendor.p({
          min: 1,
          max: data.goods.stock,
          step: 1,
          modelValue: order.count
        })
      } : {}, {
        Q: Object.keys(data.select).length == 0,
        U: common_vendor.f(data.select, (value, key, i0) => {
          return {
            a: common_vendor.t(key),
            b: common_vendor.f(value, (item, index, i1) => {
              return {
                a: common_vendor.t(item.val),
                b: common_vendor.o(($event) => select(key, index)),
                c: item.active == true ? 1 : ""
              };
            }),
            c: key
          };
        }),
        V: data.showAddCartButton
      }, data.showAddCartButton ? {
        W: common_vendor.o(addCart)
      } : {
        X: common_vendor.o(submitOrder)
      }, {
        Y: common_vendor.sr(popup, "e2f9524e-1", {
          "k": "popup"
        }),
        Z: common_vendor.p({
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp/unishop/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);

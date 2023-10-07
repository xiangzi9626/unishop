"use strict";
const common_vendor = require("../../common/vendor.js");
const wxs_number = require("../../wxs/number.js");
const common_cityData_data = require("../../common/city-data/data.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_uni_swipe_action_item = common_vendor.resolveComponent("uni-swipe-action-item");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_picker2 + _easycom_uni_forms2 + _easycom_uni_icons2 + _component_uni_swipe_action_item)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_picker + _easycom_uni_forms + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "submit-order",
  setup(__props) {
    const address = common_vendor.reactive({ name: "华子", mobile: "12112451245", city: "江苏省", detailAddress: "东城区10号" });
    const select = common_vendor.reactive({
      localData: []
    });
    const totalPrice = common_vendor.ref(0);
    const goodsList = common_vendor.reactive([{
      name: "商品一",
      price: 100,
      count: 2,
      img: "/static/banner/1.jpg"
    }, {
      name: "商品2",
      price: 120,
      count: 3,
      img: "/static/banner/1.jpg"
    }]);
    const formData = common_vendor.reactive({
      name: "",
      phone: "",
      detailAddress: ""
    });
    const countPrice = () => {
      let total = 0;
      for (let index in goodsList) {
        total += goodsList[index].price * goodsList[index].count;
      }
      totalPrice.value = total;
    };
    common_vendor.onLoad(() => {
      countPrice();
      select.localData = getCityTree();
    });
    const editAddress = () => {
      address.name = "";
    };
    const getCityTree = () => {
      let res = [];
      for (let i in common_cityData_data.CITY_DATA.DATA) {
        if (common_cityData_data.CITY_DATA.DATA[i].parent_code == null) {
          res.push({
            id: common_cityData_data.CITY_DATA.DATA[i].code,
            pid: 0,
            text: common_cityData_data.CITY_DATA.DATA[i].name,
            children: [],
            value: common_cityData_data.CITY_DATA.DATA[i].code
          });
        }
      }
      for (let i in res) {
        for (let j in common_cityData_data.CITY_DATA.DATA) {
          if (res[i].id == common_cityData_data.CITY_DATA.DATA[j].parent_code) {
            res[i].children.push({
              id: common_cityData_data.CITY_DATA.DATA[j].code,
              pid: common_cityData_data.CITY_DATA.DATA[j].parent_code,
              text: common_cityData_data.CITY_DATA.DATA[j].name,
              children: [],
              value: common_cityData_data.CITY_DATA.DATA[j].code
            });
          }
        }
      }
      for (let i in res) {
        for (let j in res[i].children) {
          for (let k in common_cityData_data.CITY_DATA.DATA) {
            if (res[i].children[j].id == common_cityData_data.CITY_DATA.DATA[k].parent_code) {
              res[i].children[j].children.push({
                id: common_cityData_data.CITY_DATA.DATA[k].code,
                pid: common_cityData_data.CITY_DATA.DATA[k].parent_code,
                text: common_cityData_data.CITY_DATA.DATA[k].name,
                children: [],
                value: common_cityData_data.CITY_DATA.DATA[k].code
              });
            }
          }
        }
      }
      return res;
    };
    const onchange = (e) => {
    };
    const onnodeclick = (node) => {
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !address.name
      }, !address.name ? {
        b: common_vendor.o(($event) => formData.name = $event),
        c: common_vendor.p({
          type: "text",
          placeholder: "请输入收货人",
          modelValue: formData.name
        }),
        d: common_vendor.p({
          required: true,
          label: "收货人",
          name: "name"
        }),
        e: common_vendor.o(($event) => formData.phone = $event),
        f: common_vendor.p({
          type: "text",
          placeholder: "请输入手机号",
          modelValue: formData.phone
        }),
        g: common_vendor.p({
          required: true,
          label: "手机号",
          name: "phone"
        }),
        h: common_vendor.o(onchange),
        i: common_vendor.o(onnodeclick),
        j: common_vendor.p({
          localdata: select.localData,
          ["popup-title"]: "请选择省市区"
        }),
        k: common_vendor.p({
          required: true,
          label: "所在地"
        }),
        l: common_vendor.o(($event) => formData.detailAddress = $event),
        m: common_vendor.p({
          type: "text",
          placeholder: "请输入详细地址",
          modelValue: formData.detailAddress
        }),
        n: common_vendor.p({
          label: "详细地址"
        }),
        o: common_vendor.p({
          modelValue: formData
        }),
        p: common_vendor.o((...args) => _ctx.submitForm && _ctx.submitForm(...args))
      } : {
        q: common_vendor.t(address.name),
        r: common_vendor.t(address.mobile),
        s: common_vendor.t(address.city),
        t: common_vendor.t(address.detailAddress),
        v: common_vendor.p({
          type: "compose",
          size: "20"
        }),
        w: common_vendor.o(editAddress)
      }, {
        x: common_vendor.f(goodsList, (goods, i, i0) => {
          return {
            a: goods.img,
            b: common_vendor.t(goods.name),
            c: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(goods.price)[0]),
            d: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(goods.price)[1]),
            e: common_vendor.t(goods.count),
            f: "813ff4aa-10-" + i0,
            g: i
          };
        }),
        y: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(totalPrice.value)[0]),
        z: common_vendor.t(common_vendor.unref(wxs_number.parsePrice)(totalPrice.value)[1])
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-813ff4aa"], ["__file", "E:/uniapp/unishop/pages/submit-order/submit-order.vue"]]);
wx.createPage(MiniProgramPage);

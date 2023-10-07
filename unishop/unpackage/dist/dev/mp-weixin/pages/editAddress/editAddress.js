"use strict";
const common_vendor = require("../../common/vendor.js");
const common_cityData_data = require("../../common/city-data/data.js");
const common_http = require("../../common/http.js");
require("../../common/config.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_picker + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "editAddress",
  setup(__props) {
    const select = common_vendor.reactive({
      localData: []
    });
    const formData = common_vendor.reactive({
      uid: 0,
      name: "",
      province: "",
      city: "",
      area: "",
      phone: "",
      detail: "",
      selected: 0
    });
    common_vendor.onLoad((param) => {
      select.localData = getCityTree();
      getAddress(param.id);
    });
    common_vendor.onReady(() => {
      getUser();
    });
    const getUser = () => {
      common_vendor.index.getStorage({
        key: "user",
        success: (res) => {
          formData.uid = JSON.parse(res.data).id;
        }
      });
    };
    const getAddress = async (id) => {
      const res = await common_http.request({ url: "/user/address/get?id=" + id });
      formData = res;
    };
    const submitAddress = async () => {
      for (let key in formData) {
        formData[key] = formData[key] + "".trim();
      }
      if (formData.name.trim() == "") {
        return common_vendor.index.showToast({
          title: "收货人不能为空",
          icon: "none"
        });
      }
      if (formData.phone.trim() == "") {
        return common_vendor.index.showToast({
          title: "请输入手机号",
          icon: "none"
        });
      }
      if (formData.city.trim() == "") {
        return common_vendor.index.showToast({
          title: "请选择地区",
          icon: "none"
        });
      }
      if (formData.detail.trim() == "") {
        return common_vendor.index.showToast({
          title: "请输入详细地址",
          icon: "none"
        });
      }
      const res = await common_http.request({ url: "/user/address/add", data: formData });
      if (res.code == 200) {
        common_vendor.index.navigateTo({
          url: "/pages/delivery-address/delivery-address"
        });
      } else {
        common_vendor.index.showToast({
          title: "提交失败请重试",
          icon: "none"
        });
      }
    };
    const onchange = (e) => {
      let areas = e.detail.value;
      formData.province = areas[0].text;
      formData.city = areas[1].text;
      formData.area = areas[2].text;
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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => formData.name = $event),
        b: common_vendor.p({
          type: "text",
          placeholder: "请输入收货人",
          modelValue: formData.name
        }),
        c: common_vendor.p({
          required: true,
          label: "收货人",
          name: "name"
        }),
        d: common_vendor.o(($event) => formData.phone = $event),
        e: common_vendor.p({
          type: "text",
          placeholder: "请输入手机号",
          modelValue: formData.phone
        }),
        f: common_vendor.p({
          required: true,
          label: "手机号",
          name: "phone"
        }),
        g: common_vendor.o(onchange),
        h: common_vendor.o(_ctx.onnodeclick),
        i: common_vendor.p({
          localdata: select.localData,
          ["popup-title"]: "请选择省市区"
        }),
        j: common_vendor.p({
          required: true,
          label: "所在地"
        }),
        k: common_vendor.o(($event) => formData.detail = $event),
        l: common_vendor.p({
          type: "text",
          placeholder: "请输入详细地址",
          modelValue: formData.detail
        }),
        m: common_vendor.p({
          required: true,
          label: "详细地址"
        }),
        n: common_vendor.p({
          modelValue: formData
        }),
        o: common_vendor.o(submitAddress)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2ca52f78"], ["__file", "E:/uniapp/unishop/pages/editAddress/editAddress.vue"]]);
wx.createPage(MiniProgramPage);

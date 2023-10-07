<template>
  <el-form
      :model="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      status-icon>
    <el-form-item label="">
      <h3>基本信息</h3>
    </el-form-item>
    <el-form-item required label="分类" prop="cid">
      <el-tree-select v-model="ruleForm.cid" placeholder="请选择" :data="data.goodsCategory"/>
    </el-form-item>
    <el-form-item required label="商品标题" prop="title">
      <el-input v-model.trim="ruleForm.title" placeholder="请输入标题"/>
    </el-form-item>
    <el-form-item required label="商品主图" prop="img">
      <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          :action="CONFIG.SERVER_URL+'/admin/file/img/upload_goods_img'"
          name="file"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          list-type="picture"
          :limit="3"
      >
        <el-button type="primary">选择图片</el-button>
        <template #tip>
          <div class="el-upload__tip">
            请上传jpg png 格式图片 最多上传3张
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item label="是否上架" prop="status" style="display: flex;align-items: center">
      <div class="mb-2 flex items-center text-sm">
        <el-radio-group v-model="ruleForm.status" class="ml-4">
          <el-radio label="1" size="large">上架</el-radio>
          <el-radio label="0" size="large">下架</el-radio>
        </el-radio-group>
      </div>
    </el-form-item>
    <el-form-item label="">
      <h3>销售信息</h3>
    </el-form-item>
    <template v-for="(item,index) in data.specifications" :key="index">
      <el-form-item :label="item.name">
        <template v-for="(val,j) in data.emptyValueSpec[item.name]" :key="j">
          <el-select @change="specChange" v-model.trim="data.emptyValueSpec[item.name][j]" filterable allow-create
                     style="width:100px;" placeholder="输入或选择">
            <el-option
                v-for="(val1,k) in item.value.split(',')"
                :key="k"
                :label="val1"
                :value="val1"
            />
          </el-select>
          <el-button :icon="Delete" @click="data.emptyValueSpec[item.name].splice(j,1);specChange()"
                     v-if="data.emptyValueSpec[item.name].length>1"/>
        </template>
        <el-button style="background: white;border: 0 solid white;color: blue;" :icon="Plus"
                   @click="data.emptyValueSpec[item.name].push('')">新增规格项
        </el-button>
      </el-form-item>
    </template>
    <el-form-item required label="价格" prop="price">
      <el-input @blur="specChange" v-model.trim="ruleForm.price" style="width:100px"/>
      <span>&nbsp;元</span>
    </el-form-item>
    <el-form-item required label="总数量" prop="stock">
      <el-input :disabled="data.stockDisabled" v-model.trim="ruleForm.stock" style="width:100px"/>
      <span>&nbsp;件</span>
    </el-form-item>
    <el-form-item label="销售规格" v-if="ruleForm.sale.length>0">
    </el-form-item>
    <el-form-item v-if="ruleForm.sale.length>0">
      <el-table
          :stripe="true"
          table-layout="auto"
          :data="ruleForm.sale"
          :border="true">
        <template v-for="(value,key) in data.emptyValueSpec">
          <el-table-column :prop="key" :label="key" v-if="value.filter((v:String)=>v.length>0).length>0"/>
        </template>
        <el-table-column prop="price" label="价格(元)">
          <template #default="scope">
            <el-input v-model.trim="ruleForm.sale[scope.$index]['price']" style="width:100px"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="数量(件)">
          <template #default="scope">
            <el-input @blur="totalStock" v-model.trim="ruleForm.sale[scope.$index]['stock']"
                      style="width:100px"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-popconfirm title="确定删除吗?" @confirm="deleteSpec(scope.$index)"
                           confirm-button-text="确定" cancel-button-text="取消">
              <template #reference>
                <el-icon class="btn">
                  <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="删除"
                      placement="top-start"
                  >
                    <Delete style="cursor:pointer"/>
                  </el-tooltip>
                </el-icon>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label="">
      <h3>商品详情</h3>
    </el-form-item>
    <el-form-item required label="详情" prop="content">
      <!--富文本编辑器-->
      <WangEditor ref="wangEditor"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)" style="padding: 5px 50px">提交</el-button>
    </el-form-item>
  </el-form>
  <div style="width:100%;height:200px"></div>
</template>

<script lang="ts" setup>
import {ref, reactive, onMounted} from "vue"
import {CONFIG} from "../../../config/config";
import type {UploadProps, UploadUserFile} from 'element-plus'
import {ElError, ElSuccess, ElWarning} from "../../../utils/msg";
import WangEditor from "../../../components/WangEditor.vue"
import {useRoute} from "vue-router";
import request from "../../../utils/request"
import router from "../../../router"
import {Plus, Delete} from "@element-plus/icons-vue"

const fileList = ref<UploadUserFile[]>([
  /*{
    name: '',
    url: '',
  }*/
])
const wangEditor = ref(null)
const ruleForm: any = reactive({
  id: 0,
  title: '',
  img: [],
  price: 99.99,
  stock: 1,
  sale: [],
  cid: "",
  // 内容 HTML
  content: "",
  status: "1"
})
const data: any = reactive({
  stockDisabled: false,
  goodsCategory: [],
  specifications: [],
  emptyValueSpec: {}
})
const deleteSpec = (index: number) => {
  ruleForm.sale.splice(index, 1);
  if (ruleForm.sale.length == 0) {
    data.stockDisabled = false
    for (let key in data.emptyValueSpec) {
      data.emptyValueSpec[key] = [""]
    }
  }
}
const totalStock = () => {
  let stock = 0
  for (let i = 0; i < ruleForm.sale.length; i++) {
    stock += Number(ruleForm.sale[i].stock)
  }
  ruleForm.stock = stock
}
const specChange = () => {
  ruleForm.sale = []
  let arr: any = []
  for (let key in data.emptyValueSpec) {
    let valArr: any = []
    let value = data.emptyValueSpec[key]
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== "" && !valArr.includes(value[i])) {
        valArr.push(value[i])
      }
    }
    if (valArr.length > 0) {
      arr.push(valArr)
    }
  }
  if (arr.length > 0) {
    let saleArr = []
    data.stockDisabled = true
    let spec = getAllCombinations(arr)
    for (let i = 0; i < spec.length; i++) {
      let obj: any = {}
      let n = 0
      for (let key in data.emptyValueSpec) {
        let len = data.emptyValueSpec[key].filter((str: String) => str != "").length
        if (len > 0) {
          obj[key] = spec[i][n]
          n++
        }
      }
      obj["price"] = ruleForm.price
      obj["stock"] = 1
      saleArr.push(obj)
    }
    ruleForm.sale = saleArr
    totalStock()
  }
  if (ruleForm.sale.length == 0) data.stockDisabled = false
}
//组合规格
const getAllCombinations = (arrays: any) => {
  const result: any = [];
  // 递归函数
  const helper = (current: any, arrays: any) => {
    if (arrays.length === 1) {
      for (let i = 0; i < arrays[0].length; i++) {
        result.push([...current, arrays[0][i]]);
      }
    } else {
      for (let i = 0; i < arrays[0].length; i++) {
        helper([...current, arrays[0][i]], arrays.slice(1));
      }
    }
  };
  // 调用递归函数
  helper([], arrays);
  return result;
}
const getSpecifications = (cid: string | number, saleArr: Array<any>) => {
  if (saleArr.length>0) data.stockDisabled=true
  request.post("/admin/specifications/get?cid=" + cid)
      .then((res: any) => {
        data.specifications = res
        res.forEach((item: any) => {
          data.emptyValueSpec[item.name] = [""]
        })
        for (let i = 0; i < saleArr.length; i++) {
          for (let key in saleArr[i]) {
            if (key=="price" || key=="stock"){
              continue
            }
            if (data.emptyValueSpec[key][0]=="" || data.emptyValueSpec[key][0]==undefined){
              data.emptyValueSpec[key][0]=saleArr[i][key]
            }else{
              if (!data.emptyValueSpec[key].includes(saleArr[i][key])){
              data.emptyValueSpec[key].push(saleArr[i][key])
              }
            }
          }
        }
      })
}
const selectChange = () => {
  getSpecifications(ruleForm.cid,ruleForm.sale)
}
const getGoodsById = async () => {
  const id: any = useRoute().query.id
  if (id === undefined || !(/^\d+$/.test(id))) {
    router.push("/admin/goods/list")
    return;
  }
  const res: any = await request.post("/admin/goods/get?id=" + id)
  ruleForm.id = res.id;
  ruleForm.title = res.title;
  //ruleForm.img = res.img;
  ruleForm.price = res.price;
  ruleForm.stock = res.stock;
  ruleForm.cid = res.cid + "";
  ruleForm.sale = JSON.parse(res.sale)
  ruleForm.content = res.content;
  ruleForm.status = res.status + "";
  let imgArr=res.img.split(",")
  for(let index in imgArr){
     let obj={name:imgArr[index],url:CONFIG.SERVER_URL + "/upload/img/goods/" + imgArr[index]}
    fileList.value.push(obj)
  }
  //@ts-ignore
  wangEditor.value.setHtml(res.content)
  const saleArr = JSON.parse(res.sale)
  getSpecifications(res.cid, saleArr)
}
const getCategory = async () => {
  const res: any = await request.post("/admin/goods/category/list")
  const goodsCategory: any = buildTree(res)
  data.goodsCategory = goodsCategory
}
onMounted(() => {
  getCategory()
  getGoodsById()
})
const handleExceed = () => {
  ElWarning("暂只支持3张主图请先删除原主图再上传")
}
const handleSuccess: UploadProps['onSuccess'] = (response: any, uploadFile, uploadFiles) => {
  if (response.code == 200) {
    ElSuccess("上传成功")
    let obj={name:response.data.fileName,url:CONFIG.SERVER_URL + "/upload/img/goods/" + response.data.fileName}
    fileList.value[fileList.value.length-1]=obj
  } else {
    ElError(response.msg)
  }
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
}
const submitForm = async () => {
  //@ts-ignore
  ruleForm.content = wangEditor.value.valueHtml
  if (ruleForm.title == "") return ElError("标题不能为空")
  if (fileList.value.length == 0) return ElError("请上传商品主图")
  if (ruleForm.cid == "") return ElError("请选择分类")
  if (ruleForm.price.length == 0) return ElError("价格不能为空")
  if (ruleForm.stock.length == 0) return ElError("请输入总库存数量")
  if (ruleForm.content == "") return ElError("详情不能为空")
  const priceRegex = /^\d+(?:\.\d{1,2})?$/
  if (!priceRegex.test(ruleForm.price)) return ElError("价格输入有误")
  if (!/^\d+$/.test(ruleForm.stock)) return ElError("库存数量输入有误")
  for (let i = 0; i < ruleForm.sale.length; i++) {
    if (!priceRegex.test(ruleForm.sale[i].price)) {
      return ElError("销售规格中金额输入有误")
    }
    if (!/^\d+$/.test(ruleForm.sale[i].stock)) {
      return ElError("销售规格中数量输入有误")
    }
  }
  ruleForm.img=[]
   fileList.value.forEach((obj:any)=>{
     ruleForm.img.push(obj.name)
   })
  const res: any = await request.post("/admin/goods/edit", ruleForm)
  if (res.code == 200) {
    ElSuccess("提交成功")
    router.push("/admin/goods/list")
  } else {
    ElError("提交失败请重试")
  }
}
const buildTree = (list: Array<object>) => {
  let children: Array<object> = []
  let deep = (children: Array<object>, list: Array<object>) => {
    list.forEach((item: any) => {
      if (item.children && item.children.length > 0) {
        let obj = {
          value: item.categoryId + "",
          label: item.name,
          children: []
        }
        children.push(obj)
        // @ts-ignore
        deep(children[children.length - 1].children, item.children)
      } else {
        // @ts-ignore
        children.push({
          value: item.categoryId + "",
          label: item.name
        })
      }
    })
  }
  deep(children, list)
  return children
}
</script>

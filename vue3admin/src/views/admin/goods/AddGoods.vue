<template>
  <el-form
      :model="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      status-icon>
    <el-form-item label="">
      <h3>基本信息</h3>
    </el-form-item>
    <el-form-item required label="分类" prop="cid" v-if="data.goodsCategory.length>0">
      <el-tree-select v-model.trim="ruleForm.cid" @change="selectChange" :data="data.goodsCategory" placeholder="请选择"/>
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
          :limit="3">
        <el-button type="primary">选择图片</el-button>
        <template #tip>
          <div class="el-upload__tip">
            请上传jpg png 格式图片 最多上传一张
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item required label="是否上架" prop="status" style="display: flex;align-items: center">
      <div class="mb-2 flex items-center text-sm">
        <el-radio-group v-model.trim="ruleForm.status" class="ml-4">
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
  <!----dialog对话框--->
  <el-dialog
      v-model="data.visible"
      :show-close="false"
      :close-on-press-escape="false"
      title="提示"
      width="30%"
      :align-center="true"
  >
    <span>{{ data.dialogMsg }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <div style="width: 100%;height:150px"></div>
</template>
<script lang="ts" setup>
import {ref, reactive, onMounted} from "vue"
import {CONFIG} from "../../../config/config";
import type {UploadProps} from 'element-plus'
import {ElError, ElSuccess, ElWarning} from "../../../utils/msg";
import router from "../../../router"
import WangEditor from "../../../components/WangEditor.vue"
import request from "../../../utils/request"
import {Plus, Delete} from "@element-plus/icons-vue"
import {UploadUserFile} from "element-plus";

const wangEditor = ref(null)
const ruleForm: any = reactive({
  title: '',
  img: [],
  price: 99,
  stock: 0,
  sale: [],
  cid: "",
  // 内容 HTML
  content: "",
  status: "1"
})
const data: any = reactive({
  stockDisabled: false,
  visible: false,
  dialogMsg: "请先添加商品分类",
  goodsCategory: [],
  specifications: [],
  emptyValueSpec: {}
})
const fileList = ref<UploadUserFile[]>([])
const deleteSpec = (index: number) => {
  ruleForm.sale.splice(index, 1);
  if (ruleForm.sale.length == 0) {
    data.stockDisabled=false
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
        let len=data.emptyValueSpec[key].filter((str:String)=>str!="").length
        if (len>0) {
          obj[key] = spec[i][n]
          n++
        }
      }
      obj["active"]=0
      obj["price"] = ruleForm.price
      obj["stock"] = 1
      saleArr.push(obj)
    }
    ruleForm.sale = saleArr
    totalStock()
  }
  if (ruleForm.sale.length==0) data.stockDisabled=false
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
const getCategory = async () => {
  const res: any = await request.post("/admin/goods/category/list")
  data.goodsCategory = buildTree(res)
  if (res.length == 0) data.visible = true
}
const getSpecifications = async (cid: string) => {
  const res: any = await request.post("/admin/specifications/get?cid=" + cid)
  data.specifications = res
  res.forEach((item: any) => {
    data.emptyValueSpec[item.name] = [""]
  })
}
const selectChange = () => {
  getSpecifications(ruleForm.cid)
}
onMounted(() => {
  getCategory()
})
const dialogConfirm = () => {
  router.push("/admin/goods/list")
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
const handleExceed = () => {
  ElWarning("暂只支持3张主图请先删除原主图再上传")
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
  const res: any = await request.post("/admin/goods/add", ruleForm)
  if (res.code == 200) {
    ElSuccess("添加成功")
    router.push("/admin/goods/list")
  } else {
    ElError("添加失败请重试")
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

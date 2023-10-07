<template>
  <el-container>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
      <el-form-item label="分类名称" prop="name">
        <el-input v-model.trim="ruleForm.name" placeholder="请输入分类名称"/>
      </el-form-item>
      <el-form-item label="上级分类" prop="pid">
        <el-tree-select v-model="ruleForm.pid" :data="data.selectCategory" :default-expand-all="true"
                        :check-strictly="true"/>
      </el-form-item>
      <el-form-item label="分类图片" prop="img">
        <el-upload
            v-model="ruleForm.img"
            class="upload-demo"
            :action="CONFIG.SERVER_URL+'/admin/file/img/upload_goods_img'"
            name="file"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            list-type="picture"
            :limit="1"
        >
          <el-button type="info">选择图片</el-button>
          <template #tip>
            <div class="el-upload__tip">
              请上传jpg png 格式图片 最多上传一张
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="submitForm(ruleFormRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script setup lang="ts">
import type {FormInstance, FormRules} from 'element-plus'
import type {UploadProps, UploadUserFile} from 'element-plus'
import {onMounted, reactive, ref} from "vue";
import request from "../../../utils/request"
import {ElError, ElSuccess, ElWarning} from "../../../utils/msg";
import {CONFIG} from "../../../config/config"
import router from "../../../router";
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const data:any=reactive({
  selectCategory: [],
})
onMounted(async ()=>{
  const res:any=await request.post("/admin/goods/category/list")
  data.selectCategory=buildTree(res)
})
const ruleForm = reactive({
  pid: "",
  name: "",
  img:""
})
const rules = reactive<FormRules>({
  pid: [
    {
      required: true,
      message: '请选择上级分类',
      trigger: 'change',
    },
  ],
  name: [
    {required: true, message: '请输入分类名称', trigger: 'blur'},
    {min: 2, max: 500, message: '', trigger: 'blur'},
  ],
  img: [
    {required: true, message: '请选择图片', trigger: 'blur'},
    {},
  ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      request.post("/admin/goods/category/add", ruleForm).then((res: any) => {
        if (res.code == 200) {
           ElSuccess("添加成功")
          router.push("/admin/goods/category/list")
        } else {
          ElError("添加失败请重试")
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const buildTree = (list: Array<object>) => {
  let children: Array<object> = [{value: "0", label: "顶级分类"}]
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
const handleSuccess: UploadProps['onSuccess'] = (response: any, uploadFile, uploadFiles) => {
  if (response.code == 200) {
    ElSuccess("上传成功")
    ruleForm.img = response.data.fileName
  } else {
    ElError(response.msg)
  }
}
const handleExceed=()=>{
  ElWarning("暂只支持一张主图请先删除原主图再上传")
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  request.post("/admin/file/img/delete", {fileName: ruleForm.img}).then((res: any) => {
    ruleForm.img = ""
  })
}
</script>
<style scoped>

</style>
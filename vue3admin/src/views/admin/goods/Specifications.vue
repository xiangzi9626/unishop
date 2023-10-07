<template>
  <div class="btn-box">
    <el-button type="primary" :icon="Plus" @click="data.addVisible=true">添加</el-button>
  </div>
  <div>
    <el-table
        :data="data.list"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        :border="true"
        :stripe="true"
        default-expand-all
        empty-text="没有数据"
    >
      <el-table-column prop="id" label="ID" sortable/>
      <el-table-column prop="name" label="规格名" sortable/>
      <el-table-column prop="value" label="规格值" sortable>
        <template #default="scope">
          <div style="display:flex;flex-wrap: wrap;">
            <template v-for="item in scope.row.value.split(',')">
            <span style="margin-bottom:5px;padding:2px 7px;background:dodgerblue;color: white">{{item}}</span>&nbsp;
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="category_name" label="所属分类" sortable/>
      <el-table-column label="操作" sortable>
        <template #default="scope">
          <el-tooltip
              class="box-item"
              effect="dark"
              content="编辑"
              placement="top-start"
          >
            <el-icon
                @click="editShow(scope.row)">
              <Edit/>
            </el-icon>
          </el-tooltip>
          &nbsp;
          <el-popconfirm :title="'确定删除规格 '+scope.row.name+' 吗?'" @confirm="deleteSpec(scope.row.id)"
                         confirm-button-text="确定" cancel-button-text="取消">
            <template #reference>
              <el-icon class="btn">
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="删除"
                    placement="top-start"
                >
                  <Delete/>
                </el-tooltip>
              </el-icon>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-if="data.total>0"
        background
        layout="prev, pager, next,sizes,total"
        :total="data.total" :page-sizes="[10, 20, 30, 40]"
        v-model:current-page="data.currentPage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"/>
  </div>
  <!--编辑弹出层-->
  <el-dialog v-model="data.editVisible" title="编辑规格" :align-center="true" style="width:500px;justify-content: center">
    <el-scrollbar :native="true" ref="scrollRef" max-height="400px">
      <el-form :model="form" style="margin:auto;width:400px;padding-bottom:30px;">
        <el-form-item label="所属分类" required>
        </el-form-item>
        <el-form-item label="">
          <el-tree-select v-model.trim="form.cid" :data="data.treeCategory" placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="规格名" required>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model.trim="form.name" autocomplete="off" placeholder="请输入规格名"/>
        </el-form-item>
        <el-form-item label="规格值" required>
        </el-form-item>
        <el-form-item label="">
          <template v-for="(item,index) in form.value" :key="index">
            <el-input v-model.trim="form.value[index]" autocomplete="off" placeholder="请输入规格值" style="margin-bottom:10px;width:200px"/>
            <el-button @click="deleteValue(index)" style="margin-bottom:10px;" v-if="form.value.length>1" type="danger" :icon="Delete">删除</el-button>
          </template>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="addValue()" type="primary" :icon="Plus">新增规格值</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitEdit">保存</el-button>
      </span>
    </template>
  </el-dialog>
    <!--增加弹出层-->
  <el-dialog v-model="data.addVisible" title="添加规格" :align-center="true" style="width:500px;justify-content: center">
    <el-scrollbar :native="true" ref="scrollRef" max-height="400px">
    <el-form :model="form" style="margin:auto;width:400px;padding-bottom:30px;">
      <el-form-item label="所属分类" required>
       </el-form-item>
      <el-form-item label="">
        <el-tree-select v-model.trim="form.cid" :data="data.treeCategory" placeholder="请选择"/>
      </el-form-item>
       <el-form-item label="规格名" required>
       </el-form-item>
      <el-form-item label="">
        <el-input v-model.trim="form.name" autocomplete="off" placeholder="请输入规格名"/>
      </el-form-item>
      <el-form-item label="规格值" required>
      </el-form-item>
      <el-form-item label="">
            <template v-for="(item,index) in form.value" :key="index">
               <el-input v-model.trim="form.value[index]" autocomplete="off" placeholder="请输入规格值" style="margin-bottom:10px;width:200px"/>
               <el-button @click="deleteValue(index)" style="margin-bottom:10px;" v-if="form.value.length>1" type="danger" :icon="Delete">删除</el-button>
            </template>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="addValue()" type="primary" :icon="Plus">新增规格值</el-button>
      </el-form-item>
    </el-form>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="add">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue"
import {Edit,Delete,Plus} from "@element-plus/icons-vue"
import {ElError, ElSuccess} from "../../../utils/msg";
import request from "../../../utils/request";
import {FormRules} from "element-plus";
const scrollRef:any=ref(null)
const data:any = reactive({
  addVisible: false,
  editVisible: false,
  list: [],
  goodsCategory:[],
  treeCategory:[],
  total: 0,
  currentPage: 1,
  pageSize: 10
})
const form=reactive({
  id:0,
  name:"",
  value:[""],
  cid:""
})
const add=async ()=>{
  if (form.cid=="") return ElError("请选择分类")
  if (form.name=="") return ElError("请输入规格名")
  for (let i=0;i<form.value.length;i++){
    if (form.value[i]=="") {
      return ElError("请输入规格值")
    }
  }
  const param=`name=${form.name}&value=${form.value}&cid=${form.cid}`
  const res:any=await request.post("/admin/specifications/add?"+param)
   if (res.code==200){
    cancel()
    getData()
  }
}
const deleteValue=(index:number)=>{
  form.value.splice(index,1)
}
const addValue=()=>{
  form.value.push("")
 scrollRef.value.setScrollTop(100*form.value.length)
}
const cancel=()=>{
  data.addVisible=false
  data.editVisible=false
  form.cid=""
  form.name=""
  form.value=[""]
}
const getCategory=async ()=>{
  const res:any = await request.post("/admin/goods/category/list")
  data.treeCategory = buildTree(res)
  data.goodsCategory = res
}
const getData =async () => {
 const res:any =await request.post("/admin/specifications/list", {currentPage: data.currentPage, pageSize:data.pageSize})
    data.list = res.data
    data.total = res.total
}
onMounted(()=>{
  getData()
  getCategory()
})
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
const editShow=(item:any)=>{
  data.editVisible=true
  form.id=item.id
  form.name=item.name
  form.value=item.value.split(",")
  form.cid=item.cid+""
}
const submitEdit=async () => {
  if (form.cid=="") return ElError("请选择分类")
  if (form.name=="") return ElError("请输入规格名")
  for (let i=0;i<form.value.length;i++){
    if (form.value[i]=="") {
      return ElError("请输入规格值")
    }
  }
  const param=`id=${form.id}&name=${form.name}&value=${form.value}&cid=${form.cid}`
  const res:any=await request.post("/admin/specifications/edit?"+param)
    if (res.code == 200) {
      ElSuccess("用户资料修改成功")
      cancel()
      getData()
    } else {
      ElError(res.msg)
    }
}
const deleteSpec=async (id:number) => {
  const res:any =await request.post("/admin/specifications/delete?id="+id)
  if (res.code == 200) {
    ElSuccess("用户资料修改成功")
    cancel()
    getData()
  } else {
    ElError(res.msg)
  }
}
const handleCurrentChange = (val: number) => {
  data.currentPage = val
  getData()
}
const handleSizeChange = (val: number) => {
  data.currentPage = 1
  data.pageSize = val
  getData()
}
</script>

<style scoped>
.el-icon {
  cursor: pointer;
}
</style>

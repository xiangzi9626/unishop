<template>
  <div class="btn-box">
    <el-button type="primary" :icon="Plus"
               @click="jump">添加
    </el-button>
  </div>
  <el-container>
    <el-table
        :data="data.goodsCategory"
        style="width: 100%; margin-bottom: 20px"
        row-key="category_id"
        empty-text="没有数据"
        :border="true"
        :stripe="true"
        default-expand-all
    >
      <el-table-column prop="categoryId" label="ID" sortable/>
      <el-table-column prop="img" label="图片" sortable>
        <template #default="scope">
          <span><img style="max-width:500px;max-height:80px"
                     :src="CONFIG.SERVER_URL+'/upload/img/goods/'+scope.row.img"/></span>

        </template>
      </el-table-column>
      <el-table-column prop="name" label="分类名称" sortable/>
      <el-table-column prop="pid" label="父ID" sortable/>
      <el-table-column label="操作" sortable>
        <template #default="scope">
            <el-icon class="btn" @click="jumpEdit(scope.row)">
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="编辑"
                  placement="top-start"
              >
                <Edit/>
              </el-tooltip>
            </el-icon>
          &nbsp;
          <el-popconfirm :title="'确定删除分类 '+scope.row.name+' 吗?'" @confirm="handleDelete(scope.row)"
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
  </el-container>
</template>
<script setup lang="ts">
import {Delete,Edit,Plus} from "@element-plus/icons-vue"
import {onMounted, reactive} from "vue"
import {ElError, ElSuccess} from "../../../utils/msg";
import request from '../../../utils/request'
import router from "../../../router";
import {CONFIG} from "../../../config/config"
const data: any = reactive({
  goodsCategory: [],
})

const jump = () => {
  router.push("/admin/goods/category/add")
}
const getData = async () => {
  const res: any = await request.post("/admin/goods/category/list")
  data.goodsCategory = res
}
onMounted(() => {
  getData()
})
const jumpEdit=(row:any)=>{
  router.push("/admin/goods/category/edit?id="+row.categoryId)
}
const handleDelete = (item: any) => {
  request.post("/admin/goods/category/delete", {id: item.categoryId}).then((res: any) => {
    if (res.code == 200) {
      ElSuccess(res.msg)
      getData()
    } else {
      ElError(res.msg)
    }
  })
}

</script>
<style scoped>
.el-container{
  padding-bottom: 100px;
}
.btn-box {
  margin-bottom: 10px;
}

.btn {
  cursor: pointer;
}
</style>

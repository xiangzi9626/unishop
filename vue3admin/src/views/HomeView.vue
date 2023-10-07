<template>
  <div v-for="item in data.res">
    <h3>{{item}}</h3>
  </div>

</template>
<script setup>
import {onMounted, reactive} from "vue";

const data=reactive({
  res:[],
  arr:[[1,2,3],["a","b","c"],["d"]]
})
onMounted(()=>{
  data.res=getAllCombinations(data.arr)
})

const getAllCombinations=(arrays)=>{
  const result= [];
  // 递归函数
  const helper = (current, arrays) => {
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
</script>
<style>

.el-message {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
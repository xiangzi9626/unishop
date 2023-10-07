<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧的滑动区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true">
        <block v-for="(item, i) in data.cateList" :key="i">
          <view :class="['left-scroll-view-item', i === data.active ? 'active' : '']" @click="activeChanged(i)">{{item.name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧的滑动区域 -->
      <scroll-view scroll-y="true">
        <view class="cate-lv2" v-for="(item2, i2) in data.cateLevel2" :key="i2">
          <!-- 二级分类的标题 -->
          <view class="cate-lv2-title">/ {{item2.name}} /</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from "vue";
   const data=reactive({
       cateList: [{cid:1,name:"手机"},{cid:2,name:"手机"},{cid:3,name:"手机"},{cid:4,name:"手机"}],
        active: 0,
    })
      // 获取分类列表的数据
      const getCateList = async ()=>{
        const { data: res } = await uni.$http.get('/api/public/v1/categories')
      }
     const activeChanged=(i)=>{
        data.active = i
  }
      const gotoGoodsList=(cid)=>{
        uni.navigateTo({
          url: '/pages/goods_list/goods_list?cid=' + cid
        })
      } 
</script>

<style lang="scss" scoped>
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        background-color: #F7F7F7;
        line-height: 60px;
        text-align: center;
        font-size: 30rpx;
		font-weight: 800;

        &.active {
          background-color:#FFFFFF;
		  color:#C00000;
          position: relative;

          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #C00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }
</style>

<template>
  <el-carousel indicator-position="outside" interval="4000">
    <el-carousel-item>
      <img src="@/assets/appleHiring.png" class="img-fluid object-fit-cover h-100 w-100">
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/xiaomiHiring.png" class="img-fluid object-fit-cover h-100 w-100">
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/huaweiHiring.png" class="img-fluid object-fit-cover h-100 w-100">
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="css" scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<script setup lang="ts">
</script>

<template>
  <div class="empty">
    <div class="img"><img src="../assets/images/empty.png" height="200" alt=""/></div>
    <div class="txt">
      <slot name="title">数据空空的</slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "empty",
});
</script>
<style lang="scss" scoped>
.empty {
  text-align: center;
  .img {
    margin-bottom: 10px;
  }
  .txt {
    color: #999;
  }
}
</style>

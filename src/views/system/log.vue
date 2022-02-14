<template>
  <div style="padding:30px;">
    <el-button type="primary" @click="onSubmit">下载日志</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    onSubmit() {
      this.$message({
        message: '下载成功!',
        type: 'success'
      })
    }
  }
}
</script>

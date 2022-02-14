<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="程序包版本">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="从网络下载">
        <el-input v-model="form.name" />
        <p class="tip">
          支持HTTP, FTP下载
          <br>
          例: http://127.0.0.0/343/sds.tgz
          <br>
          &nbsp;ftp://dsfds.dfsaf.dsd.tgz
        </p>
      </el-form-item>
      <el-form-item label="md5值">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="升级文件">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">请选择升级包</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始升级</el-button>
          <!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
      </el-form-item>
      <!--      <el-form-item>-->
      <!--        <el-button type="primary" @click="onSubmit">开始升级</el-button>-->
      <!--      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      form: {
        name: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.tip {
  color: #666;
}
</style>

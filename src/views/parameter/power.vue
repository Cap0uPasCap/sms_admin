<template>
  <div style="width: 80%;padding: 50px 10%;">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="功放状态">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="版本">
        <el-input style="width: 70%;" v-model="form.name" />
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="功率值">
            <el-input v-model="form.name1" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="增益">
            <el-input v-model="form.name2" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="功率">
            <el-input v-model="form.name3" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="驻波比">
        <el-input style="width: 40%;" v-model="form.name4" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        name1: '',
        name2: '',
        name3: '',
        name4: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


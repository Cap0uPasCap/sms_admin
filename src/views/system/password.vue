<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="密码: ">
        <el-input v-model="form.change_password" />
      </el-form-item>
      <el-form-item label="确认密码: " validate-status="">
        <el-input v-model="form.change_password_confirm" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editPass } from '@/api/user'

export default {
  data() {
    return {
      form: {
        change_password: '',
        change_password_confirm: ''
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.form.change_password !== this.form.change_password_confirm) {
        this.$message.error('密码不一致')
      } else {
        editPass({ change_password: this.form.change_password }).then(response => {
          const { msg } = response
          this.$message({
            type: 'success',
            message: msg
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


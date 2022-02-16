<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="原始密码: ">
        <el-input v-model="form.oldPassword" type="password" />
      </el-form-item>
      <el-form-item label="新密码: ">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码: " validate-status="">
        <el-input v-model="form.passwordConfirm" type="password" />
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
        oldPassword: '',
        password: '',
        passwordConfirm: ''
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.form.password !== this.form.passwordConfirm) {
        this.$message.error('密码不一致')
      } else {
        editPass({ password: this.form.password, oldPassword: this.form.oldPassword }).then(response => {
          const { msg } = response
          this.$message({
            type: 'success',
            message: msg
          })
          this.form = {
            oldPassword: '',
            password: '',
            passwordConfirm: ''
          }
        })
      }
    }
  }
}
</script>


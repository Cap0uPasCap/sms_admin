<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="设备名称: ">
        <el-row>
          <el-col :span="8">
            <el-input size="small" v-model="form.name" />
          </el-col>
          <el-col :span="12">
            <el-button size="small" style="margin-left: 10px" type="primary" @click="edit">修改</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="设备地址: ">
        东经115°27′-116°35′，北纬28°09′29°11′
      </el-form-item>
      <el-form-item label="运行状态: ">
        <!--        正常运行/准备就绪/异常-->
        <el-tag size="small" type="success">正常运行</el-tag>
      </el-form-item>
      <el-form-item label="GPS状态: ">
        <!--        锁定/未锁定-->
        <el-tag size="small" type="success">未锁定</el-tag>
      </el-form-item>
      <el-form-item label="网络状态: ">
        <el-tag size="small" type="success">正常</el-tag>
      </el-form-item>
      <el-form-item label="系统版本号: ">
        V1.20
      </el-form-item>
      <el-form-item label="设备序列号: ">
        <!--     -厂商编号   -->
        SN3432423.1
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: 'SHANNON_HDKE12',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    edit() {
      this.$message.success('修改成功!')
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="设备名称: ">
        <el-row>
          <el-col :span="12">
            <el-input v-model="form.deviceName" size="small" />
          </el-col>
          <el-col :span="12">
            <el-button size="small" style="margin-left: 10px" type="primary" @click="changeDeviceNameClick(form.deviceName)">修改</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="设备地址: ">
        {{ form.longitude }}, {{ form.latitude }}
      </el-form-item>
      <el-form-item label="运行状态: ">
        <!--        正常运行/准备就绪/异常-->
        <el-tag size="small" type="success">正常运行{{ form.runStatus }}</el-tag>
      </el-form-item>
      <el-form-item label="GPS状态: ">
        <!--        锁定/未锁定-->
        <el-tag size="small" type="success">未锁定 {{ form.gpsStatus }}</el-tag>
      </el-form-item>
      <el-form-item label="网络状态: ">
        <el-tag size="small" type="success">正常{{ form.netStatus }}</el-tag>
      </el-form-item>
      <el-form-item label="系统版本号: ">
        {{ form.systemVersion }}
      </el-form-item>
      <el-form-item label="设备序列号: ">
        <!--     -厂商编号   -->
        {{ form.deviceSN }}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSystemMode, changeDeviceName } from '@/api/system-state'
export default {
  data() {
    return {
      form: {
        deviceName: '',
        deviceSN: '',
        gpsStatus: '',
        latitude: '',
        longitude: '',
        systemVersion: '',
        netStatus: '',
        runStatus: ''
      }
    }
  },
  created() {
    this.getInitData()
  },
  methods: {
    changeDeviceNameClick(deviceName) {
      changeDeviceName(deviceName).then(res => {
        this.$message.success(res?.msg || '操作成功')
        this.getInitData()
      })
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    getInitData() {
      getSystemMode().then(res => {
        this.form = { ...res.data }
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


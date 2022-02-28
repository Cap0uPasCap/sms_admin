<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="设备名称: ">
        <el-row v-if="showEditInput">
          <el-col :span="5">
            <el-input v-model="deviceName" size="small" placeholder="请输入" />
          </el-col>
          <el-col :span="5">
            <el-input v-model="areaCode" size="small" placeholder="请输入" />
          </el-col>
          <el-col :span="14">
            <el-button icon="el-icon-circle-check" size="small" plain style="margin-left: 10px" type="primary" @click="changeDeviceNameClick">提交</el-button>
            <el-button icon="el-icon-circle-close" size="small" plain type="info" @click="showEditInput = false">取消</el-button>
          </el-col>
        </el-row>
        <div v-else>
          {{ form.deviceName }}
          <el-button icon="el-icon-edit" size="small" plain style="margin-left: 10px" type="primary" @click="editClick">编辑</el-button>
        </div>
      </el-form-item>
      <el-form-item label="设备地址: ">
        {{ form.longitude }}{{ form.latitude ? ',' : '' }} {{ form.latitude }}
      </el-form-item>
      <el-form-item label="运行状态: ">
        <!--        正常运行/准备就绪/异常 -->
        <el-tag size="small" :type="form.runStatus === 1 ? 'success' : 'danger'">{{ form.runStatus === 1 ? '在线' : '不在线' }}</el-tag>
      </el-form-item>
      <el-form-item label="GPS状态: ">
        <!--        锁定/未锁定 -->
        <el-tag size="small" :type="form.runStatus === 1 ? 'success' : 'danger'">{{ form.gpsStatus === 1 ? '锁定' : '未锁定' }} </el-tag>
      </el-form-item>
      <el-form-item label="网络状态: ">
        <el-tag size="small" :type="form.netStatus === 1 ? 'success' : 'danger'"> {{ form.netStatus === 1 ? '正常' : '异常' }} </el-tag>
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
      showEditInput: false,
      areaCode: '',
      deviceName: '',
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
    /*
    * 编辑按钮操作
    * 把deviceName 根据 . 截取成两个字段分别代表省份编码 和 设备名称
    * */
    editClick() {
      this.showEditInput = true
      try {
        const deviceNameArr = this.form.deviceName.split('.')
        if (deviceNameArr.length > 1) {
          this.areaCode = deviceNameArr[1]
          this.deviceName = deviceNameArr[0]
        } else {
          this.areaCode = ''
          this.deviceName = deviceNameArr[0]
        }
      } catch (err) {
        this.$message.error('设备名称格式错误')
      }
    },
    changeDeviceNameClick() {
      if (!this.areaCode) return this.$message.error('不能为空')
      if (!this.deviceName) return this.$message.error('不能为空')
      const deviceName = this.deviceName + '.' + this.areaCode
      changeDeviceName(deviceName).then(res => {
        this.$message.success(res?.msg || '操作成功')
        this.showEditInput = false
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
.line {
  text-align: center;
}
</style>


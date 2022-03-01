<template>
  <div style="width: 80%;padding: 50px 10%;">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="功放状态">
        <el-switch
          v-model="form.paStatus"
          :active-value="1"
          :inactive-value="0"
          @change="onSubmit"
        />
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="频率">
            <el-input v-model="form.paSWR" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="增益">
            <el-input v-model="form.paGain" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="温度">
            <el-input v-model="form.temp" readonly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="驻波比">
        <el-input v-model="form.paPower" readonly style="width: 40%;" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getPowerInfo, setPowerInfo } from '@/api/parameter'
export default {
  data() {
    return {
      form: {
        paStatus: '',
        paSWR: '',
        paGain: '',
        baseBandId: '',
        temp: '',
        paPower: ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getPowerInfo().then(res => {
        this.form = res.data
      })
    },
    onSubmit() {
      setPowerInfo({
        baseBandId: this.form.baseBandId,
        paStatus: this.form.paStatus
      }).then(res => {
        this.$message({
          type: 'success',
          message: res?.msg
        })
        // this.getData()
      })
    }
  }
}
</script>

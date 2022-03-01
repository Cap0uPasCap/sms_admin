<template>
  <div style="width: 80%;padding: 50px 10%;">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="功放状态">
        <el-switch
          v-model="form.paStatus"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="频率">
            <el-input v-model="form.paSWR" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="增益">
            <el-input v-model="form.paGain" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="温度">
            <el-input v-model="form.baseBandId" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="驻波比">
        <el-input v-model="form.paPower" style="width: 40%;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getPowerInfo, setPowerInfo } from '@/api/parameter';
export default {
  data() {
    return {
      form: {
        paStatus: '',
        paSWR: '',
        paGain: '',
        baseBandId: '',
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
      setPowerInfo(this.form).then(res => {
        this.$message({
          type: 'success',
          message: res?.msg
        })
        this.getPowerInfo()
      })
    }
  }
}
</script>

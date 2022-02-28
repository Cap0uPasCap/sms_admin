<template>
  <div style="padding: 50px">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="#" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="PLMN">
        <template slot-scope="scope">
          <el-input v-model="scope.row.plmn" type="number" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="BAND" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.band" type="number" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="RFCN" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.rfcn" type="number" size="small" />
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="TAC" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.tac" type="number" size="small" />
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="TAC更新周期" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.tacTimeValue" type="number" size="small" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="pci" label="PCI">
        <template slot-scope="scope">
          <el-input v-model="scope.row.pci" type="number" size="small" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="cellId" label="CELLID">
        <template slot-scope="scope">
          <el-input v-model="scope.row.cellId" type="number" size="small" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="txpwr" label="TXPWR">
        <template slot-scope="scope">
          <el-input v-model="scope.row.txpwr" type="number" size="small" />
        </template>
      </el-table-column>
      <!--      <el-table-column align="center" prop="ueReleaseReason" label="UE释放原因">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-input type="number" v-model="scope.row.ueReleaseReason" size="small" />-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column align="center" label="ACTION" width="160">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="editRow(scope.row)">重启</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { cellUpdate, getCellList } from '@/api/parameter'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    editRow(rowData) {
      if (rowData?.plmn.length === 5 && rowData?.plmn % 1 === 0) {
        const mcc = parseInt(rowData.plmn.substring(0, 3))
        const mnc = parseInt(rowData.plmn.substring(3))
        delete rowData.plmn
        cellUpdate({
          ...rowData,
          mcc,
          mnc
        }).then(res => {
          this.$message({
            type: 'success',
            message: res?.msg
          })
          this.fetchData()
        })
      } else {
        this.$message.error('plmn必须为5位数数字')
      }
    },
    fetchData() {
      this.listLoading = false
      getCellList().then(res => {
        const list = []
        res.data.forEach(e => {
          list.push({
            ...e,
            plmn: e.mcc + '' + e.mnc
          })
        })
        this.list = list
      })
    }
  }
}
</script>

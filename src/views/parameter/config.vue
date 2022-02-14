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
          <el-input size="small" />
        </template>
      </el-table-column>
      <el-table-column label="BAND" align="center">
        <template slot-scope="scope">
          <el-input size="small" />
        </template>
      </el-table-column>
      <el-table-column label="RFCN" align="center">
        <template slot-scope="scope">
          <el-input size="small" />
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="TAC" align="center">
        <template slot-scope="scope">
          <el-input size="small" />
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="TAC更新周期" align="center">
        <template slot-scope="scope">
          <el-input size="small" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="PCI">
        <template slot-scope="scope">
          <el-input size="small" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="CELLID">
        <template slot-scope="scope">
          <el-input size="small" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="TXPWR">
        <template slot-scope="scope">
          <el-input size="small" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="UE释放原因">
        <template slot-scope="scope">
          <el-input size="small" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="ACTION" width="160">
        <template>
          <el-button type="primary" plain size="small">重启</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

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
    fetchData() {
      this.listLoading = false
      this.list = [{}, {}]
    }
  }
}
</script>

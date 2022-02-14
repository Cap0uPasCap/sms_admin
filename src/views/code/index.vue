<template>
  <div style="padding: 40px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="实时数据" name="first" />
      <el-tab-pane label="历史数据" name="second" />
    </el-tabs>
    <div>
      <div class="filter-container" style="margin: 20px 0;">
        <el-input v-model="listQuery.title" placeholder="IMSI" style="width: 180px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-date-picker
          v-model="listQuery.time"
          style="width: 220px;margin-left: 10px"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <el-switch
          v-model="listQuery.sort"
          style="margin: 0 10px"
          active-text="去重"
          inactive-text="不去重"
        />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          Search
        </el-button>
        <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          Export
        </el-button>
      </div>

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="FORM" prop="form" align="center">
          <template slot-scope="{row}">
            <span>{{ row.form }}</span>
          </template>
        </el-table-column>
        <el-table-column label="TIME" align="center">
          <template slot-scope="{row}">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="IMSI" align="center">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.title }}</span>
            <el-tag>{{ row.imsi }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="rssi" align="center">
          <template slot-scope="{row}">
            <span>{{ row.rssi }}</span>
          </template>
        </el-table-column>
        <el-table-column label="ta" align="center">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.ta }}</span>
          </template>
        </el-table-column>
        <el-table-column label="TYPE" align="center">
          <template slot-scope="{row}">
            <span>{{ row.type }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
  </div>
</template>

<script>
// import { fetchPv, createArticle, updateArticle } from '@/api/article'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  // directives: { waves },
  data() {
    return {
      activeName: 'second',
      tableKey: 0,
      list: null,
      total: 10,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleClick() {
      this.getList()
    },
    getList() {
      this.listLoading = true
      this.list = [
        {
          form: 'WL2.6G',
          time: '20220120-16:44:22',
          imsi: 34234234234234,
          rssi: 42,
          ta: 0,
          type: 'ATTACH'
        },
        {
          form: 'WL2.6G',
          time: '20220120-16:43:22',
          imsi: 342653423433234,
          rssi: 52,
          ta: 0,
          type: 'ATTACH'
        }
      ]
      this.total = 2
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    },
    onSubmit() {
      this.$message('submit!')
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      // import('@/vendor/Export2Excel').then(excel => {
      //   const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const data = this.formatJson(filterVal)
      //   excel.export_json_to_excel({
      //     header: tHeader,
      //     data,
      //     filename: 'table-list'
      //   })
      //   this.downloadLoading = false
      // })
    }
  }
}
</script>

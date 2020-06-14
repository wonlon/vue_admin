<template>
  <div class="app-container">
    <div class="filter-container mySearch">
      <i>组织id:</i><el-input v-model="listQuery.oid" placeholder="组织id" style="width: 80px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <i>用户id:</i><el-input v-model="listQuery.uid" placeholder="姓名" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <i>手机号:</i><el-input v-model="listQuery.phone" placeholder="手机号" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <i>邮箱:</i><el-input v-model="listQuery.emial" placeholder="邮箱" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <i>用户名:</i><el-input v-model="listQuery.username" placeholder="用户名" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
      
      <!-- <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button v-waves class="filter-item"   type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    
      <el-button v-waves :loading="downloadLoading"  class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        下载
      </el-button>
      
    </div>
    
    <div class="myTable">
      <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="序号" prop="id"  type='index' align="center" width="50">
        <!-- <template slot-scope="{row}">
          <span>{{ row.id}}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="uid"" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.uid}}</span>
        </template>
      </el-table-column>
      <el-table-column label="oid" min-width="50px">
        <template slot-scope="{row}">
          <span>{{ row.oid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱"  align="center" width="230px">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="isAdmin" align="center" width="80">
        <template slot-scope="{row}">
          <span v-if="row.administrator == 1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="注册日期" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <span>{{ row.reg_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="isTest" class-name="status-col" width="80">
        <template slot-scope="{row}">
        
           <span v-if="row.is_test == 1">是</span>
          <span v-else>否</span>


        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="130" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
           <el-button type="primary" size="mini" @click="inEnter(row.oid)">
            进入
           </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<style lang="scss">
.mySearch{
  position: sticky;
}
.mySearch i{
  color: gray
}
.myTable{
  // overflow: scroll;
}
</style>
<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import axios from 'axios'
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        oid:'',
        uid:'',
        phone:'',
        email:'',
        username:'',
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      var param = {
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        uid: this.listQuery.uid,
        oid: this.listQuery.oid,
        emial: this.listQuery.emial,
        phone: this.listQuery.phone,
        username: this.listQuery.username,
      };
      axios.get("/api/org/main",{
                  params:param
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == 10000)
                    {
                      this.list = res.data.list;
                      this.total = res.data.total;
                    }
                    else
                    {
                      console.log(res);
                    }

                    this.listLoading = false
                });
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    inEnter(rowOid){
      var param = {
        oid:rowOid
      };
      axios.get("/api/org/jump",{
                  params:param
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == 10000)
                    {
                      let url = res.data.url;
                      window.open(url,"_blank");
                    }
                    else
                    {
                      console.log(res);
                    }


                });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true




      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', 'uid', 'oid', 'username', 'phone','email', 'administrator', 'reg_time',  'is_test']
        const filterVal = ['id', 'uid', 'oid', 'username', 'phone','email', 'administrator', 'reg_time', 'is_test']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>

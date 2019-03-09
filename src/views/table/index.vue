<template>
<div class="app-container">
  <el-table
    v-loading="listloading"
    :data="list"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row>
    <el-table-column align="center" label="索引" width="95">
        <template slot-scope="scope">
            <span>{{scope.$index}}</span>
        </template>
    </el-table-column>
    <el-table-column align="center" label="标题">
        <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
        </template>
    </el-table-column>
    <el-table-column align="center" label="作者" width="110">
        <template slot-scope="scope">
            <span>{{scope.row.author}}</span>
        </template>
    </el-table-column>
    <el-table-column align="center" label="阅读次数" width="110"> 
      <template slot-scope="scope">
        <span>{{scope.row.pageviews}}</span>
      </template>
    </el-table-column>
    <el-table-column class-name="status-col" align="center" label="状态" width="110"> 
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="created_at" align="center" label="创建时间" width="200"> 
      <template slot-scope="scope">
          <i class="el-icon-time"></i>
        <span>{{scope.row.display_time}}</span>
      </template>
    </el-table-column>
  </el-table> 
</div>
    
</template>
<script>
import { getList } from '@/api/table'

  export default {
    data() {
      return {
          list: null,
          listloading: true
      }
    },
    //过滤器
    filters:{
        statusFilter(status){
            const statusMap = {
                published: 'success',
                draft:'gray',
                delete:'danger'
            }
            return statusMap[status]
        }
    },
    created(){
        this.fetchData()
    },
    methods: {
        fetchData(){
            this.listloading = true
            getList(this.listQuery).then(response => {
                console.log(response)
                this.list = response.data.items
                this.listloading = false
            })
        }
    }
  }
</script>
<style rel="stylesheet/scss" scoped>

</style>

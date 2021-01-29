<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="bannerQuery.title" placeholder="标题"/>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="bannerQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="bannerQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (current - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="200"/>

      <el-table-column label="图片" width="470" align="center">
        <template slot-scope="scope">
          <div class="info">
            <div class="pic">
              <img :src="scope.row.imageUrl" alt="scope.row.title" width="150px">
            </div>
          </div>

        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="115"/>

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>
  // 引入teacher.js
  import banner from '@/api/edu/banner.js'

  export default {
    // 写核心代码位置
    data() {
      // 定义变量和初始值
      return {
        listLoading: true,
        list: null, // 用于查询之后接收结果；结果数据可能是集合或对象
        current: 1, // 当前页
        limit: 8, // 每页记录数
        total: 0, // 总记录数
        bannerQuery: {
          title: '',
          begin: '',
          end: ''
        } // 条件封装对象
      }
    },
    created() {
      // 页面渲染之前执行，一般调用methods定义的方法
      this.getList()
    },
    methods: {
      // 创建具体的方法，调用teacher.js定义的方法
      // 讲师列表的方法
      getList(current = 1) {
        this.current = current
        this.listLoading = true
        banner.getPageBanner(this.current, this.limit, this.bannerQuery)
          .then(response => {
            // response接口返回的数据
            this.list = response.data.records
            this.total = response.data.total
            this.listLoading = false
          })
          .catch(error => {
            console.log(error)
          })
      },
      resetData() {
        this.bannerQuery = {}
        this.getList()
      },
      removeDataById(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          banner.removeById(id)
            .then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList(this.page)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    }
  }
</script>

<template>
<d2-container>
  <el-card>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      add-title="添加数据"
      :add-template="addTemplate"
      :form-options="formOptions"
      :pagination="pagination"
      :loading="loading"
      @pagination-current-change="paginationCurrentChange"
      @dialog-open="handleDialogOpen"
      @row-add="handleRowAdd"
      @dialog-cancel="handleDialogCancel">
      <el-button slot="header" style="margin-bottom: 5px" @click="addRow"><i class="fa fa-plus" aria-hidden="true"></i> 新增</el-button>
      <el-button slot="header" style="margin-bottom: 5px" @click="addRowWithNewTemplate">使用自定义模板新增</el-button>
      <el-input slot="header" style="margin-bottom: 5px" placeholder="商品名称" suffix-icon="el-icon-search"> </el-input>
      <el-input slot="header" style="margin-bottom: 5px" placeholder="最低价格" suffix-icon="el-icon-caret-bottom"> </el-input>
      <el-input slot="header" style="margin-bottom: 5px" placeholder="最高价格" suffix-icon="el-icon-caret-top"> </el-input>
      <el-button slot="header" style="margin-bottom: 5px"><i class="el-icon-search"></i> 搜索</el-button>
    </d2-crud>
  </el-card>
</d2-container>
</template>

<script>
// import { BusinessTable1List } from '@api/demo.business.table.1'
export default {
  data () {
    return {
      columns: [
        {
          title: '姓名',
          key: 'employeeName'
        },
        {
          title: '员工号',
          key: 'employeeID'
        },
        {
          title: '岗位',
          key: 'position'
        },
        {
          title: '职级',
          key: 'tittle'
        },
        {
          title: '登陆名',
          key: 'username'
        },
        {
          title: '密码',
          key: 'password'
        },
        {
          title: '是否空闲',
          key: 'available'
        }
      ],
      data: [
        {
          employeeName: '小徐',
          employeeID: '900120',
          position: '摄像',
          tittle: '普通员工',
          username: '兆良',
          password: '54SB',
          available: '否'
        },
        {
          employeeName: '小徐',
          employeeID: '900120',
          position: '摄像',
          tittle: '普通员工',
          username: '兆良',
          password: '54SB',
          available: '否'
        },
        {
          employeeName: '小徐',
          employeeID: '900120',
          position: '摄像',
          tittle: '普通员工',
          username: '兆良',
          password: '54SB',
          available: '否'
        },
        {
          employeeName: '小徐',
          employeeID: '900120',
          position: '摄像',
          tittle: '普通员工',
          username: '兆良',
          password: '54SB',
          available: '否'
        }
      ],
      addTemplate: {
        employeeName: {
          title: '姓名',
          value: '小徐'
        },
        employeeID: {
          title: '员工号',
          value: '900120'
        },
        position: {
          title: '岗位',
          value: '摄像'
        },
        tittle: {
          title: '职级',
          value: '普通员工'
        },
        username: {
          title: '登陆名',
          value: '兆良'
        },
        password: {
          title: '密码',
          value: '54SB'
        },
        available: {
          title: '是否空闲',
          value: '是'
        }
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      },
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 100
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleDialogOpen ({ mode }) {
      this.$message({
        message: '打开模态框，模式为：' + mode,
        type: 'success'
      })
    },
    // 普通的新增
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    // 传入自定义模板的新增
    addRowWithNewTemplate () {
      this.$refs.d2Crud.showDialog({
        mode: 'add',
        template: {
          name: {
            title: '姓名',
            value: ''
          },
          value1: {
            title: '新属性1',
            value: ''
          },
          value2: {
            title: '新属性2',
            value: ''
          }
        }
      })
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        })

        // done可以传入一个对象来修改提交的某个字段
        done({
          address: '我是通过done事件传入的数据！'
        })
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      // this.loading = true
      // BusinessTable1List({
      //   ...this.pagination
      // }).then(res => {
      //   this.data = res.list
      //   this.pagination.total = res.page.total
      //   this.loading = false
      // }).catch(err => {
      //   console.log('err', err)
      //   this.loading = false
      // })
    }
  }
}
</script>

<style scoped>
  .el-input {
    width: 200px;
    margin-right: 10px;
  }
</style>

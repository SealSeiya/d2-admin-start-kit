<template>
<d2-container>
  <template slot="header">
    <div class="flex-header">
      <div class="header-title">
        商品列表
      </div>
      <div>
        <el-input v-model="searchWords" placeholder="商品名称" suffix-icon="el-icon-search"></el-input>
        <el-input v-model="searchMinPrice" placeholder="最低价格" suffix-icon="el-icon-caret-bottom"> </el-input>
        <el-input v-model="searchMaxPrice" placeholder="最高价格" suffix-icon="el-icon-caret-top"> </el-input>
        <el-button @click="onSearch"><i class="el-icon-search"></i> 搜索</el-button>
        <el-button type="primary" @click="addRow"><i class="fa fa-plus" aria-hidden="true"></i> 添加商品</el-button>
      </div>
    </div>
  </template>
  <el-card>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="filterProducts.length ? filterProducts : products"
      add-title="添加商品"
      :add-template="addTemplate"
      :rowHandle="rowHandle"
      edit-title="编辑商品信息"
      :edit-template="editTemplate"
      :form-options="formOptions"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"
      @row-add="handleRowAdd"
      @row-edit="handleRowEdit"
      @row-remove="handleRowRemove"
      @dialog-cancel="handleDialogCancel">
    </d2-crud>
  </el-card>
  <template slot="footer">ZAdmin Created By <a href="">@ZBW</a> for D2-admin</template>
</d2-container>
</template>

<script>
// 导入自定义用于显示图片的组件
// import MyImage from './MyImage'

export default {
  data () {
    return {
      searchWords: '',
      searchMinPrice: '',
      searchMaxPrice: '',
      filterProducts: [],
      columns: [
        {
          title: 'ID',
          key: 'id',
          width: '40'
        },
        {
          title: '名称',
          key: 'title'
        },
        {
          title: '价格',
          key: 'price',
          width: '80'
        },
        {
          title: '库存',
          key: 'stock',
          width: '80'
        },
        {
          title: '销量',
          key: 'saleCount',
          width: '80'
        },
        {
          title: '是否上架',
          key: 'isSale',
          component: {
            name: 'el-select',
            options: [
              {
                value: 0,
                label: '否'
              },
              {
                value: 1,
                label: '是'
              }
            ]
          }
        },
        // {
        //   title: '图片',
        //   key: 'imgUrl',
        //   width: '120',
        //   component: {
        //     name: MyImage
        //   }
        // },
        {
          title: '创建时间',
          key: 'createTime'
        }
      ],
      addTemplate: {
        createTime: {
          title: '创建日期',
          value: '2019-06-01',
          component: {
            name: 'el-date-picker',
            span: 12
          }
        },
        isSale: {
          title: '是否上架',
          value: 0,
          component: {
            name: 'el-select',
            options: [
              {
                value: 0,
                label: '否'
              },
              {
                value: 1,
                label: '是'
              }
            ],
            span: 12
          }
        },
        title: {
          title: '名称',
          value: '',
          span: 24
        },
        price: {
          title: '价格',
          value: '',
          span: 24
        }
      },
      rowHandle: {
        columnHeader: '操作',
        edit: {
          icon: 'el-icon-edit',
          text: '编辑',
          size: 'mini',
          show (index, row) {
            if (row.showEditButton) {
              return true
            }
            return false
          },
          disabled (index, row) {
            if (row.forbidEdit) {
              return true
            }
            return false
          }
        },
        remove: {
          icon: 'el-icon-delete',
          size: 'mini',
          text: '删除',
          fixed: 'right',
          confirm: true,
          show (index, row) {
            if (row.showRemoveButton) {
              return true
            }
            return false
          }
        }
      },
      editTemplate: {
        createTime: {
          title: '创建日期',
          component: {
            name: 'el-date-picker',
            span: 12
          }
        },
        isSale: {
          title: '是否上架',
          component: {
            name: 'el-select',
            options: [
              {
                value: 0,
                label: '否'
              },
              {
                value: 1,
                label: '是'
              }
            ],
            span: 12
          }
        },
        title: {
          title: '名称',
          span: 24
        },
        price: {
          title: '价格',
          span: 24
        },
        forbidEdit: {
          title: '禁用按钮',
          value: false,
          component: {
            show: false
          }
        },
        showEditButton: {
          title: '显示按钮',
          value: true,
          component: {
            show: false
          }
        }
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      }
    }
  },
  created () {
    // 调用vuex中方法时，需要加上命名空间 product/product
    this.fetchData()
    this.$store.commit('product/product/getProducts')// 请求全部商品列表
  },
  computed: {
    all_products () {
      // 全部商品列表，用于搜索
      return this.$store.getters['product/product/products']
    },
    products () {
      // 当前分页的商品列表
      // 取 vuex 中数据时，需要加上命名空间 product/product
      return this.$store.getters['product/product/pageProducts']
    },
    loading () {
      return this.$store.getters['product/product/loading']
    },
    pagination () {
      return {
        currentPage: 1,
        pageSize: 5,
        background: true,
        total: this.$store.getters['product/product/total']
      }
    }
  },

  methods: {
    onSearch () {
      this.filterProducts = this.all_products.filter(p => {
        if (this.searchWords) {
          return p.price >= parseFloat(this.searchMinPrice) && p.price <= parseFloat(this.searchMaxPrice) && p.title.includes(this.searchWords)
        } else {
          return p.price >= parseFloat(this.searchMinPrice) && p.price <= parseFloat(this.searchMaxPrice)
        }
      })
      console.log('filterProducts: ', this.filterProducts)
    },
    addRow () {
      // 点击新增后，以“添加”模式打开模态框
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    handleRowAdd (row, done) {
      // 点击确认添加后触发的事件，可以将数据传递到后台，保存至数据库中
      this.formOptions.saveLoading = true
      setTimeout(() => {
        // row 是表单提交的内容
        console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        })

        // done可以传入一个对象来修改提交的某个字段
        done({
          price: '你虽然提交了 但是我能在这修改你显示在页面的内容！'
        })
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleRowEdit ({ index, row }, done) {
      // 点击确认修改后触发的事件，可以将数据传递到后台，保存至数据库中
      // index 是当前编辑行的索引，row 是当前编辑行的数据，done用于控制编辑成功，可以在done()之前加入自己的逻辑代码
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })

        // done可以传入一个对象来修改提交的某个字段
        // done()可以传入包含表单字段的对象来覆盖提交的数据，done(false) 可以取消编辑
        done({
          price: '你虽然在后台修改了价格，但是我能在这控制你在前台显示的内容'
        })
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleRowRemove ({ index, row }, done) {
      // 与编辑类似
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    },
    handleDialogCancel (done) {
      // 关闭模态框执行的事件，并可以自定义执行done函数
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    },
    paginationCurrentChange (currentPage) {
      // 分页页码发生改变触发的事件
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      // 点击分页按钮后，动态请求该页所需的数据
      this.$store.commit('product/product/getPageProducts', { pageSize: this.pagination.pageSize, currentPage: this.pagination.currentPage })
    }
  }
}
</script>

<style scoped>
  .flex-header {
    display: flex;
    justify-content: space-between;
    align-items:center
  }

  .header-title {
    min-width: 4rem;
  }
  .flex-header .el-input {
    width: 200px;
    margin-right: 10px;
  }
</style>

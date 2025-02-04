const Mock = require('mockjs')
const Qs = require('qs')
const Random = Mock.Random

const titleList = ['男士上衣', 'T恤', '衬衫', '牛仔裤', '皮衣', '短裙', '女士衬衫', '长裙', '羽绒服', '秋裤', '军大衣']

const getProductList = function (params) {
  // 获取全部商品列表或者分页商品列表
  let products = []
  for (let i = 0; i < 100; i++) {
    let product = {
      id: i + 1,
      title: titleList[Math.floor(Math.random() * titleList.length)],
      price: Random.float(10, 100).toFixed(2),
      stock: Random.integer(10, 100),
      saleCount: Random.integer(0, 90),
      isSale: Random.integer(0, 1),
      createTime: Random.datetime(),
      imgUrl: Random.dataImage('60x60', 'ZAdmin-' + (i + 1)),
      showEditButton: true,
      showRemoveButton: true
    }
    products.push(product)
  }

  let total = products.length
  if (params.body && products.length) {
    let pageInfo = JSON.parse(Qs.parse(params).body)
    let start = (pageInfo.currentPage - 1) * pageInfo.pageSize
    let end = pageInfo.currentPage * pageInfo.pageSize
    products = products.slice(start, end)
    console.log(`start: ${start}  end: ${end}  products: ${products}  total: ${total}`)
  }

  return { products, total }
}

// 通过post请求，使用参数的token判断是否登录，并通过参数判断获取全部评论列表或者获取分页评论列表
const getProductComments = function (params) {
  let data = JSON.parse(Qs.parse(params).body)
  console.log('api-comments-params: ', data)
  if (!data.token) {
    return {
      status: 401,
      msg: 'token错误，需要登录',
      data: {}
    }
  }

  let comments = []
  for (let i = 0; i < 120; i++) {
    let comment = {
      id: i + 1,
      name: Random.cname(),
      itemScore: Random.integer(1, 5),
      serviceScore: Random.integer(1, 5),
      content: Random.ctitle(10, 50),
      createTime: Random.datetime(),
      showEditButton: true,
      showRemoveButton: true
    }
    comments.push(comment)
  }

  let total = comments.length

  if (data.page) {
    let pageInfo = data.page
    let start = (pageInfo.currentPage - 1) * pageInfo.pageSize
    let end = pageInfo.currentPage * pageInfo.pageSize
    comments = comments.slice(start, end)
    console.log(`currentPage: ${pageInfo.currentPage} start: ${start}  end: ${end}  comments: ${comments}  total: ${total}`)
  }

  return {
    status: 0,
    msg: '成功',
    data: comments,
    total: total
  }
}

// 创建API的URL，让vue通过URL获取数据
Mock.mock('/api/products', 'get', getProductList) // 获取所有商品
Mock.mock('/api/products', 'post', getProductList) // 获取分页商品数据
Mock.mock('/api/productComments', 'post', getProductComments)

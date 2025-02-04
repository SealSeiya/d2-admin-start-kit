import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '用户管理',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '用户 1' },
      { path: '/page2', title: '用户 2' },
      { path: '/all', title: '商品' },
      { path: '/page-demo', title: '新建示例' }
    ]
  },
  {
    title: '设备管理',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '车辆管理' },
      { path: '/page2', title: '用户 2' },
      { path: '/page3', title: '用户 3' },
      { path: '/page-demo', title: '新建示例' }
    ]
  },
  {
    title: '采访申请',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '用户 1' },
      { path: '/page2', title: '用户 2' },
      { path: '/page3', title: '用户 3' },
      { path: '/page-demo', title: '新建示例' }
    ]
  }
])

export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '用户管理',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '页面 1' },
      { path: '/page2', title: '页面 2' },
      { path: '/all', title: '商品' },
      { path: '/page-demo', title: '新建示例' }
    ]
  },
  {
    title: '设备管理',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '车辆管理' },
      { path: '/page2', title: '用户 2' },
      { path: '/page3', title: '用户 3' },
      { path: '/page-demo', title: '新建示例' }
    ]
  },
  {
    title: '采访申请',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '用户 1' },
      { path: '/page2', title: '用户 2' },
      { path: '/page3', title: '用户 3' },
      { path: '/page-demo', title: '新建示例' }
    ]
  }
])

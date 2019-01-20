import axios from 'axios'
// 设置基准路径
const baseUrl = 'http://localhost:3000'
axios.defaults.baseURL = baseUrl
// 设置token
axios.defaults.withCredentials = true
// 设置首页请求
export const login = (pa) => {
  return axios.post('/employee/employeeLogin', pa).then(res => {
    return res
  })
}
// 验证登陆，导航守卫
export const checklogin = () => {
  return axios.get('/employee/checkRootLogin').then(res => {
    return res.data
  })
}
// 退出功能
export const logout = () => {
  return axios.get('/employee/employeeLogout').then(res => {
    return res.data
  })
}
// 用户列表
export const userList = (pa) => {
  return axios.get('/user/queryUser', {params: pa}).then(res => {
    return res.data
  })
}
// 禁用用户
export const updateUser = (pa) => {
  return axios.post('/user/updateUser', pa).then(res => {
    return res.data
  })
}
// 一级分类
export const firstList = (pa) => {
  return axios.get('/category/queryTopCategoryPaging', {params: pa}).then(res => {
    return res.data
  })
}
// 添加分类
export const addtopcategory = (pa) => {
  return axios.post('/category/addTopCategory', pa).then(res => {
    return res.data
  })
}
// 查询二级分类
export const querySecond = (pa) => {
  return axios.get('/category/querySecondCategoryPaging', {params: pa}).then(res => {
    return res.data
  })
}
// 添加品牌
export const addsecondbrand = (pa) => {
  return axios.post('/category/addSecondCategory', pa).then(res => {
    return res.data
  })
}
// 商品管理列表
export const getproductList = (pa) => {
  return axios.get('/product/queryProductDetailList', {params: pa}).then(res => {
    return res.data
  })
}
// 添加商品
export const addProductData = (pa) => {
  return axios.post('/product/addProduct', pa).then(res => {
    return res.data
  })
}

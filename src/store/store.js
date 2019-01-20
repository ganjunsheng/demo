import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 存储数据的对象，我们可以将你需要存储的数据在这个state中定义
const state = {
  options: [],
  activeIndex: '/user',
  userInfo: {}
}
const mutations = {
  // 添加tabs
  add_tabs (state, data) {
    this.state.options.push(data)
  },
  // 删除tabs
  delete_tabs (state, route) {
    let index = 0
    for (let option of state.options) {
      if (option.route === route) {
        break
      }
      index++
    }
    this.state.options.splice(index, 1)
  },
  // 设置当前激活的tab
  set_active_index (state, index) {
    this.state.activeIndex = index
  },
  // 设置详情信息
  save_detail_info (state, info) {
    this.state.userInfo = info
  },
  // 退出清空数组
  loginout (state) {
    this.state.options = []
  }
}
const actions = {
}
const getters = {
}
export default new Vuex.Store({
  // 如果添加了严格模式，那么直接修改state中的数据会报错：Do not mutate vuex store state outside mutation handlers，所以还是需要使用mutations中的函数进行数据的修改
  state,
  getters,
  actions,
  mutations
})

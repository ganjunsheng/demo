<template>
  <div class='login'>
    <div class='container animated flipInY'>
      <img src="./assets/ltlogo.jpg" alt="" class='active'>
      <h2 v-text='msg'></h2>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-loginForm">
        <el-form-item prop="username">
          <el-input prefix-icon=" iconfont icon-custom-user" placeholder="请输入账号" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  type="password" prefix-icon=" iconfont icon-password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='loginbtn' @click="loginEvent('loginForm')" >登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 粒子 -->
    <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="30"
        shapeType="star"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
  </div>
</template>
<script>
import { login } from '@/API/index.js'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      msg: '欢迎使用后台系统'
    }
  },
  methods: {
    loginEvent (formname) {
      // 表单验证
      this.$refs[formname].validate(valid => {
        if (valid) {
          // 登陆
          login(this.loginForm).then(res => {
            console.log(res)
            if (res.data.success === true) {
              this.$message({
                message: '恭喜你,登陆成功',
                type: 'success'
              })
              this.$router.push({name: 'home'})
            } else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.$store.commit('loginout')
  }
}
</script>

<style lang='scss' scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url("./assets/login.jpg");
  background-size: cover;
  .container {
    width: 400px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 15px;
      margin: 100px 50%;
    padding: 0px 40px 15px 40px;
    background: rgba(216, 220, 229, 0.5);
    h2 {
      font-size: 26px;
      text-align: center;
      margin: 0 0 30px;
      font-weight: 500;
      color: #fff;
      letter-spacing: 3px;
    }
    .active {
      position: relative;
      left: 50%;
      transform: translate(-50%, -40%);
      width: 120px;
      height: 120px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .loginbtn {
      width: 100%;
    }
  }
}
</style>

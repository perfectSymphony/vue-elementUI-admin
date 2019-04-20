<template>
    <div class="login-container">
        <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" class="login-form" auto-complete="off" label-position="left">
          <div class="title">perfectSymphony</div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
            <el-input type="text" name="username" v-model="loginForm.username" auto-complete="off" placeholder="username" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <!--监听事件 @keyup.enter本身已经可以实现监听键盘事件，但是这里使用了element的封装的组件，这个时候使用按键修饰符需要加上.native -->
            <el-input :type="pwdType" name="password" v-model="loginForm.password" auto-complete="off" placeholder="password" @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd"> 
            <svg-icon :icon-class="pwdType === 'password' ? 'eye':'eye-open'" />
            </span>
        </el-form-item>
        <el-form-item>
          <!-- vue 里面所有键盘事件都是需要加.native才能生效，如果在当前按钮之前绑定过键盘点击事件，后面的按钮都需要加.native才能生效。prevent是阻止冒泡 -->
            <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin" style="width:100%;">登录</el-button>
        </el-form-item>
        <div class="tips">
          <span style="margin-right: 20px;">username: admin</span>
          <span>password: perfectSymphony</span>
        </div>
        </el-form>        
    </div>   
</template>
<script>

import { isvalidUsername } from '@/utils/validate'

  export default {
    name:'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          return callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else {
          callback();
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: 'perfectSymphony',
        },
        loginRules: {
          username: [
            { required: true, validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ]
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined
      }
    },
    //加载登录页后，直接获取，登录页地址栏的redirect参数，复制给this.redirect
    watch: {
      $route: {
        handler: function(route){
          // console.log(route)
          this.redirect = route.query && route.query.redirect
        },
        immediate: true   //说明加载登录页面时就会执行handle函数
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
              this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true
            //含有异步操作，例如向后台提交数据(dispatch  异步)(commit 同步)
            // this.$store.dispatch('action方法名',值)
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({path: this.redirect || '/' })   // 登陆成功之后重定向到首页
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')    // 登录失败之后，弹出提示信息
            return false
          }
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display:inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0 auto 40px auto;
    text-align:center;
    font-weight:bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>






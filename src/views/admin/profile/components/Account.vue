<template>
  <el-form ref="adminForm" :model="admin" :rules="rules">
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model.trim="admin.realName" />
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio v-model="admin.sex" :label="1">男</el-radio>
      <el-radio v-model="admin.sex" :label="0">女</el-radio>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model.trim="admin.phone" />
    </el-form-item>
    <el-form-item label="邮箱地址" prop="email">
      <el-input v-model.trim="admin.email" />
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input v-model.trim="admin.nickName" />
    </el-form-item>
    <el-form-item label="自我介绍" prop="introduction">
      <el-input v-model.trim="admin.introduction" type="textarea" :rows="6" />
    </el-form-item>
    <el-form-item label="个性签名" prop="signature">
      <el-input v-model.trim="admin.signature" type="textarea" :rows="6" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import beanUtils from '@/utils/beanUtils'
import userApi from '@/api/user'
export default {
  components: { },
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      }
      setTimeout(() => {
      // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
      // 所以在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('手机号码格式不正确'))
          }
        }
      }, 100)
    }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      // 校验规则  对应 prop
      rules: {
        realName: [{ required: true, message: '真实姓名不能为空' }],
        phone: [
          { validator: checkPhone, trigger: 'blur' },
          { required: true, message: '手机号码不能为空' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' },
          { required: true, message: '邮箱地址不能为空' }
        ],
        sex: [{ required: true, message: '性别不能为空' }],
        nickName: [{ required: true, message: '昵称不能为空' }],
        introduction: [{ required: true, message: '自我介绍不能为空' }],
        signature: [{ required: true, message: '个性签名不能为空' }]
      },
      uploadUrl: process.env.VUE_APP_UPLOAD_URL, // 上传图片路径
      admin: {
        realName: '',
        sex: '',
        phone: '',
        email: '',
        nickName: '',
        introduction: '',
        signature: ''
      }
    }
  },

  computed: {
    ...mapGetters([
      'adminInfo'
    ])
  },
  created() {
    beanUtils.copyProperties(this.adminInfo, this.admin)
  },
  methods: {
    submit() {
      this.$refs.adminForm.validate((valid) => {
        if (valid) {
          userApi.updateAdminInfo(this.admin).then(res => {
            if (res.code === 0) {
              this.$store.dispatch('user/getAdminInfo')
              this.$message.success(res.msg)
              // 刷新页面
              setTimeout(() => {
                this.$router.go(0)
              }, 1000)
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  }

}
</script>

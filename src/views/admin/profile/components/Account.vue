<template>
  <el-form>

    <el-form-item label="真实姓名">
      <el-input v-model.trim="admin.realName" />
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model.trim="admin.sex" />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model.trim="admin.phone" />
    </el-form-item>
    <el-form-item label="邮箱地址">
      <el-input v-model.trim="admin.email" />
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model.trim="admin.nickName" />
    </el-form-item>
    <el-form-item label="自我介绍">
      <el-input
        v-model.trim="admin.introduction"
        type="textarea"
        :rows="6"
      />
    </el-form-item>
    <el-form-item label="个性签名">
      <el-input
        v-model.trim="admin.signature"
        type="textarea"
        :rows="6"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
    </el-form-ite></el-form>
</template>

<script>
export default {
  components: { },
  props: {
    admin: {
      type: Object,
      default: () => {
        return {
          realName: '',
          sex: '',
          phone: '',
          email: '',
          avatar: '',
          nickName: '',
          introduction: '',
          signature: ''
        }
      }
    }
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_UPLOAD_URL // 上传图片路径
    }
  },
  methods: {
    submit() {
      this.$message({
        message: '用户信息已成功更新',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>

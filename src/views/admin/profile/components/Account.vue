<template>
  <el-form>

    <el-form-item label="真实姓名">
      <el-input v-model.trim="adminInfo.realName" />
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model.trim="adminInfo.sex" />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model.trim="adminInfo.phone" />
    </el-form-item>
    <el-form-item label="邮箱地址">
      <el-input v-model.trim="adminInfo.email" />
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model.trim="adminInfo.nickName" />
    </el-form-item>
    <el-form-item label="自我介绍">
      <el-input
        v-model.trim="adminInfo.introduction"
        type="textarea"
        :rows="6"
      />
    </el-form-item>
    <el-form-item label="个性签名">
      <el-input
        v-model.trim="adminInfo.signature"
        type="textarea"
        :rows="6"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: { },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_UPLOAD_URL // 上传图片路径
    }
  },
  computed: {
    ...mapGetters([
      'adminInfo'
    ])
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

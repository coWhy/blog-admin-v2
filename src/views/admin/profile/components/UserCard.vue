<template>
  <div>
    <el-card style="margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span><i class="fa fa-id-card" aria-hidden="true" />&nbsp&nbsp关于我的</span>
      </div>
      <div class="user-profile">
        <div class="box-center">
          <pan-thumb :image="adminInfo.avatar" :height="'120px'" :width="'120px'" :hoverable="false">
            <div>管理员</div>
          </pan-thumb>
        </div>
        <!-- 更换头像组件 -->
        <div class="box-center">
          <el-button type="primary" icon="el-icon-upload" size="mini" @click="imagecropperShow=true">更换头像</el-button>
        </div>
        <div class="box-center">
          <div class="user-name text-center">{{ adminInfo.nickName }}</div>
          <div class="user-role text-center text-muted">管理员</div>
        </div>
      </div>
    </el-card>
    <el-card class="admin-info">
      <div slot="header" class="clearfix">
        <div class="sub-info">
          <span><i class="fa  fa-info" aria-hidden="true" />&nbsp&nbsp自我介绍</span>
          <div class="user-bio-section-body">
            <div class="text-muted">
              {{ adminInfo.introduction }}
            </div>
          </div>
        </div>
        <div class="sub-info">
          <span><i class="fa  fa-pencil-square-o" aria-hidden="true" />&nbsp&nbsp个性签名</span>
          <div class="user-bio-section-body">
            <div class="text-muted">
              {{ adminInfo.signature }}
            </div>
          </div>
        </div>
        <div class="sub-info">
          <span><i class="fa  fa-phone" aria-hidden="true" />&nbsp&nbsp手机号</span>
          <div class="user-bio-section-body">
            <div class="text-muted">
              {{ adminInfo.phone }}
            </div>
          </div>
        </div>
        <div class="sub-info">
          <span><i class="fa  fa-envelope-o" aria-hidden="true" />&nbsp&nbsp邮箱地址</span>
          <div class="user-bio-section-body">
            <div class="text-muted">
              {{ adminInfo.email }}
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="100"
      :height="100"
      :url="uploadUrl"
      field="file"
      :no-square="true"
      :no-circle="true"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropUploadSuccess"
    />
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import ImageCropper from '@/components/ImageCropper'
import userApi from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  components: { PanThumb, ImageCropper },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_UPLOAD_URL,
      imagecropperShow: false,
      imagecropperKey: 0
    }
  },
  computed: {
    ...mapGetters([
      'adminInfo'
    ])
  },
  methods: {
    // 上传头像
    async  cropUploadSuccess(res, field) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      // 更新头像 传入后台
      const { code, msg } = await userApi.changeAdminAvatar(res)
      if (code === 0) {
        this.$store.dispatch('user/getAdminInfo')
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
  margin-top: 10px;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }
 .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }
}
 .admin-info{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .sub-info{
      margin-top: 15px;
    }
  }
</style>

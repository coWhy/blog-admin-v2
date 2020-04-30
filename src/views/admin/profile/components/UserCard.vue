<template>
  <div>
    <el-card style="margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span><i class="fa fa-id-card" aria-hidden="true" />&nbsp&nbsp关于我的</span>
      </div>
      <div class="user-profile">
        <div class="box-center">
          <pan-thumb :image="admin.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
            <div>管理员</div>
          </pan-thumb>
        </div>
        <div class="box-center">
          <div class="user-name text-center">{{ admin.nickName }}</div>
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
              {{ admin.introduction }}
            </div>
          </div>
        </div>
        <div class="sub-info">
          <span><i class="fa  fa-pencil-square-o" aria-hidden="true" />&nbsp&nbsp个性签名</span>
          <div class="user-bio-section-body">
            <div class="text-muted">
              {{ admin.signature }}
            </div>
          </div>
        </div>
        <div class="sub-info">
          <span><i class="fa  fa-phone" aria-hidden="true" />&nbsp&nbsp手机号</span>
          <div class="user-bio-section-body">
            <div class="text-muted">
              {{ admin.phone }}
            </div>
          </div>
        </div>
        <div class="sub-info">
          <span><i class="fa  fa-envelope-o"" aria-hidden="true" />&nbsp&nbsp邮箱地址</span>
          <div class="user-bio-section-body">
            <div class="text-muted">
              {{ admin.email }}
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    admin: {
      type: Object,
      default: () => {
        return {
          realName: '',
          lastLoginAt: '',
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

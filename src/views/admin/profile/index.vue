<template>
  <div class="app-container">
    <div v-if="admin">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :admin="admin" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="友情链接" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="修改个人信息" name="account">
                <account :admin="admin" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'
import Activity from './components/Activity'
export default {
  name: 'Profile',
  components: { UserCard, Account, Activity },
  data() {
    return {
      admin: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'adminInfo'
    ])
  },
  created() {
    this.getAdmin()
  },
  methods: {
    /**
     * 获取vuex中的 管理员信息
     */
    getAdmin() {
      this.admin = {
        realName: this.adminInfo.realName,
        lastLoginAt: this.adminInfo.lastLoginAt,
        sex: this.adminInfo.sex,
        phone: this.adminInfo.phone,
        email: this.adminInfo.email,
        avatar: this.adminInfo.avatar,
        nickName: this.adminInfo.nickName,
        introduction: this.adminInfo.introduction,
        signature: this.adminInfo.signature
      }
    }
  }
}
</script>

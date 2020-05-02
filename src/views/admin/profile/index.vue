<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="友情链接" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="修改个人信息" name="account">
                <account />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import UserCard from './components/UserCard'
import Account from './components/Account'
import Activity from './components/Activity'
export default {
  name: 'Profile',
  components: { UserCard, Account, Activity },
  data() {
    return {
      activeTab: 'activity'
    }
  }
}
</script>

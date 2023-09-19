<template>
  <div>
    <el-container>
      <el-header>
        <p>公司Logo</p>
        <p>后台管理系统</p>
        <el-button type="info" @click="goout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu active-text-color="#03f8f8" background-color="#333745" class="el-menu-vertical-demo" :default-active="route.path"
            text-color="#fff" router>
            <el-menu-item style="margin: 0 auto;">
              <el-icon>
                <location />
              </el-icon>
            </el-menu-item>
            <el-sub-menu :index="item.path" v-for="item, index in menus" :key="index">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="ite.path" v-for="ite in menus[index]?.children" :key="ite.id">{{ ite.authName
                }}</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { menusApi } from "@/utils/api"
import { Location } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus"
import {useRouter,useRoute } from "vue-router"
const router=useRouter()
const route=useRoute()
const goout = () => {
  localStorage.removeItem("token")
  router.push('/login')
  ElMessage({
    message: '退出登录成功',
    type: 'success',
  })
}
const menus = ref([])
const menusList = () => {
  menusApi({}).then(res => {
    console.log(res, '菜单');
    menus.value = res.data.data
  })
}
menusList()
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373d41;
  color: #fff;
}

.el-main {
  margin: 0;
  padding: 0;
}

.el-aside {
  height: 95vh;
  background-color: #333745;
}</style>
<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-aside width="260px">
          <el-menu
            :default-active="$route.path"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-menu-item index="/project">
              <i class="el-icon-document"></i>
              <span slot="title">项目管理</span>
            </el-menu-item>
            <el-menu-item index="/user">
              <i class="el-icon-setting"></i>
              <span slot="title">个人管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  height: 100%;

  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-menu {
    border-right-width: 0;
  }
  .el-menu-item {
    i {
      color: #fff;
    }
    &.is-active i {
      color: #ffd04b;
    }
  }
}
</style>

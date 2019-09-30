<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted () {
    this.$axios.get('/user').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    const rd = Math.floor(Math.random() * 100)
    this.$axios.post('/project/add', {
      name: `abc菜鸟测试${rd}`,
      desc: `我是描述测试数据${rd}`,
      uids: '1,2,3'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    this.$axios.get('/project?uid=1').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    this.$axios.get('/mould').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    this.$axios.get('/record').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

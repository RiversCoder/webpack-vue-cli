<template>
  <div id="app">
      <Header></Header>
      <img :src="require('@/assets/logo.jpg')" />
      <span>{{msg}}</span>
      <p class="test">Test Text</p>
  </div>
</template>


<script scoped>
    import Header from './components/header.vue'
    import $ from 'jquery'

    export default {
        name: 'App',
        data(){
            return {
                msg: 'Vue Webpack Logo Text 123'
            } 
        },
        created(){
            console.log($)
        },
        mounted(){},
        components: {
            Header
        }
    }
</script>

<style scoped lang="less">
    #app{
        img { width:100px; height:100px; }
        .test{
            color:red; 
        }
    }
</style>
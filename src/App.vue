<template>
  <div id="app">
      <img :src="require('@/assets/logo.jpg')" />
      <span>{{msg}}</span>
      <p class="test">Test Text</p>
  </div>
</template>


<script scoped>

export default {
    name: 'App',
    data(){
        return {
            msg: 'Vue Webpack Logo'
        } 
    },
    created(){},
    mounted(){},
    components: {}
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
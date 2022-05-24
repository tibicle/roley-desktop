<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'roley',
    mounted() {
      console.log('mounted');
      this.$electron.ipcRenderer.on('deep-link-url', (event, arg) => {
        console.log('received');
        console.log(event);
        console.log(arg);
        this.$router.push({ name: 'dee[link' })
      });
    }
  } 
</script>

<style lang="scss">
  /* CSS */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
  }
  html,body{
    width: 100%;
    height: 100%;
    overflow:hidden;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  .typography{
    background-color: rgb(176, 187, 30);
    .text-theme-color-green {
        color: #066148; 
    }
}
</style>

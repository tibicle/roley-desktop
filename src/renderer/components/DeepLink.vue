<template>
    <div class="main-outer display-flex">
      This is DeepLink
    </div>
</template>

<script>
    import sidebar from './custompage/sidebar'
    import pageTitle from './custompage/title'
    import pagefooter from './custompage/pagefooter'
    import vuejstree from './custompage/vuejstree'
    import { remote } from 'electron'

    export default {
      name: 'deepLink',
      components: { sidebar, pageTitle, vuejstree, pagefooter },
      methods: {
        open (link) {
          this.$electron.shell.openExternal(link)
        },
        fullScreen() {
          var win = remote.BrowserWindow.getFocusedWindow();
          win.setFullScreen(!win.isFullScreen());
        },
        closeWindow() {
          var win = remote.BrowserWindow.getFocusedWindow();
          win.close();
        },
        minimizeWindow() {
          var win = remote.BrowserWindow.getFocusedWindow();
          win.minimize();
        }
      },
      mounted() {
        console.log('deep link mounted');
        this.$electron.ipcRenderer.on('deep-link-url', (event,arg) => {
            console.log('received');
            console.log(event);
            console.log(arg);
        });
      }
    }
</script>

<style >
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { 
    -webkit-app-region: drag;
    font-family: 'Source Sans Pro', sans-serif; 
  }

.main-outer{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-user-drag: element;
}
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
.title-bar{
  -webkit-user-drag: element;
  text-align: center;
  background: #066148;
  color: #fff;
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
.title-bar h2{
  color: #fff;
  font-size:18px;
  line-height: 22px;
  margin: 8px 0;
}
.page-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
.page-content .content{
    width: calc(100% - 395px);
}
.footer{
  background-color: #EEF0F3;
}
.header{
  display: flex;
  justify-content: flex-end;
  padding: 25px 0;
  background: #FFFFFF;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.15);
}
.screen-btn{
  position: fixed;
  left: 12px;
  top: 12px;
}
.screen-btn ul {
  display: flex;
  list-style: none;
}
.screen-btn ul li{
  margin-right: 8px;
}
.screen-btn ul li a{
  width: 12px;
  height: 12px;
  border: 1px solid transparent;
  border-radius: 50%;
  display: block;
}
.screen-btn ul li a.minimize{
  background: #ED6A5E;
}
.screen-btn ul li a.maximize{
  background: #F4BD50;
}
.screen-btn ul li a.close-screen{
  background: #61C454;
}
</style>

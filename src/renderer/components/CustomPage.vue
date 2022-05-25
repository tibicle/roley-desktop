<template>
    <div class="main-outer display-flex">
      <div class="title-bar">
        <!-- <div class="screen-btn">
          <ul>
            <li>
              <a @click="closeWindow" class="minimize">

              </a>
            </li>
            <li>
              <a @click="minimizeWindow" class="maximize">

              </a>
            </li>
            <li>
              <a @click="fullScreen" class="close-screen" id="closeBtn">

              </a>
            </li>
          </ul>
        </div> -->
        <h2>Roley</h2>
      </div>
      <div class="page-content">
        <div class="sidebar">
            <sidebar></sidebar>
        </div>
        <div class="content">
          <div class="header">
            <pageTitle></pageTitle>
          </div>
          <div class="page-content">
            <pagecontent></pagecontent>
            <vuejstree></vuejstree>
          </div>
          <deepLink></deepLink>
        </div>
      </div>
        <div class="footer">
          <a href="javascript:void(0)"  @click="send">HIHIIHIH</a>
          
          <pagefooter></pagefooter>
        </div>
    </div>
</template>

<script>
    import sidebar from './custompage/sidebar'
    import pageTitle from './custompage/title'
    import pagecontent from './custompage/pagecontent'
    import pagefooter from './custompage/pagefooter'
    import vuejstree from './custompage/vuejstree'
    import deepLink from './DeepLink';
    import { remote } from 'electron'
    export default {
      name: 'custompage',
      components: { sidebar, pageTitle, pagecontent, vuejstree, pagefooter, deepLink },
      methods: {
        send () {
          console.log('sending called');
          this.$electron.ipcRenderer.send('deep-link-url', {
            data: "sending from app.vue"
          });
        },
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
        console.log('c mounted');
        
      }
    }
</script>

<style>
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
  -webkit-app-region: drag;
}
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
.title-bar{
  -webkit-user-drag: element;
  -webkit-app-region: drag;
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

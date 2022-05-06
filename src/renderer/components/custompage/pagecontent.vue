<template>
    <div class="typography">
    <h2>Typography (font-size: 50px)</h2>

    <h3>Font Family : Inter</h3>

    <h4 class="heading"> Heading (Good Morning) : 24px</h4>
    <h4 class="sub-heading-1"> Heading : 18px</h4>
    <h4 class="sub-heading-2"> Heading : 14px</h4>

    <p>Description : 12px</p>
</div>
</template>
  
  <script>
      export default {
        name: 'pagecontent',

        methods: {
        open (link) {
            this.$electron.shell.openExternal(link)
        }
        }
    }
  </script>
  
  <style>
      .typography{
          margin: 50px;
      }
      h2{
          text-transform: capitalize;
          font-size: 50px;
          color: #066148;
          font-weight: 700;
      }
      .heading{
          font-size: 24px;
      }
      .sub-heading-1{
          font-size: 18px;
      }
      .sub-heading-2{
          font-size: 14px;
      }
      p{
          font-size: 12px;
      }
      h2,h3,h4,h5,h6{
      margin-bottom:20px;}
  </style>
  
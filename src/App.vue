<template lang="pug">
  #app
    header.header
      nav.inner
        a.github Built with Vue.js
    transition(name="fade", mode="out-in")
      router-view
</template>

<style lang="scss">
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 15px;
    background-color: lighten(#eceef1, 30%);
    margin: 0;
    color: #34495e;
    overflow-y: scroll;
  }
  
  a {
    color: #34495e;
    text-decoration: none;
  }
  
  .header {
    background-color: #ff6600;
    z-index: 999;
    height: 55px;
    top: 0;
    left: 0;
    right: 0;
  }
  .header .inner {
    max-width: 800px;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 15px 5px;
  }
  
  .header a {
    color: rgba(255, 255, 255, .8);
    line-height: 24px;
    transition: color .15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: .075em;
    margin-right: 1.8em;
  }
  .header a:hover {
    color: #fff;
  }
  
  .header a .router-link-active {
    color: #fff;
    font-weight: 400;
  }
  .header a:nth-child(6) {
    margin-right: 0;
  }
  .header .github {
    color: #fff;
    font-size: .9em;
    margin: 0;
    float: right;
  }
  .logo {
    width: 24px;
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle;
  }
  
  .view {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease;
  }
  
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  
</style>

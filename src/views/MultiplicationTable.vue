<template>
    <div class="home">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <HelloWorldcopy msg="1단계 구구단입니다"/>

    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import HelloWorldcopy from '@/components/HelloWorldcopy.vue'

  export default {
    name: 'HomeViewcopy',
    components: {
        HelloWorldcopy,

    }
  }
  </script>
  
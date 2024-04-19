<template>
    <div class="home">
    
        <ComRockPaper msg="5단계 가위바위보 게임입니다."/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import ComRockPaper from '@/components/ComRockPaper.vue'

  export default {
    name: 'LastWord',
    components: {
        ComRockPaper,

    }
  }
  </script>
  
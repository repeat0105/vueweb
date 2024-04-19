<template>
    <div class="home">

      <ComReactionSpeed msg="4단계 반응속도 게임입니다."/>

    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import ComReactionSpeed from '@/components/ComReactionSpeed.vue'

  export default {
    name: 'ReactionSpeed',
    components: {
        ComReactionSpeed,

    }
  }
  </script>
  
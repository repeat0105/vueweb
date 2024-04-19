<template>
  <div class="homestart">
    
    <HelloWorld msg="WEB GAME BOARD"/>
    <BoardView />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import BoardView from "./BoardView.vue";

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    BoardView,

  }
}
</script>

<style lang="scss" scoped>

</style>
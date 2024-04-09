<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/multiplication">multiplication</router-link> |
    <router-link to="/LastWord">LastWord</router-link> |
    <router-link to="/baseball">baseball</router-link> |
    <router-link to="/reactionspeed">reactionspeed</router-link> |
    <router-link to="/rockpaper">RockPaper</router-link> |
    <router-link to="/lottonums">lottonums</router-link> |
    <router-link to="/tictactoe">TicTacToe</router-link> |
    <router-link to="/minesweeper">minesweeper</router-link> |
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

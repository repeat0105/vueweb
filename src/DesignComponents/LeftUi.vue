<template>
  <div class="hello">
    <div class="topgameui">
      <div class="gameui" v-for="(item, idx) in data" :key="idx">
        <div @click="$emit('parent', item.gameid)">
          <img alt="Vue logo" src="../assets/image2.png">
          <div>
            <p>{{ item.gameid }}번째 게임입니다.</p>
            <p>{{ item.gametitle }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gamedata from "../views/data.json";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      data: gamedata,
    
    };
  },
  methods: {
   
  },
};
</script>

<style scoped lang="scss">

a {
  color: #42b983;
  &:hover {
    color: #333;
  }
}

.topgameui {
  display: flex;
  
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  margin: 0 auto;
  max-width: 80%;
  width:400px;
  
}

.gameui {
  
  border: 1px solid #ddd;
  border-radius: 15px;
  width: 250px;
  height: 95px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #D9D9D9;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0.5px 15px rgba(0, 0, 0, 0.1);
  }

  >div:nth-of-type(1) {
    display: flex;
    text-decoration: none;
    color: #42b983;
    text-align: center;
    gap:20px;
    >div:nth-of-type(1) {
      text-align: justify;
    }
    &:hover {
      color: #333;
    }
  }
  p {
    font-size: 16px;
    margin: 5px 0;
  }
}
</style>

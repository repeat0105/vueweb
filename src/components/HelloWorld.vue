<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      지금부터 게임을 시작한다. 앞으로 아주 즐... 거울꺼야 아주 재....
      미있을꺼야
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>

    <article class="topgameui">
      <div class="gameui" v-for="(item, idx) in data" :key="idx">
        <router-link :to="item.gameURL">
          <p>{{ item.gameid }}번째 게임입니다.</p>
          <p>{{ item.gametitle }}</p>
        </router-link>
      </div>
    </article>
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
h1 {
  text-align: center;
  color: #333;
}
p {
  color: #666;
  line-height: 1.5;
}
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
}

.gameui {
  border: 1px solid #ddd;
  border-radius: 15px;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0.5px 15px rgba(0, 0, 0, 0.1);
  }

  > a {
    text-decoration: none;
    color: #42b983;
    text-align: center;

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

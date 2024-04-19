<template>
  <div class="hello">
    <div>
      <img alt="Vue logo" src="../assets/image1.png">
      <h1>{{ msg }}</h1>
    </div>
    <p>
      WEB GAME을 사용 할 수 있고 WEB GAME의 타이틀을 적고 리뷰를 등록하고 리뷰의 댓글을 쓸 수 있습니다.
    </p>

    <article class="topgameui">
      <div class="gameui" v-for="(item, idx) in data" :key="idx">
        <router-link :to="item.gameURL">
          <img alt="Vue logo" src="../assets/image2.png">
          <div>
            <p>{{ item.gameid }}번째 게임입니다.</p>
            <p>{{ item.gametitle }}</p>
          </div>
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
.hello {
  >div:nth-of-type(1) {
    
    >h1:nth-of-type(1) {
      display: inline-block;
      padding-left: 30px;
      vertical-align: super;
      text-align: center;
      color: #333;
    }
  }
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
  width: 250px;
  height: 95px;
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

<template>
  <div class="hello">
    <div class="topgameui">
      <div class="gameui" v-for="(item, idx) in data" :key="idx">
        <div @click="$emit('parent', item.gameid)">
          <img alt="Vue logo" :src="gameimgcom[idx].gameimg" width="48px" height="57">
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
import img1 from '../assets/image2.png'
import img2 from '../assets/image3.png';
import img3 from '../assets/image4.png';
import img4 from '../assets/image5.png';
import img5 from '../assets/image6.png';
import img6 from '../assets/image7.png';
import img7 from '../assets/image8.png';
import img8 from '../assets/image9.png';



export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      data: gamedata,
      gameimgcom: [
        {
          gameimg:img1,
        },
        {
          gameimg:img2,
        },
        {
          gameimg:img3,
        },
        {
          gameimg:img4,
        },
        {
          gameimg:img5,
        },
        {
          gameimg:img6,
        },
        {
          gameimg:img7,
        },
        {
          gameimg:img8,
        }
      ]
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
  cursor: pointer;
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
    >img:nth-of-type(1) {
      object-fit: cover;
      border-radius: 15px;
    }
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

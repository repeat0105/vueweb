<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ipsam
      tempora reiciendis facilis doloribus totam deleniti distinctio saepe sint!
      Voluptate eveniet totam molestias error, facilis quam quas delectus
      commodi temporibus?
    </p>
  </div>
  <div>
    <div>당첨 숫자</div>
    <div id="fullstack">
      <transition-group name="ball">
        <LottoBall
          v-for="ball in winBalls"
          :key="ball"
          :number="ball"
        ></LottoBall>
      </transition-group>
    </div>
    <div>보너스</div>
    <transition name="bonus">
      <LottoBall v-if="bonus" :number="bonus"></LottoBall>
    </transition>
    <button v-if="redo" @click="onClickRedo">한 번 더!</button>
  </div>
</template>

<script>
import LottoBall from "../componentscom/LottoBall.vue";

function getWinNumbers() {
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];

  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }

  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const timeouts = [];
export default {
  name: "LottoNums",
  props: {
    msg: String,
  },
  components: {
    LottoBall,
  },
  data() {
    return {
      winNumbers:
        JSON.parse(localStorage.getItem("winNumbers")) || getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    };
  },
  methods: {
    onClickRedo() {
      this.winNumbers = getWinNumbers();
      localStorage.setItem("winNumbers", JSON.stringify(this.winNumbers));
      this.winBalls = [];
      this.bonus = null;
      this.redo = false;
      this.showBalls();
    },
    showBalls() {
      for (let i = 0; i < this.winNumbers.length - 1; i++) {
        timeouts[i] = setTimeout(() => {
          this.winBalls.push(this.winNumbers[i]);
        }, (i + 1) * 1000);
      }
      timeouts[6] = setTimeout(() => {
        this.bonus = this.winNumbers[6];
        this.redo = true;
      }, 7000);
    },
  },
  mounted() {
    this.showBalls();
  },

};
</script>

<style scoped lang="scss">
.hello {
  text-align: center;
  h1 {
    color: #333;
  }
  p {
    color: #666;
    font-size: 16px;
  }
}
#fullstack {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
div {
  text-align: center;
  & > div:first-child {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #5c6bc0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3f51b5;
  }
}

.ball-enter-active,
.ball-leave-active {
  transition: transform 0.5s ease, opacity 0.5s;
}
.ball-enter,
.ball-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.bonus-enter-active,
.bonus-leave-active {
  transition: transform 0.5s ease, opacity 0.5s;
}
.bonus-enter,
.bonus-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.ball,
.bonus {
  display: inline-block;
  border: 2px solid #ddd;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  margin: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
}
</style>

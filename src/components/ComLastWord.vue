<template>
  <div class="game-container">
    <h1>{{ msg }}</h1>
    <div class="timer">남은 시간: {{ timeLeft }}초</div>
    <p class="game-instruction">바꿀 예정</p>
    <div class="game-play">
      <div class="current-word">{{ word }}</div>
      <form v-on:submit="onSubmitForm" class="input-form">
        <input
          type="text"
          ref="answer"
          v-model="value"
          class="input-field"
          placeholder="다음 단어를 입력하세요"
        />
        <button type="submit" class="submit-button">입력</button>
      </form>
      <div class="result">{{ result }}</div>
    </div>
    <div v-if="gameOver" class="game-over">게임 오버!</div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      word: "끝단어",
      result: "",
      value: "",
      timeLeft: 10,
      timer: null,
      gameOver: false,
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    onSubmitForm(e) {
      e.preventDefault();
      if (this.gameOver) return;

      if (this.word[this.word.length - 1] === this.value[0]) {
        this.result = "딩동댕";
        this.word = this.value;
        this.resetTimer();
      } else {
        this.result = "땡";
      }
      this.value = "";
      this.$refs.answer.focus();
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1;
        } else {
          this.gameOver = true;
          this.stopTimer();
        }
      }, 1000);
    },
    resetTimer() {
      this.stopTimer();
      this.timeLeft = 10;
      this.startTimer();
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.game-instruction,
.current-word,
.result {
  text-align: center;
  margin: 10px 0;
}

.input-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input-field {
  padding: 10px;
  border: 2px solid #42b983;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: #66d9ef;
  }
}

.submit-button {
  padding: 10px 20px;
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #66d9ef;
  }
}

.result {
  font-size: 20px;
  color: #e74c3c;
}

.game-over {
  color: #e74c3c;
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
}
</style>

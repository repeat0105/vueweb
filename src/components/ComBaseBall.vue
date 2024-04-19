<template>
  <div>
    <h1>{{ msg }}</h1>
    <article class="texttt">
      <p>4개의 숫자 와 위치를 동시에 맞추는 게임</p>
      <p>4개의 숫자 와 위치가 맞으면 4스트라이크로 홈런이다</p>
      <p>4개의 숫자 와 위치가 틀리면 4볼이다.</p>
      <p>1. 4개의 숫자를 입력한다.</p>
      <p>2. ex 0s 2b 라면 4개의 숫자 중 2개의 숫자가 정답숫자에 포함되어있다</p>
    </article>
    <div>
      <h1>{{ result }}</h1>
      <form @submit.prevent="onSubmitForm">
        <input
          ref="answer"
          minlength="4"
          maxlength="4"
          v-model="value"
          placeholder="4개의 숫자입력"
        />
        <button type="submit">입력</button>
      </form>
      <div>시도: {{ tries.length }} 회</div>
      <ul>
        <li v-for="(t, idx) in tries" :key="t.try">
          <div>{{ idx + 1 }} 번째 {{ t.try }}</div>
          <div>{{ t.result }}</div>
        </li>
      </ul>
      <!-- <h3>{{ this.answer }}</h3> -->
    </div>
  </div>
</template>

<script>
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};



export default {
  props: {
    msg: String,
  },
  data() {
    return {
      answer: getNumbers(), 
      tries: [],
      value: "", 
      result: "", 
    };
  },
  methods: {
    onSubmitForm() {
     
      if (this.value === this.answer.join("")) {
        // 정답 맞췄으면
        this.tries.push({
          try: this.value,
          result: "홈런",
        });
        
        this.result = this.tries.length + "번째에서 홈런";
        alert("게임을 다시 실행합니다.");
        this.value = "";
        this.answer = getNumbers();
        this.tries = [];
        this.$refs.answer.focus();
      } else {
        // 정답 틀렸을 때
        if (this.tries.length >= 9) {
          // 10번째 시도
          this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(
            ","
          )}였습니다!`;
          alert("게임을 다시 시작합니다. 성공하고 넘어가 주세요");
          this.value = "";
          this.answer = getNumbers();
          this.tries = [];
          this.$refs.answer.focus();
        }
        let strike = 0;
        let ball = 0;

        const answerArray = this.value.split("").map((v) => parseInt(v));
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.answer[i]) {
            // 숫자 자릿수 모두 정답
            strike++;
          } else if (this.answer.includes(answerArray[i])) {
            // 숫자만 정답
            ball++;
          }
        }
        this.tries.push({
          try: this.value,
          result: `${strike} 스트라이크, ${ball} 볼입니다.`,
        });
        this.value = "";
        this.$refs.answer.focus();
      }
    },
  },
};
</script>

<style lang="scss" scoped>

 .texttt {
  line-height: 15px;
  font-weight: 600;
  text-align: left;
 }

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Arial", sans-serif;
}

h1,
h3 {
  color: #34495e;
}

input {
  padding: 10px;
  margin-top: 20px;
  font-size: 16px;
  border: 2px solid #bdc3c7;
  border-radius: 5px;
  outline: none;
  width: 200px;
  text-align: center;

  &:focus {
    border-color: #3498db;
  }
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-top: 10px;
}

.try-result {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
}

.try {
  color: #7f8c8d;
}

.result {
  font-weight: bold;
}

.game-info {
  text-align: center;
  margin-top: 20px;
}
</style>

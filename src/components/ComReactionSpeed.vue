<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
  <div class="reaction">
    <b>성인의 평균 반응 시간은 200~250밀리초로 매우 빠릅니다.</b>
    <b>프로게이머 평균은 150ms! 비결은 많이 하면됩니다.</b>
    <div id="screen" :class="state" @click="onClickScreen">{{ message }}</div>
    <template v-if="result.length">
      <div>반응 시간: {{ average }}ms</div>
      <button @click="onReset">리셋</button>
    </template>
    <div>
      <p>{{ count }}회</p>
    </div>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      result: [],
      state: "waiting",
      message: "클릭해서 시작하세요.",
      count: 0,
    };
  },
  computed: {
    average() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
    },
  },
  methods: {
    onReset() {
      this.result = [];
      this.count = 0;
    },
    onClickScreen() {
      if (this.state === "waiting") {
        this.state = "ready";
        this.message = "초록색이 되면 클릭하세요";
        timeout = setTimeout(() => {
          this.state = "now";
          this.message = "지금클릭!";
          startTime = new Date();
        }, Math.floor(Math.random() * 3000) + 1000); //1~3초
        
      } else if (this.state === "ready") {
        clearTimeout(timeout);
        this.state = "waiting";
        this.message = "너무 성급하시군요! 초록색이 된 후에 클릭하세요";
      } else if (this.state === "now") {
        endTime = new Date();
        this.state = "waiting";
        this.message = "클릭해서 시작하세요.";
        this.result.push(endTime - startTime);
        this.count++;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reaction {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px solid #7f8c8d;
  border-radius: 15px;
  margin: auto;
  margin-top: 50px;
  max-width: 600px;
  background-color: #ecf0f1;

  > b {
    font-size: 18px;
    padding: 10px;
    text-align: center;
    color: #2c3e50;
  }
}

#screen {
  width: 100%;
  max-width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
  border: none;
  border-radius: 15px;


  &.waiting {
    background-color: #3498db;
    color: #ecf0f1;
  }
  &.ready {
    background-color: #e74c3c;
    color: #ecf0f1;
  }
  &.now {
    background-color: #2ecc71;
    color: #ecf0f1;
  }
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: #ecf0f1;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
}

p {
  font-size: 20px;
  color: #34495e;
}
</style>

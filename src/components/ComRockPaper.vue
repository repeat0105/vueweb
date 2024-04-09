<template>
  <div>
    <div id="computer" :style="computedStyleObject"></div>
    <div>
      <button class="game-button" @click="onClickButton('바위')">바위</button>
      <button class="game-button" @click="onClickButton('가위')">가위</button>
      <button class="game-button" @click="onClickButton('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 점수: {{ score }}점</div>
    <div id="scoreboard">
      <h3>점수판</h3>
      <p>승: {{ gameScores.win }}</p>
      <p>패: {{ gameScores.lose }}</p>
      <p>무: {{ gameScores.draw }}</p>
    </div>
    <div id="history">
      <h3>게임 히스토리</h3>
      <ul>
        <li v-for="(item, index) in history" :key="index">
          라운드 {{ index + 1 }}: 나는 {{ item.myChoice }}, 컴퓨터는
          {{ item.computerChoice }}, 결과는 {{ item.result }}.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const score = ref(0);
const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

let interval = null;

const imgCoord = ref(rspCoords.바위);
const result = ref("");
const gameScores = ref({
  win: 0,
  lose: 0,
  draw: 0,
});
const history = ref([]);

const computedStyleObject = computed(() => {
  return {
    background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord.value} 0`,
  };
});

function computerChoice(imgCoord) {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
}

function changeHand() {
  interval = setInterval(() => {
    if (imgCoord.value === rspCoords.바위) {
      imgCoord.value = rspCoords.가위;
    } else if (imgCoord.value === rspCoords.가위) {
      imgCoord.value = rspCoords.보;
    } else if (imgCoord.value === rspCoords.보) {
      imgCoord.value = rspCoords.바위;
    }
  }, 100);
}

function onClickButton(choice) {
  clearInterval(interval);
  const myChoice = choice;
  const cpuChoice = computerChoice(imgCoord.value);
  const diff =
    Object.keys(rspCoords).indexOf(myChoice) -
    Object.keys(rspCoords).indexOf(cpuChoice);

  if (diff === 0) {
    result.value = "비겼습니다.";
    gameScores.value.draw += 1;
  } else if ([-1, 2].includes(diff)) {
    result.value = "이겼습니다.";
    gameScores.value.win += 1;
    score.value += 1; // 승리 시 점수 증가
  } else {
    result.value = "졌습니다.";
    gameScores.value.lose += 1;
    score.value -= 1; // 패배 시 점수 감소
  }

  history.value.push({
    myChoice,
    computerChoice: cpuChoice,
    result: result.value,
  });

  setTimeout(() => {
    changeHand();
  }, 1000);
}

onMounted(() => {
  changeHand();
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style scoped lang="scss">
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
  margin: 0 auto;
  padding-bottom: 10px;
}
#scoreboard,
#history {
  margin-top: 20px;
}

/* 대기 */
#game-container {
  background-image: url("https://en.pimg.jp/023/182/267/1/23182267.jpg");
  padding: 200px;
  border-radius: 10px;
}

.game-button {
  background-color: #f0f0f0;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.game-button:hover {
  background-color: #e0e0e0;
  transform: scale(1.1);
}
</style>

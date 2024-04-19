<template>
  <h1>지뢰찾기 게임입니다.</h1>
  <div>
    <MineForm />
    <div class="timetime">{{ timer }}&nbsp;초</div>
    <MineTableComponent />
    <div class="resultresult">{{ result }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import  { INCREMENT_TIMER } from "../store/modules/test-mine";


import MineTableComponent from "@/components/MineTableComponent.vue";
import MineForm from "@/components/MineForm.vue";

let interval;
export default {

  components: {
    MineTableComponent,
    MineForm,
  },
  computed: {
    ...mapState("testMine", ["timer", "result", "halted"]),
  },
  methods: {
    ...mapMutations("testMine", [INCREMENT_TIMER]),
  },
  watch: {
    halted(value) {
      if (value === false) {
        // false일 때 게임 시작
        interval = setInterval(() => {
          this.INCREMENT_TIMER();
    
        }, 1000);
      } else {
        // 게임 중단
        clearInterval(interval);
      }
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
.timetime,
.resultresult {
  font-size: 20px;
}
</style>

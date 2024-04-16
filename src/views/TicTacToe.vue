<template>
  <div>
    <div :style="{ color: turn === 'X' ? '#3498db' : '#e74c3c' }">
      {{ turn }}님의 턴입니다.
    </div>
    <TableComponent>
      <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td
          @click="onClickTd(rowIndex, cellIndex)"
          v-for="(cellData, cellIndex) in rowData"
          :key="cellIndex"
          :class="{ 'cell-hover': !cellData }"
        >
          {{ cellData }}
        </td>
      </tr>
    </TableComponent>

    <div
      v-if="winner"
      :class="{
        'winner-message': winner === '무승부',
        'victory-message': winner !== '무승부',
      }"
    >
      {{ winner === "무승부" ? "무승부입니다." : winner + "님의 승리!" }}
    </div>
  </div>
</template>

<script>
// [0, 1, 2, 3, 4 ,12, 7, 8, 9, 10, 13, 156]
//  0  1  2  3  4  5    6  7  8  9  10, 11,  12

import { mapState, mapMutations } from "vuex";
import store, {
  CHANGE_TURN,
  CLICK_CELL,
  NO_WINNER,
  RESET_GAME,
  SET_WINNER,
} from "../store/modules/tictactoe";

import TableComponent from "@/components/TableComponent.vue";

export default {
  store,
  components: {
    TableComponent,
  },
  data() {
    return {
      data: 1,
    };
  },
  computed: {
    ...mapState("tictactoe", ["winner", "turn", "tableData"]),

  },
  methods: {
    ...mapMutations("tictactoe",[CLICK_CELL,SET_WINNER,RESET_GAME,NO_WINNER,RESET_GAME,CHANGE_TURN]),


    onClickTd(rowIndex, cellIndex) {
  
      if (this.tableData[rowIndex][cellIndex]) return;

      this.CLICK_CELL({ row: rowIndex, cell: cellIndex });

      let win = false;
      if (
        this.tableData[rowIndex][0] === this.turn &&
        this.tableData[rowIndex][1] === this.turn &&
        this.tableData[rowIndex][2] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][cellIndex] === this.turn &&
        this.tableData[1][cellIndex] === this.turn &&
        this.tableData[2][cellIndex] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][0] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][2] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][2] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][0] === this.turn
      ) {
        win = true;
      }

      if (win) {
        // 이긴 경우: 3줄 달성
        this.SET_WINNER(this.turn);
        this.RESET_GAME();
      } else {
        // 무승부
        let all = true; // all이 true면 무승부라는 뜻
        this.tableData.forEach((row) => {
          // 무승부 검사
          row.forEach((cell) => {
            if (!cell) {
              all = false;
            }
          });
        });
        if (all) {
          // 무승부
          this.NO_WINNER();
          this.RESET_GAME();
        } else {
          this.CHANGE_TURN();
        }
      }
    },
  },
};
</script>

<style>
table {
  margin: 15px auto;
  border-collapse: collapse;
  transform: scale(1.2);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}
td {
  border: 1px solid black;
  width: 60px;
  height: 60px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-size: 24px;
  &:hover {
    background-color: #ecf0f1;
    transform: scale(1.1);
  }
}
.cell-hover:hover {
  background-color: #ecf0f1;
}
.winner-message,
.victory-message {
  color: #2ecc71;
  text-align: center;
  font-size: 28px;
  margin-top: 20px;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.winner-message {
  color: #e74c3c;
}

table,
td {
  border-radius: 10px;
}
</style>

<template>
  <table>
    <tr v-for="(rowData, rowIndex) in minetableData" :key="rowIndex">

      <td
        v-for="(cellData, cellIndex) in rowData"
        :key="cellIndex"
        :style="cellDataStyle(rowIndex, cellIndex)"
        @click="onClickTd(rowIndex, cellIndex)"
        @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
      >
        {{ cellDataText(rowIndex, cellIndex) }}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { CODE } from "../store/modules/test-mine";

import {
  CLICK_MINE,
  OPEN_CELL,
  QUESTION_CELL,
  NORMALIZE_CELL,
  FLAG_CELL,
} from "../store/modules/test-mine";

export default {
  computed: {
    ...mapState("testMine", ["minetableData", "halted"]),
    cellDataStyle() {
      return (row, cell) => {
      
        switch (this.minetableData[row][cell]) {
          case CODE.NORMAL:
          case CODE.MINE:
            return {
              // #444
              background: "#2C3E50",
            };
          case CODE.CLICKED_MINE:
          case CODE.OPENED:
            return {
              background: "white",
            };
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return {
              background: "red",
            };
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return {
              background: "yellow",
            };
          default:
            return {};
        }
      };
    },
    cellDataText() {
      return (row, cell) => {
       
        switch (this.minetableData[row][cell]) {
          case CODE.MINE:
            return "X";
          case CODE.NORMAL:
            return "";
          case CODE.FLAG_MINE:
          case CODE.FLAG:
            return "!";
          case CODE.QUESTION_MINE:
          case CODE.QUESTION:
            return "?";
          case CODE.CLICKED_MINE:
            return "펑";
          default:
            
            return this.minetableData[row][cell] || "";
        }
      };
    },
  },
  methods: {
    ...mapMutations("testMine", [
      CLICK_MINE,
      OPEN_CELL,
      QUESTION_CELL,
      NORMALIZE_CELL,
      FLAG_CELL,
    ]),
    onClickTd(row, cell) {
      //게임중단시 칸클릭 못하게
      if (this.halted) {
        return;
      }
      switch (this.minetableData[row][cell]) {
        case CODE.NORMAL:
         
          return this.OPEN_CELL({ row: row, cell: cell });
        case CODE.MINE:
          
          return this.CLICK_MINE({ row, cell });
        default:
          return;
      }
    },
    onRightClickTd(row, cell) {
      if (this.halted) {
        return;
      }
      console.log(row, cell);
      switch (this.minetableData[row][cell]) {
        case CODE.NORMAL:
        case CODE.MINE:
          
          this.FLAG_CELL({ row, cell });
          return;
        
        case CODE.FLAG_MINE:
        case CODE.FLAG:
         
          this.QUESTION_CELL({ row, cell });
          return;
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          
          this.NORMALIZE_CELL({ row, cell });
          return;
        default:
          return;
      }
    },
  },
};
</script>

<style scoped lang="scss">

table {
  margin: 0 auto;
  border-collapse: collapse;
  margin-top: 60px;
  margin-bottom: 60px;

  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    user-select: none;

    &.normal {
      background: #444;
    }
    &.mine {
      background: #444;
    }
    &.clicked-mine {
      background: white;
    }
    &.opened {
      background: white;
    }
    &.flag,
    &.flag-mine {
      background: red;
    }
    &.question,
    &.question-mine {
      background: yellow;
    }
  }
}
</style>

// mine
export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, 
};
//시작시 프레임만들고 마인심는다
const plantMine = (row, cell, mine) => {
  // console.log(row, cell, mine);
  
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  // console.log(data);
  return data;
};
// export const store = new Vuex.Store({
export const testMine = {
  // import store from './store';
  namespaced: true,
  state: {

    // mine
    minetableData: [],
    minedata: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    halted: true, // 중단된
    result: "",
    openedCount: 0,
  },
  getters: {
    turnMessage(state) {
      return state.turn + "님이 승리하셨습니다.";
    },
  },
  mutations: {
    // mine
    [START_GAME](state, { row, cell, mine }) {
      state.minedata = {
        row,
        cell,
        mine,
      };
      state.minetableData = plantMine(row, cell, mine);
      state.timer = 0;
      state.halted = false;
      state.openedCount = 0;
      state.result = "";
    },
    [OPEN_CELL](state, { row, cell }) {
      let openedCount = 0;
      const checked = [];
      function checkAround(row, cell) {
        // 주변 8칸 지뢰인지 검색
        const checkRowOrCellIsUndefined =
          row < 0 ||
          row >= state.minetableData.length ||
          cell < 0 ||
          cell >= state.minetableData[0].length;
        if (checkRowOrCellIsUndefined) {
          return;
        }
        if (
          [
            CODE.OPENED,
            CODE.FLAG,
            CODE.FLAG_MINE,
            CODE.QUESTION_MINE,
            CODE.QUESTION,
          ].includes(state.minetableData[row][cell])
        ) {
          return;
        }
        if (checked.includes(row + "/" + cell)) {
          return;
        } else {
          checked.push(row + "/" + cell);
        }
        let around = [];
        if (state.minetableData[row - 1]) {
          around = around.concat([
            state.minetableData[row - 1][cell - 1],
            state.minetableData[row - 1][cell],
            state.minetableData[row - 1][cell + 1],
          ]);
        }
        around = around.concat([
          state.minetableData[row][cell - 1],
          state.minetableData[row][cell + 1],
        ]);
        if (state.minetableData[row + 1]) {
          around = around.concat([
            state.minetableData[row + 1][cell - 1],
            state.minetableData[row + 1][cell],
            state.minetableData[row + 1][cell + 1],
          ]);
        }
        const counted = around.filter(function (v) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        });
        if (counted.length === 0 && row > -1) {
          // 주변칸에 지뢰가 하나도 없으면
          const near = [];
          if (row - 1 > -1) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if (row + 1 < state.minetableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near.forEach((n) => {
            if (state.minetableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          });
        }
        if (state.minetableData[row][cell] === CODE.NORMAL) {
          openedCount += 1;
        }
        state.minetableData[row][cell] = counted.length;
      }
      checkAround(row, cell);
      let halted = false;
      let result = "";
      if (
        state.minedata.row * state.minedata.cell - state.minedata.mine ===
        state.openedCount + openedCount
      ) {
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다.`;
      }
      state.openedCount += openedCount;
      state.halted = halted;
      state.result = result;
    },
    [CLICK_MINE](state, { row, cell }) {
      state.halted = true;
      state.minetableData[row][cell] = CODE.CLICKED_MINE;
    },
    [FLAG_CELL](state, { row, cell }) {
      if (state.minetableData[row][cell] === CODE.MINE) {
        state.minetableData[row][cell] = CODE.FLAG_MINE;
      } else {
        state.minetableData[row][cell] = CODE.FLAG;
      }
    },
    [QUESTION_CELL](state, { row, cell }) {
      if (state.minetableData[row][cell] === CODE.FLAG_MINE) {
        state.minetableData[row][cell] = CODE.QUESTION_MINE;
      } else {
        state.minetableData[row][cell] = CODE.QUESTION;
      }
    },
    [NORMALIZE_CELL](state, { row, cell }) {
      if (state.minetableData[row][cell] === CODE.QUESTION_MINE) {
        state.minetableData[row][cell] = CODE.MINE;
      } else {
        state.minetableData[row][cell] = CODE.NORMAL;
      }
    },
    [INCREMENT_TIMER](state) {
      state.timer += 1;
    },
  },
};

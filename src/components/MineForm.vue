<template>
  <div>
    <input
      type="number"
      placeholder="세로"
      :value="row"
      @change="onChangeRow"
    />
    <input
      type="number"
      placeholder="가로"
      :value="cell"
      @change="onChangeCell"
    />
    <input
      type="number"
      placeholder="지뢰"
      :value="mine"
      @change="onChangeMine"
    />
    <button @click="onClickBtn">시작</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import {
  START_GAME,
} from "../store/modules/test-mine";

export default {

  data() {
    return {
      row: 10,
      cell: 10,
      mine: 20,
    };
  },
  methods: {
    ...mapMutations("testMine", [START_GAME]),
    onChangeRow(e) {
      this.row = e.target.value;
    },
    onChangeCell(e) {
      this.cell = e.target.value;
    },
    onChangeMine(e) {
      this.mine = e.target.value;
    },
    onClickBtn() {
     
      this.START_GAME({
        row: this.row,
        cell: this.cell,
        mine: this.mine,
      });
    },
  },
};
</script>

<style scoped lang="scss">

div {
  display: flex;
  flex-wrap: wrap;
  gap:15px;
  justify-content: center;
  margin-bottom: 20px;

  input {
    margin: 0 10px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    &:focus {
      border-color: #007bff;
    }
  }

  button {
   
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  }
}

@media only screen and (max-width: 486px) {
  div {
    button {
      width: 150px;

    }
  }
}
</style>

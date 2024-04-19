<template>
  <div class="bestdiv">

    <div>
      <div class="hello">
        <div>
          <img alt="Vue logo" src="../assets/image1.png">
          <h1>WEB GAME BOARD</h1>
        </div>
        <p>
          WEB GAME을 사용 할 수 있고 WEB GAME의 타이틀을 적고 리뷰를 등록하고 리뷰의 댓글을 쓸 수 있습니다.
        </p>
      </div>
      <div class="leftbroger">
        <div>
          <DesignCom @parent="testFn"/>

        </div>
        <div>
          
          <div v-if="game === 1">
            <MultiplicationTable  />
          </div>
          <div v-if="game === 2">
            <LastWord  />
          </div>
          <div v-if="game === 3">
            <BaseBall  />
          </div>
          <div v-if="game === 4">
            <ReactionSpeed  />
          </div>
          <div v-if="game === 5">
            <RockPaper  />
          </div>
          <div v-if="game === 6">
            <LottoNums  />
          </div>
          <div v-if="game === 7">
            <TicTacToe  />
          </div>
          <div v-if="game === 8">
            <MineSweeper  />
          </div>
        </div>
      </div>
    </div>
    <div class="boarddiv">
      댓글 자리
    </div>
  </div>

</template>

<script>
import DesignCom from '@/DesignComponents/LeftUi.vue';
import MultiplicationTable from './MultiplicationTable.vue';
import LastWord from './LastWord.vue';
import BaseBall from './BaseBall.vue';
import ReactionSpeed from './ReactionSpeed.vue';
import RockPaper from './RockPaper.vue';
import LottoNums from './LottoNums.vue';
import TicTacToe from './TicTacToe.vue'
import MineSweeper from './MineSweeper.vue'

  export default {
    name:"DesignGameBoard",
    
    components: {
      DesignCom,
      MultiplicationTable,
      LastWord,
      BaseBall,
      ReactionSpeed,
      RockPaper,
      LottoNums,
      TicTacToe,
      MineSweeper,
    
    },
    data() {
      return {
        game: 1,
      }
    },
    methods:{
      testFn(num) {
        console.log(num)
        this.game = num
      }
    }

  }
</script>

<style lang="scss" scoped>
//오른쪽 끝 대댓글 자리
.boarddiv {
  position: fixed;
  top: 0;
  right: 0;
  
  width:375px;
  height: 100vh;
  background-color: #333;

  color: #FFF;

}

//스크롤 목록 + 게임창
.leftbroger {
  display: flex;
  justify-content: space-between;
  width:1300px;
  height: 700px;

//스크롤 목록
  >div:nth-of-type(1) {
    width:420px;
    height: 700px;
   
    
    overflow-y: auto;
  }
  // 게임창
  >div:nth-of-type(2) {
    overflow-y: auto;
    background-color: #D9D9D9;
    width: 870px;
    border-radius: 20px;
  }
 
}
// 최상위, 전체div 
.bestdiv {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 0 0 auto;
}
//위쪽 제목
.hello {
  >div:nth-of-type(1) {
    
    >h1:nth-of-type(1) {
      display: inline-block;
      padding-left: 30px;
      vertical-align: super;
      text-align: center;
      color: #333;
      margin: 0;
    }
  }
}
p {
  color: #666;
  line-height: 1.5;
}

a {
  color: #42b983;
  &:hover {
    color: #333;
  }
}

</style>
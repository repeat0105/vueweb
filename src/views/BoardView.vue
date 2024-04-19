<template>
  <div class="home">
    <hr />
    <div class="board">
      <h4>게임 댓글 입력하기</h4>
      <form v-on:submit="submitform">
        <div>
      
          <input
            type="text"
            id="boardnumtwo"
            :value="boardnumtwo"
            v-on:input="boardnumtwo = $event.target.value"
            placeholder="게임 제목을 입력해주세요"
          />
        </div>
        <div>

          <textarea
            type="text"
            id="boardcontent"
            :value="boardcontent"
            v-on:input="boardcontent = $event.target.value"
            placeholder="게임 결과를 입력해주세요"
          />
        </div>
        <button type="submit">저장</button>
      </form>

    </div>
   
    
   
    <ul class="home">
      <li v-for="item in data" :key="item.num">
        <UserCom :item="item" :ipinfo="ipinfo"  />
      </li>
    </ul>
  </div>
</template>

<script>


import { mapState, mapMutations } from "vuex";
import UserCom from "../components/UserCom.vue";


export default {
  name: "BoardView",
  data() {
    return {
      boardnumtwo: "",
      boardcontent: "",
      id: 0,
      nowDay: "",
      boardid: 1,
      newData: {},
    };
  },
  components: {
    UserCom,
  },
  computed: {
    ...mapState("testMember", ["data", "ipinfo"]),
  },
  mounted() {
    this.setNowDay();
  },
  methods: {
    ...mapMutations("testMember", [
      "getData",
      "postData",
      "setData",
      "delData",
      "ipData",
    ]),

    submitform: function (e) {
      e.preventDefault();
      if (this.boardnumtwo === "" || this.boardcontent === "") {
        alert("제목과 내용을 입력해주세요");
      } else {
        if(this.boardnumtwo.length < 100 || this.boardcontent.length < 200) {
          this.id = Date.now();
          this.newData = {
            boardunique: this.id,
            boardip: this.ipinfo,
            boardnumtwo: this.boardnumtwo,
            boardcontent: this.boardcontent,
            boardday: this.nowDay,
            boardid: this.boardid,
          };
  
          this.postData(this.newData);
          this.boardnumtwo = "";
          this.boardcontent = "";
        }else {
          alert('제목은 100자이내 내용응 200자 이내로 입력해주세요')
        }
      }
    },
    setNowDay() {
      let today = new Date();
      let year = today.getFullYear();
      let month = ("0" + (today.getMonth() + 1)).slice(-2);
      let day = today.getDate();

      this.nowDay = year + "-" + month + "-" + day;
    },


  },

  created() {
    this.getData();
    this.ipData();
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 80%;
  margin: 0 auto;
}

.board {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #000;
  border: none;
  background-color: #f0f0f0;
  border-radius: 15px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
form >div {
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="text"],
textarea {
  width: 90%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  width: 92%;
  margin: 0 auto;
 
}

hr {
  width: 90%;
  border: 0.5px solid #ddd;
}

ul.home {
  width: 85%;
  padding:0;
}

ul > li {
  list-style: none;
  width: 80%;
}


</style>

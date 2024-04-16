<template>
  <div class="title1">
    <!-- {{ $route.params.id }} -->
    <div>
      <div v-for="item in filteredData" :key="item.num">
        <p>
          {{ item.boardnumtwo }}
        </p>
        <p>
          {{ item.boardcontent }}
        </p>
        <p>{{ item.boardday }}</p>
      </div>
    </div>
  </div>
  <hr />

  <div class="board">
    <h4>답글 입력하기</h4>
    <form v-on:submit="submitform">
      <div>
        <input
          type="text"
          id="replyboardtitle"
          :value="replyboardtitle"
          v-on:input="replyboardtitle = $event.target.value"
          placeholder="답글 제목을 입력해주세요"
        />
      </div>
      <div>
        <textarea
          type="text"
          id="replyboardcontent"
          :value="replyboardcontent"
          v-on:input="replyboardcontent = $event.target.value"
          placeholder="답글 내용을 입력해주세요"
        />
      </div>
      <button type="submit">저장</button>
    </form>
    <!-- <p>{{ replyboardtitle }}</p>
    <p>{{ replyboardcontent }}</p> -->
  </div>

  <ul class="home">
    <li v-for="item in replyfilteredData" :key="item.num">
      <ReplyBoard :item="item" :ipinfo="ipinfo" />
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ReplyBoard from "./ReplyBoard.vue";

export default {
  name: "DetailCom",

  components: {
    ReplyBoard,
  },
  data() {
    return {
      titleupdata: "",
      contentupdata: "",

      isActive: false,

      replyid: 0,
      replyboardtitle: "",
      replyboardcontent: "",
      replynowDay: "",
      replyboardid: 1,
      replyparnum: 0,
      replynewData: {},
    };
  },
  computed: {
    ...mapState("testMember", ["data", "ipinfo"]),
    ...mapState("replyBoard", ["replydata"]),

    filteredData() {
      return this.data.filter(
        (item) => item.num === Number(this.$route.params.id)
      );
    },

    replyfilteredData() {
      return this.replydata.filter(
        (item) => item.replyparnum === Number(this.$route.params.id)
      );
    },
  },
  mounted() {
    this.setNowDay();
  },
  created() {
    this.getData();
    this.getDatareply();
  },
  methods: {
    ...mapMutations("testMember", ["getData"]),
    ...mapMutations("replyBoard", ["getDatareply", "postDatareply"]),

    submitform: function (e) {
      e.preventDefault();
      if (this.replyboardtitle === "" || this.replyboardcontent === "") {
        alert("제목과 내용을 입력해주세요");
      } else {

        if(this.replyboardtitle.length < 100 || this.replyboardcontent.length < 300) {
          this.replyid = Date.now();
          this.replynewData = {
            // boardip: this.ipinfo,
            replyboardunique: this.replyid,
            replyboardip: this.ipinfo,
            replyboardnumtwo: this.replyboardtitle,
            replyboardcontent: this.replyboardcontent,
            replyboardday: this.replynowDay,
            replyboardid: this.replyboardid,
            replyparnum: Number(this.$route.params.id),
          };
  
          this.postDatareply(this.replynewData);
          this.replyboardtitle = "";
          this.replyboardcontent = "";

        }else {
          alert('제목은 100자이내 내용응 300자 이내로 입력해주세요')

        }
      }
    },
    setNowDay() {
      let today = new Date();
      let year = today.getFullYear();
      let month = ("0" + (today.getMonth() + 1)).slice(-2);
      let day = today.getDate();

      this.replynowDay = year + "-" + month + "-" + day;
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  width: 80%;
  margin: 0 auto;
  padding: 15px;
  border: 1px solid #000;
  background-color: #f0f0f0;
  border-radius: 15px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  width: 90%;
  margin: 0 auto;
}

hr {
  width: 90%;
  border: 0.5px solid #ddd;
}
.title1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 82%;
  margin: 0 auto;
  padding: 15px 0;
  border: 1px solid #000;
  background-color: #f0f0f0;
  border-radius: 25px;
  border: none;
  margin-bottom: 20px;
  > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    > div:nth-of-type(1) {
      display: flex;
      flex-direction: column;
      align-items: baseline;

      padding-left: 20px;
    }
  }
}

.updisplay {
  display: none;
}

.realyupdisplay {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 10px;
  width: 90%;
  padding-left: 40px;
  > div:nth-of-type(1) {
    > label {
      padding-right: 32px;
    }
  }
  > div:nth-of-type(2) {
    > label {
      vertical-align: top;
    }
  }

  button {
    padding: 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }
}

ul.home {
  padding: 0;
  > li {
    list-style: none;
  }
}

@media only screen and (max-width: 486px) {
  .title1 {
    width: 92% !important;
  }
}
@media only screen and (max-width: 786px) {
  .title1 {
    width: 85%;
  }
}
</style>

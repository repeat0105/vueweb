<template>
  <div class="title" >
    <div>
      <div>
        <!-- <p>{{ item }}</p> -->
        <p>{{ item.boardnumtwo }}</p>
        <p>{{ item.boardcontent }}</p>
        <p>{{ item.boardday }}</p>
      </div>
      <!-- 모바일시 사용 style="display:none"  class="hidden-container"  :class="{ titlebtn: isupdelbtn }"  :class="[isActive && 'updisplay']"-->
      <div>
        <div class="hidden-container" v-on:click="isupdelbtn = !isupdelbtn" >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div :class="{ updelbtn: isupdelbtn , hidden: !isupdelbtn }">
          <div :class="{ 'btn': isActive === true }">
            <button :class="{ 'updisplay': isActive}" @click="isActive = true" >
              수정
            </button>
            <button
              :class="[isActive && 'updisplay']"
              @click="deldel({ num: item.num, item: item.boardip })"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="leate">
      <button @click="togglebtn">답글({{ replyfilteredData.length }})</button>
      <button>
        <router-link :to="`/detail/${item.num}`">답글 이동</router-link>
      </button>
    </div>

    <div v-bind:class="isActive ? 'realyupdisplay' : 'updisplay'">
      <div>
        <input
          type="text"
          id="titleupdata"
          :value="item.boardnumtwo"
          v-on:input="titleupdata = $event.target.value"
          placeholder="변경 할 제목"
        />
      </div>
      <div>
        <textarea
          type="text"
          id="contentupdata"
          :value="item.boardcontent"
          v-on:input="contentupdata = $event.target.value"
          placeholder="변경 할 내용"
        />
      </div>
      <div>
        <button
          @click="
            realupdata({
              num: item.num,
              boardnumtwo: titleupdata,
              boardcontent: contentupdata,
              boardip: ipinfo,
            }),
              (isActive = false)
          "
        >
          수정하기
        </button>
      </div>
    </div>
    <div
      class="replyboard"
      v-for="item in replyfilteredData"
      :key="item.num"
      v-show="isreplyboard"
    >
      <div>
        <div>
          <p>{{ item.replyboardnumtwo }}</p>
          <p>{{ item.replyboardcontent }}</p>
          <p>{{ item.replyboardday }}</p>
        </div>
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "UserCom",
  props: {
    item: Object,
    ipinfo: String,
   
  },
  data() {
    return {
      titleupdata: "",
      contentupdata: "",

      isActive: false,

      isreplyboard: false,

      isupdelbtn: false,
    };
  },

  computed: {
    ...mapState("replyBoard", ["replydata"]),
    replyfilteredData() {
      return this.replydata.filter(
        (item) => item.replyparnum === Number(this.item.num)
      );
    },
  },
  created() {
    this.getDatareply();
  },

  methods: {
    ...mapMutations("replyBoard", ["getDatareply"]),

    realupdata(value) {
      if (value.boardnumtwo !== "" || value.boardcontent !== "") {
        if(value.boardnumtwo.length < 100 || value.boardcontent.length < 200){
          
          this.$store._mutations["testMember/setData"][0](value);
        } else {
          alert("제목은 100자이내 내용응 200자 이내로 입력해주세요")
        }
      } else {
        alert("수정한 내용을 적어주세요");
      }
    },
    // ip로 처음 들온사람과 db의 ip 비교했음 이거보고 학원에서 고쳐보기
    deldel(value) {
      if (value.item === this.ipinfo) {
        this.$store._mutations["testMember/delData"][0](value.num);
      }
    },
    togglebtn() {
      this.isreplyboard = !this.isreplyboard;
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  /* overflow-wrap: break-word; */
  word-wrap: break-word;
}
.replyboard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%; // 변경될 수 있는 부분
  margin: 0 auto;
  padding: 15px 0;
  background-color: #6b6b6b;
  border-radius: 25px;
  border: 1px solid #000; // 부모 컴포넌트에서 제거되었지만, 여기서는 필요에 따라 추가
  margin-bottom: 20px;
  color: #fff;
  margin-top: 15px;
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
.title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%; // 변경될 수 있는 부분
  margin: 0 auto;
  padding: 15px 0;
  background-color: #d6d6d6;
  border-radius: 25px;
  border: 1px solid #000; // 부모 컴포넌트에서 제거되었지만, 여기서는 필요에 따라 추가
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
      > p {
        word-wrap: break-word;
      }
    }

    > div:nth-of-type(2) {
      > div:nth-of-type(1) {
        /* display: none; // 모바일시 사용 style="display:none" 주석 처리에 따라 반영 */
        display: flex;
        flex-direction: column;
        cursor: pointer;
        padding-top: 15px;
        align-items: end;

        span {
          border: 2.5px solid #000;
          border-radius: 50%;
          margin: 2px;
          width: 2px;
        }
      }
      //여기가 반응형 버튼
      > div:nth-of-type(2).hidden {
        display: none;
      }
      > div:nth-of-type(2).updelbtn {
      
        position: relative;
        top: 0px;
        right: 0px;
        > div:nth-of-type(1) {
          display: flex;
          flex-wrap: wrap;
          justify-content: end;
          gap: 10px;
          position: absolute;
          top: 0px;
          right: 0px;
          background-color: #00000047;
          padding: 20px;
          border-radius: 15px;


          button {
      
            // 클래스에 따른 조건부 스타일링 대응
            width: 50px;
            height: 30px;
            padding: 0;
            margin: 0;
            border: none;
            border-radius: 15px;
            background: rgb(240, 240, 240, 0.8);
            cursor: pointer;
            &.updisplay {
              display: none;
            }
          }
        }
        
        >div:nth-of-type(1).btn {
          padding: 0px;
        }

      }
    }
  }

  //버튼 위치
  > div:nth-of-type(2) {
    display: flex;
    width: 100%;
    margin: 0 auto;
    

    button {
      margin: 10px 0;
      margin-left: 35px;
      padding: 10px 20px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      // 클래스에 따른 조건부 스타일링 대응
      &.updisplay {
        display: none;
      }
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

  > div:nth-of-type(1),
  > div:nth-of-type(2) {
    display: flex;
    align-items: center;
    gap: 10px; // 라벨과 입력 필드 간 간격 조정
    width: 100%;
    > label {
      padding-right: 32px;
    }
  }

  button {
    padding: 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }
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

@media only screen and (max-width: 486px) {
  .leate {
    display: flex;
    flex-wrap: wrap;
  }
  .realyupdisplay {
    width: 73% !important;
  }
 

}

@media only screen and (max-width: 768px) {
  .realyupdisplay {
    width: 80%;
  }
}
</style>

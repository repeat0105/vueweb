<template>
  <div class="replytitle">
    <div>
      <div>
        <!-- <p>{{ item }}</p> -->
        <p>{{ item.replyboardnumtwo }}</p>
        <p>{{ item.replyboardcontent }}</p>
        <p>{{ item.replyboardday }}</p>
      </div>
      <!-- <div>
        <span></span>
        <span></span>
        <span></span>
      </div> -->
    </div>

    <div class="leate">
      <button :class="[isActive && 'updisplay']" @click="isActive = true">
        수정
      </button>
      <button :class="[isActive && 'updisplay']" @click="deldel(item.num)">
        삭제
      </button>
    </div>

    <div v-bind:class="isActive ? 'realyupdisplay' : 'updisplay'">
      <div>
        <input
          type="text"
          id="titleupdata"
          :value="item.replyboardnumtwo"
          v-on:input="titleupdata = $event.target.value"
          placeholder="변경 할 제목"
        />
      </div>
      <div>
        <textarea
          type="text"
          id="contentupdata"
          :value="item.replyboardcontent"
          v-on:input="contentupdata = $event.target.value"
          placeholder="변경 할 내용"
        />
      </div>
      <div>
        <button
          @click="
            realupdata({
              num: item.num,
              replyboardnumtwo: titleupdata,
              replyboardcontent: contentupdata,
              replyboardip: ipinfo,
            }),
              (isActive = false)
          "
        >
          수정하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReplyBoard",
  props: {
    item: Object,
    ipinfo: String,
  },
  data() {
    return {
      titleupdata: "",
      contentupdata: "",

      isActive: false,
    };
  },
  components: {},
  methods: {
    realupdata(value) {
      // console.log(value);

      if (value.replyboardnumtwo !== "" || value.replyboardcontent !== "") {
        if(value.replyboardnumtwo.length < 100 || value.replyboardcontent.length < 300){

          this.$store._mutations["replyBoard/setDatareply"][0](value);
        } else {
          alert("제목은 100자이내 내용응 300자 이내로 입력해주세요")

        }
      } else {
        alert("수정한 내용을 적어주세요");
      }
    },
    deldel(num) {
      this.$store._mutations["replyBoard/delDatareply"][0](num);
    },
  },
};
</script>

<style lang="scss" scoped>
.replytitle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  padding: 15px 0;
  border: 1px solid #000;
  background-color: #6b6b6b;
  border-radius: 25px;
  border: none;
  margin-bottom: 20px;
  color: #fff;
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
    > div:nth-of-type(2) {
      display: flex;
      flex-direction: column;

      cursor: pointer;
      padding-top: 15px;
      span {
        border: 2.5px solid #000;
        border-radius: 50%;
        margin: 2px;
      }
    }
  }
  //버튼 위치
  > div:nth-of-type(2) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;

    button {
      margin: 10px 0;
      margin-left: 35px;
      padding: 10px 20px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
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

  > div:nth-of-type(1),
  > div:nth-of-type(2) {
    margin: 0 auto;
    width: 100%;
  }

  button {
    padding: 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    margin-left: 30px;
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
  margin: 0;
  display: flex;
  margin-left: 30px;
}

@media only screen and (max-width: 486px) {
  .realyupdisplay {
    width: 83%;
  }
}
</style>

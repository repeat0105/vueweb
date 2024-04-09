<template>
  <div class="hello1">
    <h1>{{ msg }}</h1>
    <p>
      지금부터 구구단을 시작한다 10연속 성공하면 다음 단계로 넘어간다. 실패하면
      처음부터 다시 시작한다.
    </p>
    <div>{{ first }} 곱하기 {{ second }} 는?</div>
    <form v-on:submit="onSubmitForm">
      <input type="number" ref="answer" v-model="value" />
      <button type="submit">입력</button>
    </form>
    <div id="result">{{ result }} {{ count }}</div>
    <div>
      <img
        v-if="liked"
        v-on:click="onClickdislike"
        class="color"
        alt="like logo"
        src="../assets/like.png"
      />
      <button v-else class="btnlike" v-on:click="onClickButton">
        <img alt="like logo" src="../assets/like.png" />
      </button>
    </div>
    <MenuIcon :size="48" />
  </div>
</template>

<script>
import MenuIcon from "vue-material-design-icons/Link.vue";
export default {
  components: {
    MenuIcon,
  },
  name: "HelloWorldcopy",

  data() {
    return {
      first: Math.ceil(Math.random() * 9),
      second: Math.ceil(Math.random() * 9),
      value: "",
      result: "",
      count: 0,
      liked: false,
    };
  },
  methods: {
    onSubmitForm(e) {
      e.preventDefault();
      console.log(this.first * this.second === parseInt(this.value));
      if (this.first * this.second === parseInt(this.value)) {
        this.result = "정답";
        this.first = Math.ceil(Math.random() * 9);
        this.second = Math.ceil(Math.random() * 9);
        this.value = "";
        this.count++;
        this.$refs.answer.focus();
      } else {
        this.result = "땡 다시 시작한다";
        this.value = "";
        this.count = 0;
        this.$refs.answer.focus();
      }
    },
    onClickButton() {
      this.liked = true;
    },
    onClickdislike() {
      this.liked = false;
    },
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  text-align: center;
  margin-bottom: 20px;
}

div {
  &.hello1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  &.color,
  &.btnlike img {
    width: 50px;
    height: 50px;
  }
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  input[type="number"] {
    padding: 10px;
    border: 2px solid #42b983;
    border-radius: 5px;
    width: 200px;
    text-align: center;

    &:focus {
      outline: none;
      border-color: #66d9ef;
    }
  }

  button {
    padding: 10px 20px;
    background-color: #42b983;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #66d9ef;
    }
  }
}

#result {
  font-size: 20px;
  margin: 20px 0;
}

.color {
  border-radius: 50%;
  background-color: #f5829b;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #f9c4d2;
  }
}

.btnlike {
  background-color: transparent;
  border: none;
  cursor: pointer;

  img {
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>

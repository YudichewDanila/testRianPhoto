<style lang="scss" scoped>
.form {
  position: fixed;
  border-radius: 10px;
  background: white;
  padding: 2%;
  width: 95%;
  margin-top: -5px;
  z-index: 1000;

  .exitButton {
    padding: 2px;
    background: white;
    border: solid 1px white;
    font-size: 20px;
    cursor: pointer;
  }

  p {
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    height: 25px;
  }

  .createBtn {
    margin-top: 2%;
    margin-left: 65%;
  }
}
@media screen and (min-width: 1035px) {
  .form {
    position: fixed;
    border-radius: 10px;
    background: white;
    padding: 2%;
    width: 80%;
    margin-top: -5px;
    z-index: 1000;

    .exitButton {
      padding: 2px;
      background: white;
      border: solid 1px white;
      font-size: 20px;
      cursor: pointer;
    }

    p {
      font-size: 24px;
      margin-top: 20px;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      height: 25px;
    }

    .createBtn {
      margin-top: 2%;
      margin-left: 90%;
    }
  }
}
</style>
<template>
  <div>
    <div class="form">
      <button v-on:click="exitForm" class="exitButton">X</button>
      <h2>Создание:</h2>
      <p>Name:</p>
      <input v-model="newCart.title" />
      <p>Price:</p>
      <input v-model="newCart.price" />
      <p>Rating:</p>
      <input v-model="newCart.rating.rate"/>
      <p>Count:</p>
      <input v-model="newCart.rating.count"/>
      <UButton class="createBtn" v-on:click="createCart">Добавить</UButton>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const carts = reactive(computed(() => store.state.carts));

function newId(){
    carts.value = carts.value.sort((a, b) => (a.id > b.id ? 1 : -1));
    return carts.value[carts.value.length-1].id+1;
}

const newCart = ref({
  id: newId(),
  column: 1,
  price: '',
  rating: {
    rate: '',
    count: '',
  },
  title: '',
});

function createCart(){
    store.dispatch("cartCreate", newCart.value);
    exitForm();
}

function exitForm() {
  store.dispatch("onFormCreate", false);
}
</script>

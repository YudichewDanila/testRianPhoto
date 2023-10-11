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

    .updateBtn {
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

    .updateBtn {
      margin-top: 2%;
      margin-left: 90%;
    }
  }
}
</style>
<template>
  <div>
    <div class="form">
      <button class="exitButton" v-on:click="exitForm">X</button>
      <h2>Редактирование:</h2>
      <p>Id:{{ cartUpdate.id }}</p>
      <p>Name:</p>
      <input v-model="newCartUpdate.title" />
      <p>Rating:</p>
      <input v-model="newCartUpdate.rating.rate" />
      <p>Count:</p>
      <input v-model="newCartUpdate.rating.count" />
      <UButton class="updateBtn" v-on:click="updateCart">Изменить</UButton>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const cartUpdate = ref(computed(() => store.state.cartUpdate));
const newCartUpdate = ref({
  id: cartUpdate.value.id,
  column: cartUpdate.value.column,
  image: cartUpdate.value.image,
  price: cartUpdate.value.price,
  rating: {
    rate: cartUpdate.value.rating.rate,
    count: cartUpdate.value.rating.count,
  },
  title: cartUpdate.value.title,
});

function updateCart() {
  store.dispatch("cartUpdate", newCartUpdate.value);
  store.dispatch("onFormUpdate", false);
}
function exitForm() {
  store.dispatch("onFormUpdate", false);
}
</script>

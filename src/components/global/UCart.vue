<style lang="scss" scoped>
.cartProduct {
  position: relative;
  p {
    width: 80%;
    font-size: 18px;
    color: rgb(61, 60, 60);
    overflow-x: hidden;
  }
  .cartProduct_img {
    width: 120px;
    margin: 10px auto;
  }
  .interactiveBtn {
    position: absolute;
    margin-left: 75%;
    button {
      width: 25px;
      height: 25px;
      border-radius: 5px;
      margin-bottom: 5px;
      background: white;
      border: solid 1px white;
    }
  }
  .cartBtn {
    width: 90%;
    padding: 5%;
    margin: 10px 5%;
    font-size: 14px;
    color: white;
    background: rgba(0, 0, 255, 0.642);
    border: none;
    border-radius: 15px;
  }
}
</style>
<template>
  <div class="cartProduct">
    <p>Id:{{ cart.cart.id }}</p>
    <div class="interactiveBtn">
      <button v-on:click="deleteCart">
        <img src="/img/deleteIcon.svg" />
      </button>
      <button v-on:click="updateCart">
        <img src="/img/updateIcon.svg" />
      </button>
    </div>
    <div class="cartProduct_img">
      <img width="100" height="100" :src="cart.cart.image" />
    </div>
    <p>Name:{{ cart.cart.title }}</p>
    <p>Rating:{{ cart.cart.rating.rate }}</p>
    <p>Count:{{ cart.cart.rating.count }}</p>
    <button v-on:click="ondataTransfer" class="cartBtn">
      {{ cart.btnText }}
    </button>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  cart: Object,
});
function ondataTransfer() {
  if (props.cart.cart.column + 1 > props.cart.columnLength) {
    props.cart.cart.column = 1;
  } else {
    props.cart.cart.column = props.cart.cart.column + 1;
  }
}

function updateCart(){
  store.dispatch("addCartUpdate", props.cart.cart);
  store.dispatch("onFormUpdate", true);
}

function deleteCart() {
  store.dispatch("deleteCart", props.cart.cart.id);
}
</script>

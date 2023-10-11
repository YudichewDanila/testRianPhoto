<style lang="scss">
.row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.table_cell {
  display: table-cell;
  padding: 8px;
  min-width: 300px;
  border-radius: 10px;

  .header {
    font-size: 16px;
    color: white;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }

  .content {
    .productCart {
      width: 160px;
      padding: 8px;
      margin: 10px auto;
      border-radius: 10px;
      background: white;
    }
  }
}

@media screen and (min-width: 1035px) {
  .row {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
}
</style>
<template>
  <div>
    <div v-if="formUpdate" class="formUpdate">
      <UForm />
    </div>
    <div v-if="formCreate" class="forCreate">
      <UFormCreate />
    </div>
    <UButton v-on:click="sortedCarts">Сортировка</UButton>
    <UButton v-on:click="createCarts">Добавить</UButton>
    <div v-if="!formUpdate && !formCreate" class="row">
      <div
        :style="{ backgroundColor: column.backg }"
        v-for="column in columns"
        :key="column.id"
        class="table_cell"
        @drop="onDrop($event, column.id)"
        @dragenter.prevent
        @dragover.prevent
      >
        <div class="header">
          {{ column.name }} <span>{{ getItems(column.id).length }}</span>
        </div>
        <div class="content">
          <UCart
            v-for="cart in getItems(column.id)"
            :key="cart.id"
            class="productCart"
            @dragstart="startDrag($event, cart)"
            draggable="true"
            :style="{ background: column.cartColor }"
            :cart="{
              cart: cart,
              btnText: column.btnText,
              columnLength: columns.length,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "UColumns",
  setup() {
    const store = useStore();
    const columns = reactive(computed(() => store.state.columns));
    const carts = reactive(computed(() => store.state.carts));
    const columnsSort = ref(computed(() => store.state.colomnsSort));
    const formUpdate = ref(computed(() => store.state.formUpdate));
    const formCreate = ref(computed(() => store.state.formCreate));

    function createCarts() {
      store.dispatch("onFormCreate", true);
    }

    const startDrag = (event, item) => {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemId", item.id);
    };
    const onDrop = (event, column) => {
      const itemId = event.dataTransfer.getData("itemId");
      const item = carts.value.find((item) => item.id == itemId);
      item.column = column;
    };

    const getItems = (column) => {
      return carts.value.filter((item) => item.column == column);
    };

    const sortedCarts = () => {
      switch (columnsSort.value) {
        case 0:
          carts.value = carts.value.sort((a, b) =>
            a.rating.rate > b.rating.rate ? 1 : -1
          );
          store.dispatch("updateColumnSort", 1);
          break;
        case 1:
          carts.value = carts.value.sort((a, b) =>
            a.rating.rate > b.rating.rate ? -1 : 1
          );
          store.dispatch("updateColumnSort", 2);
          break;
        case 2:
          carts.value = carts.value.sort((a, b) => (a.id > b.id ? 1 : -1));
          store.dispatch("updateColumnSort", 0);
          break;
      }
    };
    return {
      onDrop,
      columns,
      getItems,
      startDrag,
      formUpdate,
      formCreate,
      createCarts,
      sortedCarts,
    };
  },
});
/*
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const columns = reactive(computed(() => store.state.columns));
const carts = reactive(computed(() => store.state.carts));
const columnsSort = ref(computed(() => store.state.colomnsSort));
const formUpdate = ref(computed(() => store.state.formUpdate));
const formCreate = ref(computed(() => store.state.formCreate));

function createCarts() {
  store.dispatch("onFormCreate", true);
}

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemId", item.id);
};
const onDrop = (event, column) => {
  const itemId = event.dataTransfer.getData("itemId");
  const item = carts.value.find((item) => item.id == itemId);
  item.column = column;
};

const getItems = (column) => {
  return carts.value.filter((item) => item.column == column);
};

const sortedCarts = () => {
  switch (columnsSort.value) {
    case 0:
      carts.value = carts.value.sort((a, b) =>
        a.rating.rate > b.rating.rate ? 1 : -1
      );
      store.dispatch("updateColumnSort", 1);
      break;
    case 1:
      carts.value = carts.value.sort((a, b) =>
        a.rating.rate > b.rating.rate ? -1 : 1
      );
      store.dispatch("updateColumnSort", 2);
      break;
    case 2:
      carts.value = carts.value.sort((a, b) => (a.id > b.id ? 1 : -1));
      store.dispatch("updateColumnSort", 0);
      break;
  }
};
*/
</script>

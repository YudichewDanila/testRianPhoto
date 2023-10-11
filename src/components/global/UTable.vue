<style lang="scss" scoped>

.table {
  display: block;
  width: 99%;
  margin: 0 auto;
}
.table_row {
  display: flex;
  flex-direction: column;
  width: 100%;
}
@media screen and (min-width: 1035px) {
  .table {
    display: table;
    width: 90%;
    margin: 0 auto;
    .table_row {
      display: table-row;
      width: 100%;
    }
  }
}
</style>
<template>
  <div class="table">
    <div v-if="!isLoading" class="table_row">
      <UColumns />
    </div>
    <ULoader v-if="isLoading" />
  </div>
</template>
<script setup>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const isLoading = ref(computed(() => store.state.isLoading));
onMounted(() => {
  store.dispatch("startGetRequest");
});
</script>

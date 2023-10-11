<style scoped>
.UButton{
    padding: 10px;
    width: 100px;
    font-size: 14px;
    color:white;
    background: rgb(210, 2, 210);
    border:solid 1px rgb(210, 2, 210);
    border-radius: 5px;
    margin-bottom: 2px;
}
.UButton:active{
    background: rgb(220, 70, 220);
    border:solid 1px rgb(211, 87, 211);
}
</style>
<template>
    <button class="UButton">
        <slot></slot>
    </button>
</template>
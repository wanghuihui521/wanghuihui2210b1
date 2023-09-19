<template>
  <div class="welcome">
    <h2>欢迎来到小实训电商管理平台</h2>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<style lang="scss" scoped>

.welcome{
    background-color: #e9eef3;
    width: 100%;
    height: 100%;
    overflow: hidden;
    h2{
        margin: 20px 0 0 20px;
    }
}
</style>
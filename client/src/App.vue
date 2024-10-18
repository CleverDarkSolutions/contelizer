<template>
  <div id="app">
    <div class="header">
      <div class="task-header">
        Task 1
        <button @click="showTask = 1">Show</button>
      </div>
      <div class="task-header">
        Task 2
        <button @click="showTask = 2">Show</button>
      </div>
      <div class="task-header">
        Task 3
        <button @click="showTask = 3">Show</button>
      </div>
    </div>
    <br/>

    <div class="container">
      <TaskOne v-if="showTask === 1" />
      <TaskTwo v-if="showTask === 2" />
      <TaskThree v-if="showTask === 3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskOne from "@/components/TaskOne.vue";
import TaskTwo from "@/components/TaskTwo.vue";
import TaskThree from "@/components/TaskThree.vue";
import { ref } from "vue";

const showTask = ref(0);
</script>

<style scoped>
#app {
  display: grid;
  min-height: 100vh;
  justify-items: center;
  align-items: start;
  gap: 20px;
  margin: auto;
}

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #ccc;
}

.task-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>

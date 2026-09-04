<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useTodos } from './composables/useTodos';

const {
  allTodosCount,
  completeTodosCount,
  incompleteTodosCount,
  state,
  setFilterStatus,
} = useTodos();
</script>

<template>
  <div class="app-shell">
    <Header logo-text="TaskRat" :all-todos-count="allTodosCount"
      :complete-todos-count="completeTodosCount" :incomplete-todos-count="incompleteTodosCount"
      :active-status="state.filterStatus" @filter-status="setFilterStatus" />

    <main class="app-content">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.app-content > * {
  flex: 1;
}
</style>
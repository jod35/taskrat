<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useTodos } from '../composables/useTodos';

const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  }
})

const router = useRouter();
const { getTodoById, updateTodo, deleteTodo } = useTodos();

const todo = computed(() => getTodoById(props.id));

const isOverdue = () => {
  if (!todo.value || todo.value.public || !todo.value.dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(todo.value.dueDate) < today;
}

function onDelete() {
  if (todo.value) deleteTodo(todo.value.id);
  router.push('/');
}
</script>

<template>
  <div class="container detail-container">
    <a class="waves-effect waves-light btn-flat page-btn back-btn" @click="router.push('/')">
      <i class="material-icons">arrow_back</i>Back to tasks
    </a>

    <div v-if="todo" :class="['card hoverable detail-card', todo.public ? 'completed' : 'incomplete']">
      <div class="card-content">
        <div class="title-row">
          <h4 class="card-title white-text bold">{{ todo.title }}</h4>
          <span :class="['priority-badge', `priority-${todo.priority}`]">
            {{ todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1) }}
          </span>
        </div>

        <div class="meta-badges">
          <span class="date-badge">
            <i class="material-icons date-icon">calendar_today</i>
            Created: {{ todo.createdAt }}
          </span>
          <span class="date-badge">
            <i class="material-icons date-icon">event</i>
            Due: {{ todo.dueDate }}
            <i v-if="isOverdue()" class="material-icons date-icon warning-icon">warning</i>
          </span>
          <span class="date-badge">
            <i class="material-icons date-icon">flag</i>
            {{ todo.public ? 'Completed' : 'Pending' }}
          </span>
        </div>

        <hr class="divider">

        <h6 class="detail-label">Details</h6>
        <p class="white-text detail-text">{{ todo.detail || 'No additional details provided.' }}</p>
      </div>
      <div :class="['card-action', todo.public ? 'action-complete' : 'action-incomplete']">
        <a class="cursor-pointer waves-effect waves-light btn-flat" @click="updateTodo(todo.id)">
          <i v-if="todo.public" class="material-icons white-text">remove_done</i>
          <i v-else class="material-icons white-text">done</i>
          <span class="white-text action-label">{{ todo.public ? 'Mark as pending' : 'Mark as done' }}</span>
        </a>
        <a class="cursor-pointer waves-effect waves-light btn-flat" @click="onDelete">
          <i class="material-icons white-text">delete</i>
          <span class="white-text action-label">Delete task</span>
        </a>
      </div>
    </div>

    <div v-else class="card-panel center-align grey lighten-4 empty-state">
      <i class="material-icons grey-text empty-icon">search_off</i>
      <h5 class="grey-text text-darken-1 empty-title">Task not found</h5>
      <p class="grey-text">This task may have been deleted.</p>
      <a class="waves-effect waves-light btn red" @click="router.push('/')">
        <i class="material-icons left">arrow_back</i>Back to tasks
      </a>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  margin-top: 30px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  border-radius: 20px;
  text-transform: none;
  color: #c62828;
  font-weight: 500;
  margin-bottom: 16px;
}

.detail-card {
  border-radius: 12px;
  overflow: hidden;
}

.incomplete {
  background-color: #ef5350;
}

.completed {
  background-color: #2e7d32;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.bold {
  font-weight: 500;
}

.card-title {
  margin: 0;
  font-size: 1.8rem;
}

.priority-badge {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.priority-high {
  background: rgba(255, 255, 255, 0.3);
  color: #ffcdd2;
}

.priority-medium {
  background: rgba(255, 255, 255, 0.2);
  color: #ffe0b2;
}

.priority-low {
  background: rgba(255, 255, 255, 0.2);
  color: #c8e6c9;
}

.meta-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.date-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.15);
  padding: 4px 10px;
  border-radius: 4px;
  width: fit-content;
}

.date-badge .warning-icon {
  color: #ffcdd2;
}

.date-icon {
  font-size: 14px;
  vertical-align: middle;
}

.warning-icon {
  margin-left: 2px;
}

.divider {
  margin: 20px 0;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
}

.detail-label {
  margin: 0 0 8px 0;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

.detail-text {
  opacity: 0.92;
  font-size: 1rem;
  line-height: 1.6;
}

.action-complete {
  background-color: #2e7d32;
}

.action-incomplete {
  background-color: #ef5350;
}

.card-action {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  gap: 8px;
}

.card-action a {
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.action-label {
  font-weight: 500;
}

.cursor-pointer {
  cursor: pointer;
}

.empty-state {
  border-radius: 8px;
  padding: 40px 20px;
}

.empty-icon {
  font-size: 64px;
}

.empty-title {
  margin-top: 12px;
}
</style>
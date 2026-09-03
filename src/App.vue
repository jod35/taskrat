<script setup>
import { computed, reactive } from 'vue';

import Header from './components/Header.vue';
import TodoListItem from './components/TodoListItem.vue';

const state = reactive({
  title: "",
  detail: "",
  dueDate: "",
  todoItems: [],
  editing: false
})

function submitForm() {
  if (state.title.trim() === "") {
    M.toast({ html: 'Title should not be left empty', classes: 'red rounded' });
    return;
  }
  if (!state.dueDate) {
    M.toast({ html: 'Please select a due date', classes: 'red rounded' });
    return;
  }
  const now = new Date();
  const createdAt = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
  state.todoItems.push({
    title: state.title,
    detail: state.detail,
    createdAt,
    dueDate: state.dueDate,
    public: false,
    id: state.todoItems.length + 1
  })
  resetForm()
}

function updateTodo(todoId) {
  let todo = state.todoItems.find(todo => todo.id === todoId)
  todo.public = !todo.public
}

function deleteTodo(todoId) {
  state.todoItems = state.todoItems.filter(t => t.id != todoId)
}

function toggleTodoForm() {
  state.editing = true
}

function closeTodoForm() {
  state.editing = false
  resetForm()
}

function resetForm() {
  state.title = ""
  state.detail = ""
  state.dueDate = ""
  state.editing = false
}

function resetAllTodos() {
  if (state.todoItems.length === 0) {
    M.toast({ html: 'No tasks to reset', classes: 'grey rounded' });
    return;
  }
  state.todoItems = []
}

const reversedTodos = computed(() => { return [...state.todoItems].reverse() })
const allTodosCount = computed(() => { return state.todoItems.length })
const completeTodosCount = computed(() => { return state.todoItems.filter((a) => a.public === true).length })
const incompleteTodosCount = computed(() => { return state.todoItems.filter((a) => a.public === false).length })
const todosExit = computed(() => { return state.todoItems.length > 0 })
</script>

<template>
  <div>
    <Header logo-text="TaskRat" :all-todos-count="allTodosCount"
      :complete-todos-count="completeTodosCount" :incomplete-todos-count="incompleteTodosCount" />

    <div class="container">
      <div class="row" style="margin-top: 30px;">
        <aside class="col l4 m12 s12">
          <div class="card-panel z-depth-1" style="border-radius: 8px;">
            <h5 class="grey-text text-darken-3" style="margin-top: 0; font-weight: 500;">New Task</h5>

            <a v-if="!state.editing" class="waves-effect waves-light btn red" style="width: 100%; margin-bottom: 12px;"
              @click="toggleTodoForm">
              <i class="material-icons left">add</i>Add Task
            </a>

            <form v-if="state.editing" @submit.prevent="submitForm" style="margin-top: 8px;">
              <div class="input-field">
                <input type="text" id="title" v-model="state.title" class="validate" length="50">
                <label for="title">Title</label>
              </div>
              <div class="input-field">
                <textarea id="detail" class="materialize-textarea validate" v-model="state.detail"
                  length="200"></textarea>
                <label for="detail">Detail</label>
              </div>
              <div class="input-field">
                <input type="date" id="dueDate" v-model="state.dueDate" required>
                <label for="dueDate">Due Date</label>
              </div>
              <div style="display: flex; gap: 10px; margin-top: 16px;">
                <button type="submit" class="btn waves-effect waves-light red" style="flex: 1;">
                  <i class="material-icons left">add_task</i>Add
                </button>
                <button type="button" class="btn waves-effect waves-light grey" style="flex: 1;"
                  @click="closeTodoForm">
                  Cancel
                </button>
              </div>
            </form>

            <hr v-if="state.editing" style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">

            <a class="waves-effect waves-light btn-flat blue-grey-text" style="width: 100%; margin-top: 4px;"
              @click="resetAllTodos">
              <i class="material-icons left">restart_alt</i>Reset All
            </a>
          </div>
        </aside>

        <main class="col l8 m12 s12">
          <div v-if="todosExit" class="todo-items-row" style="margin-top: 0;">
            <TodoListItem v-for="todo in reversedTodos" :todo="todo" :key="todo.id" :public="todo.public"
              :id="todo.id" :title="todo.title" :detail="todo.detail"
              :created-at="todo.createdAt" :due-date="todo.dueDate"
              :update-func="() => updateTodo(todo.id)" :delete-func="() => deleteTodo(todo.id)" />
          </div>

          <div v-else class="card-panel center-align grey lighten-4" style="border-radius: 8px; padding: 40px 20px;">
            <i class="material-icons grey-text" style="font-size: 64px;">task_alt</i>
            <h5 class="grey-text text-darken-1" style="margin-top: 12px;">No tasks yet</h5>
            <p class="grey-text">Click "Add Task" to get started</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}

.row > aside,
.row > main {
  display: flex;
  flex-direction: column;
}

.card-panel {
  border-radius: 8px;
}

.todo-items-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>

<script setup>
import { computed, reactive, nextTick, watch } from 'vue';

import Header from './components/Header.vue';
import TodoListItem from './components/TodoListItem.vue';

const state = reactive({
  title: "",
  detail: "",
  dueDate: "",
  priority: "medium",
  todoItems: [],
  editing: false,
  filterPriority: "all",
  filterDue: "all",
  filterStatus: "all"
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
    priority: state.priority,
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

watch(() => state.editing, (val) => {
  if (val) {
    nextTick(() => {
      const select = document.querySelector('#priority-select');
      if (select) M.FormSelect.init(select);
    })
  }
})

function resetForm() {
  state.title = ""
  state.detail = ""
  state.dueDate = ""
  state.priority = "medium"
  state.editing = false
}

function resetAllTodos() {
  if (state.todoItems.length === 0) {
    M.toast({ html: 'No tasks to reset', classes: 'grey rounded' });
    return;
  }
  state.todoItems = []
}

function setFilterPriority(val) {
  state.filterPriority = val
}

function setFilterDue(val) {
  state.filterDue = val
}

function setFilterStatus(val) {
  state.filterStatus = val
}

const allTodosCount = computed(() => { return state.todoItems.length })
const completeTodosCount = computed(() => { return state.todoItems.filter((a) => a.public === true).length })
const incompleteTodosCount = computed(() => { return state.todoItems.filter((a) => a.public === false).length })
const todosExit = computed(() => { return state.todoItems.length > 0 })

const filteredTodos = computed(() => {
  let todos = [...state.todoItems]

  if (state.filterStatus !== "all") {
    if (state.filterStatus === "pending") {
      todos = todos.filter(t => t.public === false)
    } else if (state.filterStatus === "complete") {
      todos = todos.filter(t => t.public === true)
    }
  }

  if (state.filterPriority !== "all") {
    todos = todos.filter(t => t.priority === state.filterPriority)
  }

  if (state.filterDue !== "all") {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (state.filterDue === "today") {
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
      todos = todos.filter(t => t.dueDate === todayStr)
    } else if (state.filterDue === "week") {
      const weekEnd = new Date(today)
      weekEnd.setDate(weekEnd.getDate() + 7)
      todos = todos.filter(t => {
        const d = new Date(t.dueDate)
        return d >= today && d <= weekEnd
      })
    } else if (state.filterDue === "overdue") {
      todos = todos.filter(t => {
        const d = new Date(t.dueDate)
        return d < today && !t.public
      })
    }
  }

  return [...todos].reverse()
})

const groupedTodos = computed(() => {
  const groups = {
    high: filteredTodos.value.filter(t => t.priority === "high"),
    medium: filteredTodos.value.filter(t => t.priority === "medium"),
    low: filteredTodos.value.filter(t => t.priority === "low")
  }
  return groups
})

const hasFilteredResults = computed(() => {
  return filteredTodos.value.length > 0
})

const anyFilterActive = computed(() => {
  return state.filterPriority !== "all" || state.filterDue !== "all" || state.filterStatus !== "all"
})
</script>

<template>
  <div>
    <Header logo-text="TaskRat" :all-todos-count="allTodosCount"
      :complete-todos-count="completeTodosCount" :incomplete-todos-count="incompleteTodosCount"
      :active-status="state.filterStatus" @filter-status="setFilterStatus" />

    <div class="container">
      <div class="row main-row">
        <aside class="col l4 m12 s12">
          <div class="card-panel z-depth-1 sidebar-panel">
            <h5 class="grey-text text-darken-3 form-title">New Task</h5>

            <a v-if="!state.editing" class="waves-effect waves-light btn red full-btn add-btn"
              @click="toggleTodoForm">
              <i class="material-icons left">add</i>Add Task
            </a>

            <form v-if="state.editing" @submit.prevent="submitForm" class="task-form">
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
              <div class="input-field">
                <select id="priority-select" v-model="state.priority">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <label for="priority-select">Priority</label>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn waves-effect waves-light red btn-half">
                  <i class="material-icons left">add_task</i>Add
                </button>
                <button type="button" class="btn waves-effect waves-light grey btn-half"
                  @click="closeTodoForm">
                  Cancel
                </button>
              </div>
            </form>

            <hr v-if="state.editing" class="form-divider">

            <a class="waves-effect waves-light btn-flat blue-grey-text full-btn reset-btn"
              @click="resetAllTodos">
              <i class="material-icons left">restart_alt</i>Reset All
            </a>
          </div>
        </aside>

        <main class="col l8 m12 s12">
          <div v-if="todosExit" class="filters-bar">
            <div class="filter-group">
              <span class="filter-label">Priority:</span>
              <a :class="['waves-effect waves-light btn-flat filter-chip', state.filterPriority === 'all' ? 'active' : '']"
                @click="setFilterPriority('all')">All</a>
              <a :class="['waves-effect waves-light btn-flat filter-chip chip-high', state.filterPriority === 'high' ? 'active' : '']"
                @click="setFilterPriority('high')">High</a>
              <a :class="['waves-effect waves-light btn-flat filter-chip chip-medium', state.filterPriority === 'medium' ? 'active' : '']"
                @click="setFilterPriority('medium')">Medium</a>
              <a :class="['waves-effect waves-light btn-flat filter-chip chip-low', state.filterPriority === 'low' ? 'active' : '']"
                @click="setFilterPriority('low')">Low</a>
            </div>
            <div class="filter-group">
              <span class="filter-label">Due:</span>
              <a :class="['waves-effect waves-light btn-flat filter-chip', state.filterDue === 'all' ? 'active' : '']"
                @click="setFilterDue('all')">All</a>
              <a :class="['waves-effect waves-light btn-flat filter-chip', state.filterDue === 'today' ? 'active' : '']"
                @click="setFilterDue('today')">Today</a>
              <a :class="['waves-effect waves-light btn-flat filter-chip', state.filterDue === 'week' ? 'active' : '']"
                @click="setFilterDue('week')">This Week</a>
              <a :class="['waves-effect waves-light btn-flat filter-chip', state.filterDue === 'overdue' ? 'active' : '']"
                @click="setFilterDue('overdue')">Overdue</a>
            </div>
          </div>

          <div v-if="todosExit && hasFilteredResults" class="grouped-tasks">
            <div v-for="(tasks, priority) in groupedTodos" :key="priority" class="priority-group"
              v-show="tasks.length > 0">
              <h6 :class="['group-header', `group-${priority}`]">
                <span :class="['priority-dot', `dot-${priority}`]"></span>
                {{ priority.charAt(0).toUpperCase() + priority.slice(1) }} ({{ tasks.length }})
              </h6>
              <div class="todo-items-row">
                <TodoListItem v-for="todo in tasks" :todo="todo" :key="todo.id" :public="todo.public"
                  :id="todo.id" :title="todo.title" :detail="todo.detail"
                  :created-at="todo.createdAt" :due-date="todo.dueDate" :priority="todo.priority"
                  :update-func="() => updateTodo(todo.id)" :delete-func="() => deleteTodo(todo.id)" />
              </div>
            </div>
          </div>

          <div v-else-if="todosExit && !hasFilteredResults && anyFilterActive"
            class="card-panel center-align grey lighten-4 empty-state">
            <i class="material-icons grey-text empty-icon">filter_list_off</i>
            <h5 class="grey-text text-darken-1 empty-title">No matching tasks</h5>
            <p class="grey-text">Try adjusting your filters</p>
          </div>

          <div v-else-if="!todosExit" class="card-panel center-align grey lighten-4 empty-state">
            <i class="material-icons grey-text empty-icon">task_alt</i>
            <h5 class="grey-text text-darken-1 empty-title">No tasks yet</h5>
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

.main-row {
  margin-top: 30px;
}

.row > aside,
.row > main {
  display: flex;
  flex-direction: column;
}

.sidebar-panel {
  border-radius: 8px;
}

.form-title {
  margin-top: 0;
  font-weight: 500;
}

.full-btn {
  width: 100%;
}

.add-btn {
  margin-bottom: 12px;
}

.task-form {
  margin-top: 8px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.btn-half {
  flex: 1;
}

.form-divider {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #e0e0e0;
}

.reset-btn {
  margin-top: 4px;
}

.filters-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #757575;
  margin-right: 4px;
}

.filter-chip {
  padding: 0 12px;
  height: 32px;
  line-height: 32px;
  border-radius: 16px;
  font-size: 0.8rem;
  text-transform: none;
  background: #f5f5f5;
  color: #616161;
  cursor: pointer;
}

.filter-chip.active {
  background: #263238;
  color: white;
}

.filter-chip.chip-high.active {
  background: #c62828;
}

.filter-chip.chip-medium.active {
  background: #ef6c00;
}

.filter-chip.chip-low.active {
  background: #2e7d32;
}

.grouped-tasks {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.priority-group {
  display: flex;
  flex-direction: column;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #424242;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 2px solid #e0e0e0;
}

.group-high {
  border-bottom-color: #c62828;
  color: #c62828;
}

.group-medium {
  border-bottom-color: #ef6c00;
  color: #ef6c00;
}

.group-low {
  border-bottom-color: #2e7d32;
  color: #2e7d32;
}

.priority-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.dot-high {
  background-color: #c62828;
}

.dot-medium {
  background-color: #ef6c00;
}

.dot-low {
  background-color: #2e7d32;
}

.todo-items-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 0;
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

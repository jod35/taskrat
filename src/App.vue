<script setup>
import { ref, computed, reactive, toRef } from 'vue';


const state = reactive(
  {
    title: "",
    detail: "",
    todoItems: [],
    checked: false
  }
)


function submitForm() {
  if (state.title === "") {
    alert("Title text should not be left out");
  }
  else {
    console.log(`Adding ${state.title}`)
    state.todoItems.push({ title: state.title, detail: state.detail, public: false, id: state.todoItems.length + 1 })
    console.log(`todoItems ${JSON.stringify(state.todoItems)}`)

  }
  state.title = ""
  state.detail = ""
  state.checked = false
}


function updateTodo(todoId) {
  let todo = state.todoItems.find(todo => todo.id === todoId)
  console.log(`Todo ID ${JSON.stringify(todo)}`)
  todo.public = !todo.public
}

function deteTodo(todoId) {
  console.log(`Todo ID ${todoId}`)
  state.todoItems = state.todoItems.filter(t => t.id != todoId)
}

function resetAllTodos() {
  state.todoItems = []
}


const allTodosCount = computed(() => { return state.todoItems.length })
const completeTodosCount = computed(() => { return state.todoItems.filter((a) => a.public === true).length })
const incompleteTodosCount = computed(() => { return state.todoItems.filter((a) => a.public === false).length })
const postsExit = computed(() => { return state.todoItems.length > 0 })
</script>

<template>
  <div class="container">
    <header>
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">To Do Tasks ({{ allTodosCount }})</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="#" class="font-weight-bold">Incomplete Task: {{ incompleteTodosCount }}</a></li>
            <li><a href="#" class="font-weight-bold">Complete tasks: {{ completeTodosCount }}</a></li>
          </ul>
        </div>
      </nav>
    </header>
    <div class="row mt-2">
      <aside class="col l3 m12 s12">
        <h3>Add Task</h3>
        <form @submit.prevent="submitForm">
          <div class="input-field col s12">
            <label for="text">Title: </label>
            <input type="text" name="text" id="text" v-model="state.title" class="form-control">
          </div>
          <div class="input-field col s12">
            <label for="detail">Detail: </label>
            <textarea name="detail" id="detail" class="materialize-textarea" v-model="state.detail"></textarea>
          </div>
          <div class="input-field col s12">
            <input type="submit" value="Add Item " class="btn red">
            <input type="button" value="Reset List" class="btn blue ml-2" @click="resetAllTodos">
          </div>
        </form>
      </aside>
      <main class="col l9 m12 s12">

        <div class="todo-items" v-if="postsExit">
          <div v-for="todo in state.todoItems" :key="todo" :class="[todo.public ? 'card red' : 'card white']">
            <div class="card-content">
              <p :class="[todo.public ? 'white-text' : '', 'card-title', 'font-weight-bold']">{{ todo.title }}</p>
              <p :class="[todo.public ? 'white-text' : '']">{{ todo.detail }}</p>
            </div>

            <div class="card-action">
              <a @click="updateTodo(todo.id)" :class="[todo.public ? 'text-red' : 'text-yellow', 'cursor-pointer']">{{
                todo.public ?
                  "Done" : "Mark as Done" }}</a>
              <a @click="deteTodo(todo.id)" class="cursor-pointer">Delete</a>
            </div>
          </div>
        </div>
        <h3 v-else align="center" class="mt-2">No todo Items yet</h3>
      </main>
    </div>
  </div>

</template>



<style scoped>
.mt-2 {
  margin-top: 20px;
}

.cursor-pointer {
  cursor: pointer;
}

.font-weight-bold {
  font-weight: bold;
}

.ml-2 {
  margin-left: 15px;
}
</style>

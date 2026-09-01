<script setup>
import { ref, computed, reactive, toRef } from 'vue';

import Header from './components/Header.vue';
import TodoListItem from './components/TodoListItem.vue';


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

function deleteTodo(todoId) {
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
  <div>
    <Header logo-text="Todo List" :all-todos-count="allTodosCount" :complete-todos-count="completeTodosCount"
      :incomplete-todos-count="incompleteTodosCount"> </Header>

    <div class="row mt-2 container">
      <aside class="col l4 m12 s12">
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
      <main class="col l8 m12 s12">

        <div class="todo-items" v-if="postsExit">
          <TodoListItem v-for="todo in state.todoItems" :todo="todo" :key="todo.id" :public="todo.public" :id="todo.id" :title="todo.title"
            :detail="todo.detail" :update-func="() => updateTodo(todo.id)"
            :delete-func="() => deleteTodo(todo.id)">
          </TodoListItem>
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

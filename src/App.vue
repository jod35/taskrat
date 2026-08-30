<script setup>
import { ref, computed, reactive } from 'vue';


const state = reactive(
  {
    text: "",
    todoItems: [],
    checked: false
  }
)


function submitForm() {
  if (state.text === "") {
    alert("Both text and public must be submitted");
  }
  else {
    console.log(`Adding ${state.text}`)
    state.todoItems.push({ text: state.text, public: false, id: state.todoItems.length + 1 })
    console.log(`todoItems ${JSON.stringify(state.todoItems)}`)

  }
  state.text = ""
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


const allTodosCount = computed(() => { return state.todoItems.length })
const completeTodosCount = computed(() => { return state.todoItems.filter((a) => a.public === true).length })
const incompleteTodosCount = computed(() => { return state.todoItems.filter((a) => a.public === false).length })
</script>

<template>
  <header>
    <h1>To Do Tasks ({{ allTodosCount }})</h1>
    <p>Incomplete Task: {{ incompleteTodosCount }} <span class="complete">Complete tasks: {{ completeTodosCount }}
      </span></p>
  </header>
  <div class="todo-container">
    <aside>
      <h2>Add Task</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="text">Text: </label>
          <input type="text" name="text" id="text" v-model="state.text" class="form-control">
        </div>
        <div class="form-group"><input type="submit" value="Add Item "></div>
      </form>
    </aside>
    <main>
      <div class="todo-items" v-if="state.todoItems">
        <div v-for="todo in state.todoItems" :key="todo" :class="[todo.public ? 'complete-border': 'todo-item']">
          <p :class="{ done: todo.public }">{{ todo.text }}</p>
          <div class="todo-options">
            <input type="checkbox" name="public" id="public" :checked="todo.public" @change="updateTodo(todo.id)" class="todo-complete">
            <input type="button" value="x" @click="deteTodo(todo.id)" class="todo-delete">
          </div>
        </div>
      </div>
      <p v-else>No todoItems yet</p>
    </main>
  </div>

</template>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
   font-family: "Valley Sans", sans-serif;
  font-optical-sizing: auto;
}

header {
  height: 10vh;
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

header p {
  margin-top: 10px;
  font-weight: bold;
}

.done {
  color: red;
  text-decoration: line-through;
}

.complete {
  color: red;
}

.complete-border{
  border: 1px solid red;
  padding: 0.5rem;
  min-height: 1.0rem;
  border-radius: 5px;
}

.todo-container{
    display: flex;
    gap: 1rem;
    width: 100%;
    margin-top:0.5rem ;
}

aside{
  flex: 2;
  height: 100vh;
  padding: 1rem;
}

main{
  flex: 8;
}
.form-group{
  margin-top: 1.2rem;
}
.form-control{
  background-color: #fff;
  padding: 0.8rem;
  width: 100%;
  border: none;
  background-color: #e8e6e6;
  margin-top: 0.5em;
  border-radius: 5px;
}
.todo-items{
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.todo-item{
  padding: 0.5rem;
  min-height: 1.0rem;
  border: 0.05rem solid #000;
  border-radius: 5px;
}
.todo-options{
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
}

.todo-complete{
  transform: scale(1.5);
}

.todo-delete{
  padding: 8px;
  border: none;
  color: white;
  background-color: red;
  border-radius: 7px;
}
@media (max-width: 768px) {
    .todo-container {
        flex-direction: column;
    }

    aside,
    main {
        width: 100%;
    }

    header{
      flex-direction: column;
    }
}
</style>

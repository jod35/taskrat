<script setup>
import TodoListItem from './TodoListItem.vue';

defineProps({
    todoItems: Array
})


function updateTodo(todos, todoId) {
    let todo = todos.find(todo => todo.id === todoId)
    console.log(`Todo ID ${JSON.stringify(todo)}`)
    todo.public = !todo.public
}

function deleteTodo(todos, todoId) {
    console.log(`Todo ID ${todoId}`)
    todos = todos.filter(t => t.id != todoId)
}
</script>
<template>

</template>
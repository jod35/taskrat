import { createRouter, createWebHistory } from 'vue-router'

import TodoList from '../views/TodoList.vue'
import TodoDetail from '../views/TodoDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'todo-list',
      component: TodoList
    },
    {
      path: '/todo/:id',
      name: 'todo-detail',
      component: TodoDetail,
      props: true
    }
  ]
})

export default router
import { computed, reactive, watch } from 'vue'

const STORAGE_KEY = 'taskrat:todos'

const state = reactive({
  title: "",
  detail: "",
  dueDate: "",
  priority: "medium",
  todoItems: [],
  editing: false,
  filterPriority: "all",
  filterDue: "all",
  filterStatus: "all",
  currentPage: 1,
  itemsPerPage: 5
})

function saveTodos() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todoItems))
  } catch (e) {
    console.warn('Failed to save todos to localStorage', e)
  }
}

function loadTodos() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return
    // Validate shape – keep only objects that look like a todo
    const valid = parsed.filter(t => t && typeof t.id === 'number' && typeof t.title === 'string')
    // Normalize defaults for older persisted data
    const normalized = valid.map(t => ({
      title: t.title,
      detail: t.detail ?? "",
      createdAt: t.createdAt ?? "",
      dueDate: t.dueDate ?? "",
      priority: t.priority ?? "medium",
      public: t.public ?? false,
      id: t.id
    }))
    state.todoItems.splice(0, state.todoItems.length, ...normalized)
  } catch (e) {
    console.warn('Failed to load todos from localStorage', e)
  }
}

// Hydrate immediately on module import (client-side)
loadTodos()

// Persist on any deep change to todoItems – single watcher for the singleton state
// flush:'sync' ensures storage is updated immediately before user leaves the tab
watch(() => state.todoItems, saveTodos, { deep: true, flush: 'sync' })

export function useTodos() {
  function submitForm() {
    if (state.title.trim() === "") {
      M.toast({ html: 'Title should not be left empty', classes: 'red rounded' });
      return false;
    }
    if (!state.dueDate) {
      M.toast({ html: 'Please select a due date', classes: 'red rounded' });
      return false;
    }
    const now = new Date();
    const createdAt = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    const nextId = state.todoItems.length ? Math.max(...state.todoItems.map(t => t.id)) + 1 : 1
    state.todoItems.push({
      title: state.title,
      detail: state.detail,
      createdAt,
      dueDate: state.dueDate,
      priority: state.priority,
      public: false,
      id: nextId
    })
    resetForm()
    return true;
  }

  function updateTodo(todoId) {
    const todo = state.todoItems.find(todo => todo.id === todoId)
    if (todo) todo.public = !todo.public
  }

  function deleteTodo(todoId) {
    state.todoItems = state.todoItems.filter(t => t.id != todoId)
  }

  function getTodoById(id) {
    const numId = Number(id)
    return state.todoItems.find(t => t.id === numId)
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
    state.currentPage = 1
  }

  function setFilterDue(val) {
    state.filterDue = val
    state.currentPage = 1
  }

  function setFilterStatus(val) {
    state.filterStatus = val
    state.currentPage = 1
  }

  function goToPage(page) {
    const max = Math.ceil(filteredTodos.value.length / state.itemsPerPage)
    state.currentPage = Math.max(1, Math.min(page, max))
  }

  function prevPage() {
    goToPage(state.currentPage - 1)
  }

  function nextPage() {
    goToPage(state.currentPage + 1)
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

  const hasFilteredResults = computed(() => {
    return filteredTodos.value.length > 0
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredTodos.value.length / state.itemsPerPage)
  })

  const paginatedTodos = computed(() => {
    const start = (state.currentPage - 1) * state.itemsPerPage
    return filteredTodos.value.slice(start, start + state.itemsPerPage)
  })

  const groupedTodos = computed(() => {
    const groups = {
      high: paginatedTodos.value.filter(t => t.priority === "high"),
      medium: paginatedTodos.value.filter(t => t.priority === "medium"),
      low: paginatedTodos.value.filter(t => t.priority === "low")
    }
    return groups
  })

  const showPagination = computed(() => {
    return hasFilteredResults.value
  })

  const anyFilterActive = computed(() => {
    return state.filterPriority !== "all" || state.filterDue !== "all" || state.filterStatus !== "all"
  })

  return {
    state,
    submitForm,
    updateTodo,
    deleteTodo,
    getTodoById,
    toggleTodoForm,
    closeTodoForm,
    resetAllTodos,
    setFilterPriority,
    setFilterDue,
    setFilterStatus,
    goToPage,
    prevPage,
    nextPage,
    allTodosCount,
    completeTodosCount,
    incompleteTodosCount,
    todosExit,
    filteredTodos,
    hasFilteredResults,
    totalPages,
    paginatedTodos,
    groupedTodos,
    showPagination,
    anyFilterActive
  }
}
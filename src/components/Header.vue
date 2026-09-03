<script setup>
defineProps({
    logoText: String,
    allTodosCount: Number,
    incompleteTodosCount: Number,
    completeTodosCount: Number,
    activeStatus: String
})

const emit = defineEmits(['filter-status'])
</script>

<template>
    <header>
        <nav class="red darken-1">
            <div class="nav-wrapper container">
                <a href="#" class="brand-logo padded">{{ logoText }}</a>
                <ul class="right hide-on-small-and-down">
                    <li>
                        <a :class="['white-text', 'count-link', activeStatus === 'all' ? 'active' : '']"
                            @click="emit('filter-status', 'all')">
                            <i class="material-icons left">assignment</i>{{ allTodosCount }}
                        </a>
                    </li>
                    <li>
                        <a :class="['white-text', 'count-link', activeStatus === 'pending' ? 'active' : '']"
                            @click="emit('filter-status', 'pending')">
                            <i class="material-icons left">pending_actions</i>{{ incompleteTodosCount }}
                        </a>
                    </li>
                    <li>
                        <a :class="['white-text', 'count-link', activeStatus === 'complete' ? 'active' : '']"
                            @click="emit('filter-status', 'complete')">
                            <i class="material-icons left">task_alt</i>{{ completeTodosCount }}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="counts-bar red darken-2 hide-on-med-and-up">
            <div class="container counts-inner">
                <span :class="['count-item', activeStatus === 'all' ? 'active' : '']"
                    @click="emit('filter-status', 'all')">
                    <i class="material-icons count-icon">assignment</i>{{ allTodosCount }} Total
                </span>
                <span :class="['count-item', activeStatus === 'pending' ? 'active' : '']"
                    @click="emit('filter-status', 'pending')">
                    <i class="material-icons count-icon">pending_actions</i>{{ incompleteTodosCount }} Pending
                </span>
                <span :class="['count-item', activeStatus === 'complete' ? 'active' : '']"
                    @click="emit('filter-status', 'complete')">
                    <i class="material-icons count-icon">task_alt</i>{{ completeTodosCount }} Done
                </span>
            </div>
        </div>
    </header>
</template>

<style scoped>
nav {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.padded {
    padding-left: 16px;
}

.count-link {
    cursor: pointer;
    padding: 0 15px;
    height: 100%;
    display: flex;
    align-items: center;
    border-bottom: 3px solid transparent;
    transition: border-color 0.2s;
}

.count-link:hover {
    background: rgba(255, 255, 255, 0.1);
}

.count-link.active {
    border-bottom-color: white;
}

.counts-bar {
    padding: 6px 0;
    cursor: pointer;
}

.counts-inner {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.count-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: white;
    font-size: 0.85rem;
    padding: 4px 10px;
    border-radius: 4px;
    transition: background 0.2s;
}

.count-item:hover {
    background: rgba(255, 255, 255, 0.1);
}

.count-item.active {
    background: rgba(255, 255, 255, 0.2);
    font-weight: 500;
}

.count-icon {
    font-size: 18px;
    opacity: 0.85;
}
</style>

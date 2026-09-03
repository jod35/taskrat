<script setup>
defineProps({ logoText: String, allTodosCount: Number, incompleteTodosCount: Number, completeTodosCount: Number })
</script>

<template>
    <header>
        <nav class="red darken-1">
            <div class="nav-wrapper container">
                <a href="#" class="brand-logo padded">{{ logoText }}</a>
                <ul class="right hide-on-small-and-down">
                    <li>
                        <a class="white-text no-hover">
                            <i class="material-icons left">assignment</i>{{ allTodosCount }}
                        </a>
                    </li>
                    <li>
                        <a class="white-text no-hover">
                            <i class="material-icons left">pending_actions</i>{{ incompleteTodosCount }}
                        </a>
                    </li>
                    <li>
                        <a class="white-text no-hover">
                            <i class="material-icons left">task_alt</i>{{ completeTodosCount }}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="counts-bar red darken-2 hide-on-med-and-up">
            <div class="container counts-inner">
                <span class="count-item">
                    <i class="material-icons count-icon">assignment</i>{{ allTodosCount }} Total
                </span>
                <span class="count-item">
                    <i class="material-icons count-icon">pending_actions</i>{{ incompleteTodosCount }} Pending
                </span>
                <span class="count-item">
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

.no-hover {
    cursor: default;
}

.counts-bar {
    padding: 6px 0;
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
}

.count-icon {
    font-size: 18px;
    opacity: 0.85;
}
</style>

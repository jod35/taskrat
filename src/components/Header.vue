<script setup>
defineProps({ logoText: String, allTodosCount: Number, incompleteTodosCount: Number, completeTodosCount: Number })
</script>

<template>
    <header>
        <nav class="red darken-1">
            <div class="nav-wrapper container">
                <a href="#" class="brand-logo" style="padding-left: 16px;">{{ logoText }}</a>
                <ul class="right">
                    <li>
                        <a class="white-text" style="cursor: default;">
                            <i class="material-icons left">assignment</i>{{ allTodosCount }}
                        </a>
                    </li>
                    <li>
                        <a class="white-text" style="cursor: default;">
                            <i class="material-icons left">pending_actions</i>{{ incompleteTodosCount }}
                        </a>
                    </li>
                    <li>
                        <a class="white-text" style="cursor: default;">
                            <i class="material-icons left">task_alt</i>{{ completeTodosCount }}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<style scoped>
nav {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>

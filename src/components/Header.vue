<script setup>
defineProps({ logoText: String, allTodosCount: Number, incompleteTodosCount: Number, completeTodosCount: Number })
</script>

<template>
    <header>
        <nav>
            <div class="nav-wrapper">
                <a href="#" class="brand-logo">{{ logoText }} ({{ allTodosCount }})</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a href="#" class="font-weight-bold">Incomplete Task: {{ incompleteTodosCount }}</a></li>
                    <li><a href="#" class="font-weight-bold">Complete tasks: {{ completeTodosCount }}</a></li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<style scoped></style>
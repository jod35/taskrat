<template>
    <footer class="app-footer red darken-1">
        <div class="container footer-inner">
            <span class="material-icons footer-icon">task_alt</span>
            <span class="white-text">TaskRat &copy; {{ currentYear }} &mdash; Get things done</span>
        </div>
    </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
    margin-top: 40px;
    padding: 24px 0;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
}

.footer-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 0.95rem;
}

.footer-icon {
    font-size: 18px;
    opacity: 0.9;
}
</style>

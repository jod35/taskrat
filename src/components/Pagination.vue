<script setup>
defineProps({
    currentPage: Number,
    totalPages: Number
})
</script>
<template>
    <div class="pagination">
        <button @click="currentPage--" class="btn red mr-2" :disabled="currentPage === 1">
            Previous
        </button>

        <span>
            Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button @click="currentPage++" class="btn red ml-2" :disabled="currentPage === totalPages">
            Next
        </button>
    </div>
</template>
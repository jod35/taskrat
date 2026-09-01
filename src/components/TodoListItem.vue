<script setup>
defineProps({
    public: Boolean,
    title: String,
    detail: String,
    id: Number,
    updateFunc: Function,
    deleteFunc: Function,
    todo: Object
})
</script>
<template>
    <div :class="[todo.public ? 'card red' : 'card white']">
        <div class="card-content">
            <p :class="[public ? 'white-text' : '', 'card-title', 'font-weight-bold']">{{ title }}</p>
            <p :class="[public ? 'white-text' : '']">{{ detail }}</p>
        </div>

        <div class="card-action">
            <a @click="updateFunc" :class="[todo.public ? 'text-red' : 'text-yellow', 'cursor-pointer']">
                <span v-if="public">
                    <i class="material-icons white-text">remove_done</i>
                </span>
                <span v-else>
                    <i class="material-icons text-yellow">done</i>
                </span>
            </a>
            <a @click="deleteFunc" class="cursor-pointer">
                <span v-if="public">
                    <i class="material-icons white-text">delete</i>
                </span>
                <span v-else>
                    <i class="material-icons text-yellow">delete</i>
                </span>
            </a>
        </div>
    </div>
</template>
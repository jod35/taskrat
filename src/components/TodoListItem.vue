<script setup>
const props = defineProps({
    public: Boolean,
    title: String,
    detail: String,
    createdAt: String,
    dueDate: String,
    priority: String,
    id: Number,
    updateFunc: Function,
    deleteFunc: Function,
    todo: Object
})

const isOverdue = () => {
    if (props.public || !props.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(props.dueDate) < today;
}
</script>
<template>
    <div
        :class="[todo.public ? 'card col l12 m4 s12 hoverable todo-card completed' : 'card col l12 m4 s12 hoverable todo-card incomplete']">
        <div class="card-content">
            <div class="title-row">
                <span class="card-title white-text bold">{{ title }}</span>
                <span class="date-badge created">
                    <i class="material-icons date-icon">calendar_today</i>
                    {{ createdAt }}
                </span>
            </div>
            <p class="white-text detail-text">{{ detail }}</p>
            <div class="card-footer">
                <span :class="['priority-badge', `priority-${priority}`]">
                    {{ priority.charAt(0).toUpperCase() + priority.slice(1) }}
                </span>
                <span :class="['date-badge', 'due', isOverdue() ? 'overdue' : '']">
                    <i class="material-icons date-icon">event</i>
                    Due: {{ dueDate }}
                    <i v-if="isOverdue()" class="material-icons date-icon warning-icon">warning</i>
                </span>
            </div>
        </div>
        <div :class="['card-action', todo.public ? 'action-complete' : 'action-incomplete']">
            <a @click="updateFunc" class="cursor-pointer waves-effect waves-light btn-flat">
                <i v-if="public" class="material-icons white-text">remove_done</i>
                <i v-else class="material-icons white-text">done</i>
            </a>
            <a @click="deleteFunc" class="cursor-pointer waves-effect waves-light btn-flat">
                <i class="material-icons white-text">delete</i>
            </a>
        </div>
    </div>
</template>

<style scoped>
.todo-card {
    border-radius: 8px;
    margin: 10px !important;
    overflow: hidden;
}

.incomplete {
    background-color: #c62828;
}

.completed {
    background-color: #2e7d32;
}

.title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 8px;
}

.bold {
    font-weight: 500;
}

.title-row .card-title {
    margin: 0;
    flex: 1;
}

.date-badge.created {
    font-size: 0.7rem;
    margin-top: 4px;
    flex-shrink: 0;
}

.card-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    flex-wrap: wrap;
}

.priority-badge {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.priority-high {
    background: rgba(255, 255, 255, 0.3);
    color: #ffcdd2;
}

.priority-medium {
    background: rgba(255, 255, 255, 0.2);
    color: #ffe0b2;
}

.priority-low {
    background: rgba(255, 255, 255, 0.2);
    color: #c8e6c9;
}

.date-badge.due {
    margin-top: 0;
}

.date-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.12);
    padding: 3px 8px;
    border-radius: 4px;
    width: fit-content;
}

.date-badge.overdue {
    color: #ffcdd2;
    background: rgba(255, 255, 255, 0.25);
    font-weight: 500;
}

.date-icon {
    font-size: 14px;
    vertical-align: middle;
}

.warning-icon {
    margin-left: 2px;
}

.detail-text {
    opacity: 0.9;
}

.action-complete {
    background-color: #2e7d32;
}

.action-incomplete {
    background-color: #c62828;
}

.card-action {
    border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.card-action a {
    padding: 0 12px;
}

.cursor-pointer {
    cursor: pointer;
}

.card-title {
    font-size: 1.2rem;
    margin-bottom: 8px;
}

.card-content p {
    font-size: 0.9rem;
    line-height: 1.4;
}
</style>

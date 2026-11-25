<script setup>
import { computed } from 'vue'

const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
})

const statusCode = computed(() => props.error?.statusCode || 500)
const message = computed(() => props.error?.message || props.error?.statusMessage || 'Что-то пошло не так')

useHead({
  title: `Ошибка ${statusCode.value} | Skypro.Music`,
})

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <h1 class="error__code">Ошибка {{ statusCode }}</h1>
      <p class="error__message">{{ message }}</p>
      <button class="error__back" type="button" @click="goHome">Вернуться на главную</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
}

.error__code {
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -0.8px;
  color: var(--color-accent);
  margin-bottom: 24px;
}

.error__message {
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  color: var(--color-text-primary);
  margin-bottom: 40px;
}

.error__back {
  padding: 12px 28px;
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-primary);
  transition:
    color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
}

.error__back:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
</style>

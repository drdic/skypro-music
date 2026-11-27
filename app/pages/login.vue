<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth.js'

definePageMeta({
  layout: 'auth',
  title: 'Вход',
})

useHead({
  title: 'Вход | Skypro.Music',
  meta: [{ name: 'description', content: 'Вход в личный кабинет Skypro.Music' }],
})

const router = useRouter()
const authStore = useAuthStore()

const errorMessage = ref('')

const loading = computed(() => authStore.loading)

onMounted(() => {
  authStore.init()
})

async function handleSubmit(payload) {
  errorMessage.value = ''

  const email = String(payload.email || '').trim()
  const password = String(payload.password || '')

  if (!email || !password) {
    throw showError({
      statusCode: 400,
      statusMessage: 'Некорректные данные',
      message: 'Заполните email и пароль',
      fatal: true,
    })
  }

  if (!email.includes('@') || email.length < 5) {
    errorMessage.value = 'Введите корректный email'
    return
  }

  if (password.length < 6) {
    errorMessage.value = 'Пароль должен содержать минимум 6 символов'
    return
  }

  const success = await authStore.login(email, password)

  if (!success) {
    errorMessage.value = authStore.error || 'Не удалось войти. Проверьте email и пароль'
    return
  }

  await router.push('/')
}
</script>

<template>
  <AuthForm
    mode="login"
    :loading="loading"
    :error-message="errorMessage"
    @submit="handleSubmit"
  />
</template>

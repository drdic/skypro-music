<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth.js'

definePageMeta({
  layout: 'auth',
  title: 'Регистрация',
})

useHead({
  title: 'Регистрация | Skypro.Music',
  meta: [{ name: 'description', content: 'Регистрация в Skypro.Music' }],
})

const router = useRouter()
const authStore = useAuthStore()

const USERNAME_PATTERN = /^[A-Za-z0-9@./+\-_]{3,}$/
const USERNAME_ERROR =
  'Имя может содержать только латинские буквы, цифры и символы @ . / + - _ (минимум 3 знака)'

const errorMessage = ref('')

const loading = computed(() => authStore.loading)

onMounted(() => {
  authStore.init()
})

async function handleSubmit(payload) {
  errorMessage.value = ''

  const email = String(payload.email || '').trim()
  const password = String(payload.password || '')
  const confirmPassword = String(payload.confirmPassword || '')
  const username = String(payload.username || '').trim() || email

  if (!email || !password || !confirmPassword) {
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

  if (payload.username && !USERNAME_PATTERN.test(username)) {
    errorMessage.value = USERNAME_ERROR
    return
  }

  if (password.length < 6) {
    errorMessage.value = 'Пароль должен содержать минимум 6 символов'
    return
  }

  if (password !== confirmPassword) {
    errorMessage.value = 'Пароли не совпадают'
    return
  }

  const success = await authStore.signup(email, password, username)

  if (!success) {
    errorMessage.value = authStore.error || 'Не удалось зарегистрироваться'
    return
  }

  await router.push('/login')
}
</script>

<template>
  <AuthForm
    mode="signup"
    :loading="loading"
    :error-message="errorMessage"
    @submit="handleSubmit"
  />
</template>

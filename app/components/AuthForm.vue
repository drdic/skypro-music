<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
  mode: {
    type: String,
    default: 'login',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['submit'])

const isSignup = computed(() => props.mode === 'signup')

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
})

const errorText = computed(() => props.errorMessage)

function handleSubmit() {
  emit('submit', {
    email: form.email,
    password: form.password,
    confirmPassword: form.confirmPassword,
    username: form.username,
  })
}
</script>

<template>
  <div class="modal__block">
    <form class="modal__form" novalidate @submit.prevent="handleSubmit">
      <NuxtLink class="modal__logo" to="/">
        <NuxtImg
          src="/img/logo_modal.png"
          alt="Логотип Skypro.Music"
          width="140"
          height="21"
          format="webp"
          :placeholder="[140, 21, 10]"
        />
      </NuxtLink>

      <input
        v-model="form.email"
        class="modal__input login"
        type="email"
        name="email"
        placeholder="Почта"
        autocomplete="email"
      />

      <input
        v-if="isSignup"
        v-model="form.username"
        class="modal__input"
        type="text"
        name="username"
        placeholder="Имя"
        autocomplete="username"
      />

      <input
        v-model="form.password"
        class="modal__input"
        type="password"
        name="password"
        placeholder="Пароль"
        autocomplete="current-password"
      />

      <input
        v-if="isSignup"
        v-model="form.confirmPassword"
        class="modal__input"
        type="password"
        name="confirmPassword"
        placeholder="Повторите пароль"
        autocomplete="new-password"
      />

      <div class="errorContainer">{{ errorText }}</div>

      <button class="modal__btnSignupEnt" type="submit" :disabled="loading">
        {{ isSignup ? 'Зарегистрироваться' : 'Войти' }}
      </button>

      <NuxtLink class="modal__btnSignup" :to="isSignup ? '/login' : '/signup'">
        {{ isSignup ? 'Войти' : 'Зарегистрироваться' }}
      </NuxtLink>
    </form>
  </div>
</template>

<style scoped>
.modal__block {
  position: absolute;
  z-index: 2;
  left: calc(50% - (366px / 2));
  top: calc(50% - (439px / 2));
}

.modal__form {
  width: 366px;
  background-color: #ffffff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 43px 44px 47px 40px;
}

.modal__logo {
  width: 140px;
  height: 21px;
  margin-bottom: 34px;
  background-color: transparent;
}

.modal__logo img {
  width: 140px;
  height: auto;
}

.modal__input {
  width: 100%;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #d0cece;
  padding: 8px 1px;
  margin-bottom: 30px;
  margin-right: 3px;
  background-color: transparent;
  color: #000000;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  outline: none;
}

.modal__input:focus {
  border-bottom-color: #580ea2;
}

.modal__input:-webkit-autofill {
  -webkit-text-fill-color: #000000;
  -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
}

.modal__input::placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #d0cece;
}

.errorContainer {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;
  color: red;
  min-height: 18px;
  text-align: center;
}

.modal__btnSignupEnt {
  width: 278px;
  height: 52px;
  background-color: #580ea2;
  border-radius: 6px;
  margin-top: 30px;
  margin-bottom: 20px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.05px;
  transition: background-color 0.2s ease-in-out;
}

.modal__btnSignupEnt:hover {
  background-color: #3f007d;
}

.modal__btnSignupEnt:active {
  background-color: #271a58;
}

.modal__btnSignupEnt:disabled {
  opacity: 0.6;
  cursor: default;
}

.modal__btnSignup {
  width: 278px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid #d0cece;
  border-radius: 6px;
  color: #000000;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.05px;
  transition: background-color 0.2s ease-in-out;
}

.modal__btnSignup:hover {
  background-color: #f4f5f6;
}
</style>

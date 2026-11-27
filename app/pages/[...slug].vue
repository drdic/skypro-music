<script setup>
definePageMeta({
  title: 'Страница не найдена',
})

useHead({
  title: 'Страница не найдена | Skypro.Music',
  meta: [{ name: 'description', content: 'Такой страницы нет в Skypro.Music' }],
})
</script>

<template>
  <div class="notfound">
    <h2 class="notfound__code">404</h2>
    <p class="notfound__text">Такой страницы нет. Проверьте адрес или вернитесь на главную.</p>
    <NuxtLink class="notfound__link" to="/">Вернуться на главную</NuxtLink>
  </div>
</template>

<style scoped>
.notfound {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 0;
}

.notfound__code {
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -0.8px;
  color: var(--color-accent);
  margin-bottom: 24px;
}

.notfound__text {
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  color: var(--color-text-primary);
  margin-bottom: 32px;
}

.notfound__link {
  padding: 10px 24px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-secondary);
  transition:
    color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
}

.notfound__link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
</style>

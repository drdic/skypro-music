<script setup>
import { useTheme } from '@/composables/useTheme.js'

const { isLight, toggleTheme } = useTheme()
</script>

<template>
  <nav class="main__nav">
    <div class="nav__logo">
      <svg class="logo__icon" viewBox="0 0 26 18" aria-hidden="true">
        <path d="M0 0 L14 9 L0 18 Z" fill="#21bfef" />
        <path d="M10 0 L24 9 L10 18 Z" fill="#b8e62e" />
      </svg>
      <span class="logo__text">skypro.music</span>
    </div>
    <div class="nav__burger">
      <span class="burger__line"></span>
      <span class="burger__line"></span>
      <span class="burger__line"></span>
    </div>
    <div class="nav__menu">
      <ul class="menu__list">
        <li class="menu__item">
          <a href="#" class="menu__link">Главное</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">Мой плейлист</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">Войти</a>
        </li>
        <li class="menu__item">
          <button class="menu__theme" type="button" @click="toggleTheme">
            {{ isLight ? 'Тёмная тема' : 'Светлая тема' }}
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.main__nav {
  flex: 0 0 244px;
  width: 244px;
  background-color: var(--color-bg);
  padding: 20px 0 20px 36px;
}

.nav__logo {
  display: flex;
  align-items: center;
  padding: 13px 0;
  background-color: transparent;
  margin-bottom: 20px;
}

.logo__icon {
  flex: 0 0 auto;
  width: 26px;
  height: 18px;
  margin-right: 7px;
}

.logo__text {
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -0.2px;
  color: var(--color-text-primary);
  white-space: nowrap;
}

.nav__burger {
  width: 20px;
  height: 36px;
  padding: 13px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.burger__line {
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: var(--color-burger);
}

.nav__menu {
  display: block;
  visibility: visible;
}

.menu__list {
  padding: 18px 0 10px 0;
}

.menu__item {
  padding: 5px 0;
  margin-bottom: 16px;
}

.menu__link {
  color: var(--color-text-primary);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  transition: color 0.2s ease-in-out;
}

.menu__link:hover {
  color: var(--color-accent);
}

.menu__theme {
  padding: 6px 14px;
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  font-family: inherit;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition:
    color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
}

.menu__theme:hover {
  color: var(--color-text-primary);
  border-color: var(--color-accent);
}

@media screen and (max-width: 900px) {
  .main__nav {
    flex: 0 0 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
  }

  .nav__logo {
    margin-bottom: 0;
  }

  .menu__list {
    display: flex;
    gap: 20px;
    padding: 0;
  }

  .menu__item {
    margin-bottom: 0;
  }
}
</style>

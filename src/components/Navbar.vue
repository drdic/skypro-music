<template>
  <nav class="main__nav">
    <div class="nav__logo">
      <img width="250" height="170" class="logo__image" src="/img/logo.png" alt="logo" />
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
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.main__nav {
  width: 244px;
  background-color: var(--color-bg);
  padding: 20px 0 20px 36px;
}

.nav__logo {
  width: 113.33px;
  height: 43px;
  padding: 13px 0 13px 0;
  background-color: transparent;
  margin-bottom: 20px;
}

.logo__image {
  width: 113.33px;
  height: 17px;
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
  background-color: #d3d3d3;
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

@media screen and (max-width: 900px) {
  .main__nav {
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

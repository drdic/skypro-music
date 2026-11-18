<template>
  <div class="centerblock__filter">
    <div class="filter__title">Искать по:</div>
    <div class="filter__button">исполнителю</div>
    <div class="filter__button">году выпуска</div>
    <div class="filter__button">жанру</div>
  </div>
</template>

<style scoped>
.centerblock__filter {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 51px;
  flex-wrap: wrap;
  gap: 10px;
}

.filter__title {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 5px;
  color: var(--color-text-primary);
}

.filter__button {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid var(--color-text-primary);
  border-radius: 60px;
  padding: 6px 20px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition:
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

.filter__button:hover {
  border-color: var(--color-accent-hover);
  color: var(--color-accent-hover);
}

.filter__button:active {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

@media screen and (max-width: 900px) {
  .centerblock__filter {
    margin-bottom: 30px;
  }
}
</style>

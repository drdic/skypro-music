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
  color: #ffffff;
}

.filter__button {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
  color: #ffffff;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.filter__button:hover {
  border-color: #d9b6ff;
  color: #d9b6ff;
}

.filter__button:active {
  border-color: #ad61ff;
  color: #ad61ff;
}

@media (max-width: 900px) {
  .centerblock__filter {
    margin-bottom: 30px;
  }
}
</style>

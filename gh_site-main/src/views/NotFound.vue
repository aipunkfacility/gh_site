<template>
  <section class="section">
    <div class="container not-found">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <RouterLink to="/" class="btn btn--primary">
        На главную
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 120px 20px;
}

.not-found h1 {
  font-size: 72px;
  color: var(--primary);
  margin-bottom: 16px;
}

.not-found p {
  font-size: 24px;
  color: var(--text-gray);
  margin-bottom: 32px;
}
</style>

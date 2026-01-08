<!-- src/components/contacts/ContactCard.vue -->
<template>
  <div class="contact-card">
    <div class="contact-icon">
      <i :class="`fa-brands fa-${icon}`"></i>
    </div>
    <h3>{{ title }}</h3>
    <button class="btn btn--primary" @click="action">
      Связаться
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  action: {
    type: Function,
    required: true
  }
});
</script>

<style scoped>
.contact-card {
  background: var(--white);
  border: 1px solid var(--gray-border);
  border-radius: var(--radius-card);
  padding: var(--spacing-xl);
  text-align: center;
}

.contact-icon {
  width: 60px;
  height: 60px;
  background: #f0f7f2;
  color: var(--secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 0 auto var(--spacing-

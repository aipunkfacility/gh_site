<!-- src/components/contacts/ContactCard.vue -->
<template>
  <div class="contact-card">
    <div class="contact-icon">
      <i :class="`fa-brands fa-${icon}`"></i>
    </div>

    <div class="contact-content">
      <h3>{{ title }}</h3>
      <p class="contact-subtitle">
        {{ subtitle }}
      </p>

      <button class="btn btn--primary" @click="action">
        Связаться
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped>
.contact-card {
  background: var(--white);
  border: 1px solid var(--gray-border);
  border-radius: var(--radius-card);
  padding: var(--spacing-xl);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
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
}

.contact-content {
  flex: 1;
}

.contact-content h3 {
  margin: 0 0 8px;
  font-size: 18px;
  color: var(--text-dark);
}

.contact-subtitle {
  margin: 0 0 16px;
  color: var(--text-gray);
  font-size: 14px;
  line-height: 1.5;
}
</style>

<!-- src/components/services/ServiceCard.vue -->
<template>
  <div class="service-item">
    <div class="service-icon">
      <i :class="`fa-solid fa-${service.icon}`"></i>
    </div>
    <div class="service-content">
      <h3>{{ service.title }}</h3>
      <p>{{ service.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  service: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.service-item {
  background: white;
  border-radius: var(--radius-card);
  overflow: hidden;
  border: 1px solid var(--gray-border);
  padding: 24px;
  display: flex;
  gap: 16px;
  transition: all var(--transition);
}

.service-item:hover {
  box-shadow: var(--shadow);
  transform: translateY(-3px);
}

.service-icon {
  width: 60px;
  height: 60px;
  background: #f0f7f2;
  color: var(--secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.service-content h3 {
  margin-bottom: 8px;
  color: var(--dark);
}

.service-content p {
  color: var(--text-gray);
  font-size: 14px;
  margin: 0;
  line-height: 1.6;
}
</style>

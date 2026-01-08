<!-- src/components/layout/Footer.vue -->
<template>
  <footer class="footer">
    <!-- Footer Form Section -->
    <section class="footer-form">
      <div class="form-container">
        <h2>Остались вопросы?</h2>
        <form @submit.prevent="handleSubmit" class="footer-contact-form">
          <input
            v-model="form.name"
            type="text"
            class="form-input"
            placeholder="Ваше имя"
            required
          >
          <input
            v-model="form.phone"
            type="tel"
            class="form-input"
            placeholder="Ваш WhatsApp"
            required
          >
          <button type="submit" class="btn" style="background: white; color: var(--primary);">
            Жду звонка
          </button>
        </form>
      </div>
    </section>

    <!-- Main Footer -->
    <footer-content />
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app.js';
import FooterContent from './FooterContent.vue';

const appStore = useAppStore();
const form = ref({
  name: '',
  phone: ''
});

const handleSubmit = () => {
  if (form.value.name && form.value.phone) {
    // Открываем WhatsApp с данными формы
    const message = `Имя: ${form.value.name}\nТелефон: ${form.value.phone}\n\nУ меня есть вопрос`;
    const whatsappUrl = `${appStore.config.contacts.whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Очищаем форму
    form.value = { name: '', phone: '' };
  }
};
</script>

<style scoped>
.footer {
  margin-top: 60px;
}

.footer-form {
  background: var(--secondary);
  color: var(--white);
  padding: 60px 20px;
  border-radius: 24px 24px 0 0;
}

.form-container {
  max-width: 800px;
  margin: 0 auto;
}

.form-container h2 {
  color: white;
  text-align: center;
  margin-bottom: 12px;
}

.footer-contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-input {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  font-family: inherit;
}

.form-input:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

@media (min-width: 768px) {
  .footer-contact-form {
    flex-direction: row;
    align-items: flex-end;
  }

  .form-input {
    flex: 1;
  }

  .btn {
    flex: 0 1 200px;
  }
}
</style>

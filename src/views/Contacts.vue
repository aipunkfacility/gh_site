<template>
  <section class="section">
    <div class="container contacts-wrapper">
      <h1 class="section-title">Контакты</h1>
      
      <div class="contacts-grid">
        <ContactCard icon="whatsapp" title="WhatsApp" :action="openWhatsApp" />
        <ContactCard icon="telegram" title="Telegram" :action="openTelegram" />
        <ContactCard icon="phone" title="Телефон" :action="callPhone" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAppStore } from '@stores/app.js';
import ContactCard from '@components/contacts/ContactCard.vue';

const appStore = useAppStore();

const openWhatsApp = () => {
  window.open(appStore.config.contacts.whatsappUrl, '_blank');
};

const openTelegram = () => {
  window.open(appStore.config.contacts.telegramUrl, '_blank');
};

const callPhone = () => {
  window.location.href = `tel:${appStore.config.contacts.phone}`;
};
</script>

<style scoped>
.contacts-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.contacts-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 40px;
}
</style>

<!-- src/components/home/BenefitsSection.vue -->
<template>
  <section class="benefits">
    <div class="benefits__grid">
      <div class="benefit-item">
        <div class="benefit-icon">
          <i class="fa-solid fa-wallet"></i>
        </div>
        <span class="benefit-text">Гарантия брони</span>
      </div>
      <div class="benefit-item">
        <div class="benefit-icon">
          <i class="fa-solid fa-language"></i>
        </div>
        <span class="benefit-text">Русские гиды</span>
      </div>
      <div class="benefit-item">
        <div class="benefit-icon">
          <i class="fa-solid fa-shield-heart"></i>
        </div>
        <span class="benefit-text">Страховка</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.benefits {
  padding: 20px 20px 0;
  background: var(--white);
  transform: translateY(-80px);
  border-radius: 20px 20px 0 0;
}

.benefits__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 1000px;
  margin: 0 auto;
}

.benefit-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.benefit-icon {
  width: 48px;
  height: 48px;
  background: rgba(45, 95, 62, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary);
  font-size: 20px;
}

.benefit-text {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
}

@media (min-width: 768px) {
  .benefits {
    padding: 20px 0;
    transform: translateY(-80px);
  }

  .benefit-text {
    font-size: 16px;
  }

  .benefit-icon {
    width: 64px;
    height: 64px;
    font-size: 28px;
  }
}
</style>

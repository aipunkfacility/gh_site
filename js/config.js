// js/config.js
// Централизованная конфигурация контактов и настроек

export const config = {
    // Контактная информация
    contacts: {
        phone: '84372733431', // Основной номер WhatsApp
        whatsappUrl: 'https://wa.me/84372733431',
        telegram: '@GreenHill_Support', 
        telegramUrl: 'https://t.me/GreenHill_Support',
        // email: 'info@greenhilltours.com' // Опционально
    },
    
    // Текстовые шаблоны для сообщений
    messages: {
        tourBooking: (tourTitle) => `Здравствуйте! Хочу забронировать тур: ${tourTitle}`,
        bikeRental: (bikeName) => `Интересует аренда ${bikeName}`,
        carRental: 'Интересует аренда Toyota Vios',
        accommodation: 'Интересует проживание в Green Hill',
        generalInquiry: 'Здравствуйте! У меня есть вопрос'
    },
    
    // Настройки приложения
    app: {
        companyName: 'GreenHill Tours',
        location: 'Муйне, Вьетнам',
        defaultLanguage: 'ru'
    }
};

// Утилита для создания WhatsApp ссылки с текстом
export function getWhatsAppLink(messageText) {
    return `${config.contacts.whatsappUrl}?text=${encodeURIComponent(messageText)}`;
}

// Утилита для создания Telegram ссылки
export function getTelegramLink() {
    return config.contacts.telegramUrl;
}

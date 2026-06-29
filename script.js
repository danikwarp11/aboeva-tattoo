// Открытие фотографии во весь экран
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lightbox.style.display = 'flex';
}

// Закрытие увеличенного фото
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Прямая отправка формы без бэкэнда Node.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tg-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Запрещаем перезагрузку
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const idea = formData.get('idea') || 'Не указана';

            // Формируем текст заявки
            const messageText = `⚡️ Новая заявка на тату!\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📝 Идея: ${idea}`;
            
            // Ваши реальные данные бота и чата
            const token = '8970923367:AAGjw9Rar_JEmcgdMueu8w3asWqp-Q46WUg';
            const chatId = '760353029';

            // Прямая ссылка на отправку через безотказный шлюз tgbot
            const url = `https://tgbot.co{token}/sendMessage`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: messageText
                    })
                });

                if (response.ok) {
                    alert('🔥 Заявка успешно отправлена! Я свяжусь с вами в Telegram.');
                    this.reset();
                } else {
                    alert('❌ Ошибка шлюза. Пожалуйста, проверьте, нажат ли СТАРТ у вашего бота в Телеграм.');
                }
            } catch (error) {
                alert('🔌 Ошибка отправки. Попробуйте еще раз.');
            }
        });
    }
});

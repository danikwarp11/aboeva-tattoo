// Открытие фотографии во весь экран с плавной анимацией
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

// Перехват отправки формы и передача данных на бэкэнд без перезагрузки
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tg-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Запрещаем браузеру мгновенно стирать данные и перезагружать страницу
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            try {
                // Относительный путь для работы в общем доступе в интернете
                const response = await fetch('/api/lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('🔥 Заявка успешно отправлена! Мастер свяжется с вами.');
                    this.reset(); // Форма очищается только после успешного ответа сервера
                } else {
                    alert('❌ Ошибка на стороне бэкэнд-сервера. Проверьте логи хостинга.');
                }
            } catch (error) {
                alert('🔌 Нет связи с сервером. Пожалуйста, попробуйте отправить заявку позже.');
            }
        });
    }
});

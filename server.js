const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// НАСТРОЙКА ПОЧТЫ MAIL.RU С ВАШИМИ ДАННЫМИ
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, // Использование защищенного TLS-соединения
    auth: {
        user: 'zayavki_tatoo@mail.ru', // Ваша рабочая почта
        pass: 'NyWD1XtixqiDqh9DU0iD'  // Ваш пароль приложения без пробелов
    }
});

app.post('/api/lead', async (req, res) => {
    const { name, phone, idea } = req.body;

    // Формируем аккуратный текст письма
    const emailText = `⚡️ Новая заявка на тату!\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📝 Идея: ${idea || 'Не указана'}`;

    const mailOptions = {
        from: 'zayavki_tatoo@mail.ru', // Отправитель (ваша почта)
        to: 'zayavki_tatoo@mail.ru',   // Получатель (заявки придут сюда же)
        subject: '🔥 Новая заявка с сайта АБОЕВА',
        text: emailText
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Заявка от ${name} успешно отправлена на Email!`);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('❌ Ошибка отправки почты:', error);
        res.status(500).json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log('🚀 Бэкэнд-сервер успешно запущен и слушает порт 3000');
});

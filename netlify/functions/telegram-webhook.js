// Функция для отправки данных в Telegram без необходимости запуска отдельного сервера
const axios = require('axios');

// Конфигурация Telegram бота
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

exports.handler = async function(event, context) {
  // Проверяем метод запроса
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Метод не разрешен' })
    };
  }

  try {
    // Парсим данные из запроса
    const data = JSON.parse(event.body);
    
    // Получаем данные из запроса
    const name = data.name || 'Не указано';
    const phone = data.phone || 'Не указано';
    const date = data.date || 'Не указано';
    const time = data.time || 'Не указано';
    
    // Формируем сообщение для отправки в Telegram
    const message = `🔔 *Новая запись на тестирование*\n\n` +
                    `👤 *Имя*: ${name}\n` +
                    `📱 *Телефон*: ${phone}\n` +
                    `📅 *Дата*: ${date}\n` +
                    `🕒 *Время*: ${time}\n` +
                    `\n📝 Запись создана: ${new Date().toLocaleString('ru-RU')}`;
    
    // Отправляем сообщение в Telegram
    const telegramResponse = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      }
    );
    
    // Проверяем успешность отправки
    if (telegramResponse.data && telegramResponse.data.ok) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Разрешаем CORS
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ status: 'success', message: 'Данные успешно отправлены в Telegram' })
      };
    } else {
      throw new Error('Ошибка при отправке сообщения в Telegram');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Разрешаем CORS
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ status: 'error', message: `Ошибка: ${error.message}` })
    };
  }
}; 
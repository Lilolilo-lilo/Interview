document.addEventListener('DOMContentLoaded', function() {
    // Обработка FAQ - раскрытие/скрытие ответов
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems && faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggleIcon = item.querySelector('.toggle-icon');
            
            if (question && answer && toggleIcon) {
                question.addEventListener('click', function() {
                    // Проверяем, скрыт ли ответ
                    const isHidden = answer.classList.contains('hidden');
                    
                    if (isHidden) {
                        answer.classList.remove('hidden');
                        toggleIcon.src = 'public/icons/minus.svg';
                    } else {
                        answer.classList.add('hidden');
                        toggleIcon.src = 'public/icons/plus.svg';
                    }
                });
            } else {
                console.error('Один из элементов FAQ не найден');
            }
        });
    } else {
        console.error('Элементы FAQ не найдены на странице');
    }

    // Обработка клика по кнопке "Записаться"
    const signupBtn = document.querySelector('.signup-btn');
    
    // Проверяем, найдена ли кнопка, прежде чем добавлять обработчик события
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            alert('Спасибо за интерес! Скоро мы свяжемся с вами для записи на интервью.');
        });
    } else {
        console.error('Элемент с классом .signup-btn не найден на странице');
    }
});

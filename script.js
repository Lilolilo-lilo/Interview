document.addEventListener('DOMContentLoaded', function() {
    // Переключение темы
    const themeSwitch = document.getElementById('theme-switch');
    let isDarkTheme = false;

    themeSwitch.addEventListener('change', function() {
        isDarkTheme = this.checked;
        
        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });

    // Обработка FAQ - раскрытие/скрытие ответов
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = item.querySelector('.toggle-icon');
        
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
    });

    // Обработка клика по кнопке "Записаться"
    const signupBtn = document.querySelector('.signup-btn');
    
    signupBtn.addEventListener('click', function() {
        alert('Спасибо за интерес! Скоро мы свяжемся с вами для записи на интервью.');
    });
});

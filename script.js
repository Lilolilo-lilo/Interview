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

    // Добавляем обработку клика по блоку input-with-icon
    const inputWithIconBlocks = document.querySelectorAll('.input-with-icon');
    if (inputWithIconBlocks && inputWithIconBlocks.length > 0) {
        inputWithIconBlocks.forEach(block => {
            const input = block.querySelector('input');
            if (input) {
                block.addEventListener('click', function(event) {
                    // Проверяем, что клик был не по самому input
                    if (event.target !== input) {
                        input.focus();
                    }
                });
            }
        });
    }

    // Инициализация выбора даты
    const dateInput = document.getElementById('date-input');
    if (dateInput) {
        flatpickr(dateInput, {
            locale: 'ru',
            dateFormat: 'd.m.Y',
            minDate: 'today',
            disableMobile: false,
            position: 'below',
            static: true,
            monthSelectorType: 'static',
            onChange: function(selectedDates, dateStr) {
                console.log('Выбрана дата:', dateStr);
            }
        });
    }

    // Инициализация выбора времени
    const timeInput = document.getElementById('time-input');
    if (timeInput) {
        flatpickr(timeInput, {
            locale: 'ru',
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            time_24hr: true,
            minuteIncrement: 30,
            disableMobile: false,
            position: 'below',
            static: true,
            onChange: function(selectedDates, timeStr) {
                console.log('Выбрано время:', timeStr);
            }
        });
    }

    // Обработка клика по кнопке "Записаться"
    const signupBtn = document.querySelector('.signup-btn');
    const popup = document.getElementById('signupPopup');
    const closeBtn = document.querySelector('.close-btn');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Функция для открытия всплывающего окна
    function openPopup() {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокировка прокрутки страницы
    }
    
    // Функция для закрытия всплывающего окна
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Восстановление прокрутки страницы
    }
    
    // Проверяем, найдена ли кнопка, прежде чем добавлять обработчик события
    if (signupBtn) {
        signupBtn.addEventListener('click', openPopup);
    } else {
        console.error('Элемент с классом .signup-btn не найден на странице');
    }
    
    // Обработчик для закрытия всплывающего окна
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
    
    // Закрытие при клике вне всплывающего окна
    if (popup) {
        popup.addEventListener('click', function(event) {
            if (event.target === popup) {
                closePopup();
            }
        });
    }
    
    // Валидация и форматирование номера телефона
    const phoneInput = document.getElementById('phone-input');
    if (phoneInput) {
        // Обработка ввода и форматирования номера телефона
        phoneInput.addEventListener('input', function(e) {
            // Сохраняем позицию курсора
            const cursorPosition = this.selectionStart;
            
            // Удаляем все нецифровые символы из ввода
            let phoneNumber = e.target.value.replace(/\D/g, '');
            
            // Ограничиваем длину до 11 цифр (российский номер)
            if (phoneNumber.length > 11) {
                phoneNumber = phoneNumber.substring(0, 11);
            }
            
            // Форматируем номер в виде +7(XXX)XXX-XX-XX
            if (phoneNumber.length > 0) {
                // Заменяем первую цифру на 7, если она не 7
                if (phoneNumber[0] !== '7') {
                    phoneNumber = '7' + phoneNumber.substring(phoneNumber[0] === '8' ? 1 : 0);
                }
                
                // Форматируем номер
                let formattedNumber = '+';
                
                if (phoneNumber.length > 0) {
                    formattedNumber += phoneNumber.substring(0, 1);
                }
                
                if (phoneNumber.length > 1) {
                    formattedNumber += '(' + phoneNumber.substring(1, Math.min(4, phoneNumber.length));
                }
                
                if (phoneNumber.length > 4) {
                    formattedNumber += ')' + phoneNumber.substring(4, Math.min(7, phoneNumber.length));
                }
                
                if (phoneNumber.length > 7) {
                    formattedNumber += '-' + phoneNumber.substring(7, Math.min(9, phoneNumber.length));
                }
                
                if (phoneNumber.length > 9) {
                    formattedNumber += '-' + phoneNumber.substring(9, Math.min(11, phoneNumber.length));
                }
                
                // Устанавливаем отформатированное значение
                e.target.value = formattedNumber;
                
                // Возвращаем курсор на новую позицию
                const newCursorPos = formattedNumber.length;
                this.setSelectionRange(newCursorPos, newCursorPos);
            }
        });
        
        // Обработка вставки текста
        phoneInput.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const onlyDigits = pastedText.replace(/\D/g, '');
            
            // Имитируем ввод вставленного текста
            const currentValue = this.value;
            const selectionStart = this.selectionStart;
            const selectionEnd = this.selectionEnd;
            
            // Создаем новое значение с учетом вставленного текста
            const newValue = currentValue.slice(0, selectionStart) + onlyDigits + currentValue.slice(selectionEnd);
            
            // Имитируем событие input
            this.value = newValue;
            const inputEvent = new Event('input', { bubbles: true });
            this.dispatchEvent(inputEvent);
        });
    }
    
    // Обработка отправки формы
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            // Валидация телефона
            if (phoneInput && phoneInput.value) {
                const phonePattern = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
                if (!phonePattern.test(phoneInput.value)) {
                    alert('Пожалуйста, введите корректный российский номер телефона в формате +7(XXX)XXX-XX-XX');
                    return;
                }
            }
            
            // Проверка выбора даты и времени
            const dateInput = document.getElementById('date-input');
            const timeInput = document.getElementById('time-input');
            
            if (!dateInput.value) {
                alert('Пожалуйста, выберите дату интервью');
                return;
            }
            
            if (!timeInput.value) {
                alert('Пожалуйста, выберите время интервью');
                return;
            }
            
            // Здесь можно добавить валидацию других полей формы и отправку данных
            alert('Спасибо за запись! Мы свяжемся с вами для подтверждения.');
            closePopup();
        });
    }
});

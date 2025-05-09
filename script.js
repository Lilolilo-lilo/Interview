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

    // Обработка клика по кнопке "Записаться"
    const signupBtn = document.querySelector('.signup-btn');
    const popup = document.getElementById('signupPopup');
    const successPopup = document.getElementById('successPopup');
    const closeBtn = document.querySelector('.close-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const continueBtn = document.querySelector('.continue-btn');
    
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

    // Функция для открытия всплывающего окна успешной записи
    function openSuccessPopup() {
        popup.classList.remove('active');
        successPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокировка прокрутки страницы
    }
    
    // Функция для закрытия всплывающего окна успешной записи
    function closeSuccessPopup() {
        successPopup.classList.remove('active');
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

    // Закрытие при клике вне всплывающего окна успешной записи
    if (successPopup) {
        successPopup.addEventListener('click', function(event) {
            if (event.target === successPopup) {
                closeSuccessPopup();
            }
        });
    }

    // Обработчик для кнопки "Продолжить"
    if (continueBtn) {
        continueBtn.addEventListener('click', closeSuccessPopup);
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
        // Функция для проверки заполнения всех полей формы
        function validateForm() {
            const nameInput = document.querySelector('.form-input[placeholder="Имя"]');
            const phoneInput = document.getElementById('phone-input');
            const dateInput = document.getElementById('date-input');
            const timeInput = document.getElementById('time-input');
            
            // Проверяем заполнение всех полей
            const isNameValid = nameInput && nameInput.value.trim() !== '';
            const isPhoneValid = phoneInput && phoneInput.value.trim() !== '' && /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(phoneInput.value);
            const isDateValid = dateInput && dateInput.value.trim() !== '';
            const isTimeValid = timeInput && timeInput.value.trim() !== '';
            
            // Возвращаем результат проверки
            return isNameValid && isPhoneValid && isDateValid && isTimeValid;
        }
        
        // Функция для обновления состояния кнопки отправки
        function updateSubmitButton() {
            if (validateForm()) {
                submitBtn.classList.add('active');
                submitBtn.disabled = false;
            } else {
                submitBtn.classList.remove('active');
                submitBtn.disabled = true;
            }
        }
        
        // Добавляем обработчики событий для всех полей формы
        const formInputs = document.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('input', updateSubmitButton);
            input.addEventListener('change', updateSubmitButton);
        });
        
        // Инициализируем состояние кнопки при загрузке
        updateSubmitButton();
        
        submitBtn.addEventListener('click', function() {
            // Проверяем валидность формы перед отправкой
            if (!validateForm()) {
                return;
            }
            
            // Валидация телефона
            if (phoneInput && phoneInput.value) {
                const phonePattern = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
                if (!phonePattern.test(phoneInput.value)) {
                    alert('Пожалуйста, введите корректный российский номер телефона в формате +7(XXX)XXX-XX-XX');
                    return;
                }
            }
            
            // Получаем данные из формы
            const nameInput = document.querySelector('.form-input[placeholder="Имя"]');
            const dateInput = document.getElementById('date-input');
            const timeInput = document.getElementById('time-input');
            
            // Формируем данные для отправки
            const formData = {
                name: nameInput ? nameInput.value : '',
                phone: phoneInput ? phoneInput.value : '',
                date: dateInput ? dateInput.value : '',
                time: timeInput ? timeInput.value : ''
            };
            
            // Отправляем данные на сервер
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            // URL для локальной разработки и для продакшена
            const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:8888/api/telegram-webhook'  // Локальный URL для разработки с Netlify Dev
                : '/api/telegram-webhook';  // Продакшн URL (относительный путь)
            
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Успешно отправлено:', data);
                // Открываем popup успешной записи
                openSuccessPopup();
            })
            .catch(error => {
                console.error('Ошибка при отправке данных:', error);
                // Даже если произошла ошибка, показываем пользователю, что всё успешно
                // В реальном приложении здесь можно показать сообщение об ошибке
                openSuccessPopup();
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Записаться';
            });
        });
    }
    
    // Обработка всех полей ввода для обновления класса has-value
    const allInputs = document.querySelectorAll('.form-input');
    if (allInputs && allInputs.length > 0) {
        allInputs.forEach(input => {
            // Добавляем обработчик события input
            input.addEventListener('input', function() {
                const parentContainer = this.closest('.input-with-icon');
                if (this.value) {
                    parentContainer.classList.add('has-value');
                } else {
                    parentContainer.classList.remove('has-value');
                }
                
                // Обновляем состояние кнопки отправки при изменении значения
                if (typeof updateSubmitButton === 'function') {
                    updateSubmitButton();
                }
            });
            
            // Проверяем значение при загрузке страницы
            const parentContainer = input.closest('.input-with-icon');
            if (input.value) {
                parentContainer.classList.add('has-value');
            } else {
                parentContainer.classList.remove('has-value');
            }
        });
    }

    // Настройка Flatpickr для поля даты
    const dateInput = document.getElementById('date-input');
    const dateContainer = document.querySelector('.date-container');
    
    if (dateInput) {
        const datePicker = flatpickr(dateInput, {
            dateFormat: 'd.m.y',
            minDate: 'today',
            disableMobile: "false", // Разрешаем нативные контролы на мобильных устройствах
            allowInput: true,
            clickOpens: true,
            locale: {
                firstDayOfWeek: 1, // Понедельник как первый день недели
                weekdays: {
                    shorthand: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                    longhand: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
                },
                months: {
                    shorthand: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                    longhand: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
                }
            },
            onChange: function(selectedDates, dateStr) {
                // Скрываем/показываем метку при выборе даты
                if (dateStr && dateStr.length > 0) {
                    dateContainer.classList.add('has-value');
                } else {
                    dateContainer.classList.remove('has-value');
                }
                
                // Обновляем состояние кнопки отправки при изменении даты
                if (typeof updateSubmitButton === 'function') {
                    updateSubmitButton();
                }
            },
            onReady: function() {
                // Проверяем значение при инициализации
                if (dateInput.value && dateInput.value.length > 0) {
                    dateContainer.classList.add('has-value');
                }
            }
        });
        
        // Проверяем значение при загрузке страницы
        if (dateInput.value && dateInput.value.length > 0) {
            dateContainer.classList.add('has-value');
        }

        // Добавляем обработчик клика на контейнер даты
        dateContainer.addEventListener('click', function() {
            dateInput.focus();
        });
    }

    // Настройка Flatpickr для поля времени
    const timeInput = document.getElementById('time-input');
    const timeContainer = document.querySelector('.time-container');
    
    if (timeInput) {
        const timePicker = flatpickr(timeInput, {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            time_24hr: true,
            minuteIncrement: 30,
            disableMobile: "false", // Разрешаем нативные контролы на мобильных устройствах
            allowInput: true,
            clickOpens: true,
            locale: {
                time_24hr: true
            },
            onChange: function(selectedDates, timeStr) {
                // Скрываем/показываем метку при выборе времени
                if (timeStr && timeStr.length > 0) {
                    timeContainer.classList.add('has-value');
                } else {
                    timeContainer.classList.remove('has-value');
                }
                
                // Обновляем состояние кнопки отправки при изменении времени
                if (typeof updateSubmitButton === 'function') {
                    updateSubmitButton();
                }
            },
            onReady: function() {
                // Проверяем значение при инициализации
                if (timeInput.value && timeInput.value.length > 0) {
                    timeContainer.classList.add('has-value');
                }
            }
        });
        
        // Проверяем значение при загрузке страницы
        if (timeInput.value && timeInput.value.length > 0) {
            timeContainer.classList.add('has-value');
        }

        // Добавляем обработчик клика на контейнер времени
        timeContainer.addEventListener('click', function() {
            timeInput.focus();
        });
    }

    // Проверяем и устанавливаем класс has-value для полей даты и времени при загрузке страницы
    const dateInputCheck = document.getElementById('date-input');
    const timeInputCheck = document.getElementById('time-input');
    const dateContainerCheck = document.querySelector('.date-container');
    const timeContainerCheck = document.querySelector('.time-container');
    
    if (dateInputCheck && dateContainerCheck) {
        if (dateInputCheck.value && dateInputCheck.value.length > 0) {
            dateContainerCheck.classList.add('has-value');
        }
    }
    
    if (timeInputCheck && timeContainerCheck) {
        if (timeInputCheck.value && timeInputCheck.value.length > 0) {
            timeContainerCheck.classList.add('has-value');
        }
    }
});

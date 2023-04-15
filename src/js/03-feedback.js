import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Відстежуємо подію input на формі
form.addEventListener('input', throttle(function() {
  const formData = new FormData(form);
  const feedback = {
    email: formData.get('email'),
    message: formData.get('message')
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
}, 500));

// Перевіряємо стан сховища під час завантаження сторінки
const savedFeedback = localStorage.getItem(STORAGE_KEY);
if (savedFeedback) {
  const feedback = JSON.parse(savedFeedback);
  form.elements.email.value = feedback.email;
  form.elements.message.value = feedback.message;
  console.log(feedback)
}

// Очищуємо сховище та поля форми під час сабміту
form.addEventListener('submit', function(event) {
    event.preventDefault();
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
      
    // Отримуємо поточні значення полів та виводимо їх у консоль
    const emailInput = form.elements.email;
    const messageInput = form.elements.message;
    console.log({
      email: emailInput.value,
      message: messageInput.value
    });
});

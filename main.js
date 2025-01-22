let currentQuestionIndex = 0;
const progressBar = document.getElementById('progress-bar');
const nextButtons = document.querySelectorAll('button');

function updateProgressBar() {
  const percentage = ((currentQuestionIndex + 1) / 5) * 100; // Измените 5 на количество ваших вопросов
  progressBar.style.width = percentage + '%';
}

function showQuestion(index) {
  const questions = document.querySelectorAll('.question');
  questions.forEach((question, i) => {
    question.classList.toggle('active', i === index);
  });
  updateProgressBar();
}

function validateSelection() {
  nextButtons[currentQuestionIndex].disabled = !document.querySelector(`#question${currentQuestionIndex + 1} .option.selected`);
}

document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', function () {
    const options = this.parentElement.querySelectorAll('.option');
    options.forEach(o => o.classList.remove('selected'));
    this.classList.add('selected');
    validateSelection();
  });
});

nextButtons.forEach((button, index) => {
  button.addEventListener('click', function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < nextButtons.length) {
      showQuestion(currentQuestionIndex);

    } else {
      document.getElementById('questions').style.display = 'none';
      document.querySelector('.result').style.display = 'block';
    }
  });
});

// Прогресс бар
window.onload = function () {
  let percent = 0;
  const interval = setInterval(() => {
    if (percent >= 100) {
      clearInterval(interval);
      showQuestion(currentQuestionIndex);
    } else {
      percent += 2; // Параметр скорости загрузки
      progressBar.style.width = percent + '%';
    }
  }, 50); // Обновление каждые 100 мс
};

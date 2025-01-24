const progressBar = document.getElementById('progress-bar');
const nextButtons = document.querySelectorAll('.btn');
const numberButtons = nextButtons.length;

let currentQuestionIndex = 0;
let weight, height;

// =======================================
const updateProgressBar = () => {
  const percentage = ((currentQuestionIndex + 1) / numberButtons) * 100;
  progressBar.style.width = percentage + '%';
};
// =======================================
const showQuestion = (index) => {
  const questions = document.querySelectorAll('.question');
  questions.forEach((question, i) => {
    question.classList.toggle('active', i === index);
  });
  updateProgressBar();
};

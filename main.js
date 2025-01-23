let currentQuestionIndex = 0;
const progressBar = document.getElementById('progress-bar');
const nextButtons = document.querySelectorAll('button');

function updateProgressBar() {
  const percentage = ((currentQuestionIndex + 1) / 7) * 100; // Измените 5 на количество ваших вопросов
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

// ================================================

let weight = parseFloat('{{wt-now}}'); // Вес пользователя
let height = parseFloat('{{height}}'); // Рост пользователя
const bmiResult = document.getElementById('bmi-result'); // Отображение ИМТ текстом
const bmiCategory = document.getElementById('bmi-category'); // Категория ИМТ
const bmiDescription = document.getElementById('bmi-description'); // Рекомендации
const bmiMarker = document.getElementById('bmi-marker'); // Бегунок
const bmiValue = document.getElementById('bmi-value'); // Числовое значение ИМТ рядом с бегунком

weight = 90;
height = 180;

if (weight > 0 && height > 0) {
  const bmi = weight / ((height * height) / 10000); // Расчет ИМТ
  bmiResult.textContent = bmi.toFixed(2); // Отображение значения ИМТ

  // Определяем категорию
  let category, description, markerPosition;
  if (bmi < 16) {
    category = 'Выраженный дефицит массы тела.';
    description = 'Надо начать с корректировки питания, увеличив калорийность рациона с помощью здоровых и питательных продуктов. Добавь больше белков, сложных углеводов и полезных жиров. В фитнесе — акцент на силовые тренировки, чтобы набрать мышечную массу. Кардио ограничить, чтобы не терять вес. Полезной также будет растяжка и йога для поддержания гибкости и общего тонуса.';
    markerPosition = 5; // Позиция маркера
  } else if (bmi >= 16 && bmi < 18.5) {
    category = 'Недостаточная масса тела.';
    description = 'Важно наладить питание: увеличь количество приемов пищи и старайся есть более калорийные продукты. В фитнесе акцент на силовых тренировках, чтобы стимулировать рост мышц. Кардио в умеренных количествах, чтобы не сжигать лишние калории. Добавь к тренировкам пилатес и йогу для улучшения осанки и гибкости.';
    markerPosition = 20;
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Нормальная масса тела.';
    description = 'Тебе подходит сбалансированное питание с акцентом на поддержание текущей массы. Для тренировки — можно сочетать силовые упражнения и кардио. Уделяй внимание разнообразию: тренируй все группы мышц. Добавь табату или HIIT для повышения выносливости, а также йогу или пилатес для развития гибкости и силы. Дыхательные практики и цигун помогут успокоить ум и улучшить концентрацию.';
    markerPosition = 50;
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Предожирение.';
    description = 'Пересмотри питание и начни с уменьшения калорийности рациона, делая акцент на белки, овощи и сложные углеводы. Тренировки — сочетание силовых и кардио, чтобы сжигать жир и набирать мышечную массу. Силовые тренировки помогут ускорить обмен веществ и улучшить форму. Полезными также будут йога и дыхательные практики для снижения стресса и улучшения общего благополучия.';
    markerPosition = 75;
  } else if (bmi >= 30 && bmi < 35) {
    category = 'Ожирение 1-й степени.';
    description = 'Скорректируй питание, снизив калорийность и избегая быстрых углеводов. Фокусируйся на регулярных кардионагрузках и добавляй силовые тренировки для поддержания мышц. Важно начать с простых упражнений и постепенно увеличивать интенсивность. Добавь растяжку и йогу для комплексного подхода к восстановлению и укреплению организма. Лимфодренажные тренировки помогут уменьшить отеки.';
    markerPosition = 90;
  } else if (bmi >= 35 && bmi < 40) {
    category = 'Ожирение 2-й степени.';
    description = 'Снижай калорийность рациона, отдавая предпочтение белковым и овощным продуктам. Начни с легких кардионагрузок. Силовые тренировки помогут сохранить мышцы, но старайся избегать чрезмерной нагрузки в начале. Постепенно увеличивай интенсивность. Добавь йогу, дыхательные практики и цигун для улучшения общего состояния и снижения стресса.';
    markerPosition = 95;
  } else if (bmi >= 40) {
    category = 'Ожирение 3-й степени.';
    description = 'Нужно серьезно пересмотреть рацион, снизив калории и ограничив высококалорийные продукты. Начни с простых кардионагрузок, таких как ходьба, и постепенно включай упражнения для всего тела с малым весом. Важно подходить к тренировкам постепенно, не перегружая организм. Рекомендуется добавить йогу, цигун и дыхательные практики для поддержки иммунной системы и улучшения психоэмоционального состояния.';
    markerPosition = 99;
  } else {
    category = 'Ошибка в расчете.';
    description = '';
    markerPosition = 0;
  }

  bmiCategory.textContent = category; // Категория ИМТ
  bmiDescription.innerHTML = description; // Рекомендации
  bmiMarker.style.left = `${markerPosition}%`; // Установка позиции бегунка
  bmiValue.textContent = bmi.toFixed(1); // Отображение значения ИМТ рядом с бегунком
} else {
  bmiResult.textContent = '--';
  bmiCategory.textContent = 'Данные некорректны. Проверьте ввод.';
  bmiDescription.innerHTML = '';
  bmiMarker.style.left = '0%';
  bmiValue.textContent = '--';
}

document.addEventListener('DOMContentLoaded', function () {
   const urlParams = new URLSearchParams(window.location.search);
   const quizIndex = urlParams.get('quiz');

   if (quizIndex !== null && quizIndex >= 0 && quizIndex < quizzes.length) {
      const quiz = quizzes[quizIndex];
      const quizContainer = document.getElementById('quizContainer');
      const answerForm = document.getElementById('answerForm');
      const submitButton = answerForm.querySelector('button[type="submit"]');
      const localStorageKey = `quiz_${quizIndex}_score`;
      const historyKey = `quiz_${quizIndex}_history`;
      const quizTitleElement = document.getElementById('quizTitle');
      let currentQuestionIndex = 0;
      let score = 0;

      if (quizTitleElement) {
         quizTitleElement.textContent = quiz.title;
      }
      loadQuestion();
      answerForm.addEventListener('submit', function (event) {
         event.preventDefault();
         const selectedAnswer = document.querySelector('input[name="answer"]:checked');
         if (selectedAnswer) {
            const selectedAnswerIndex = parseInt(selectedAnswer.value, 10);

            if (selectedAnswerIndex === quiz.questions[currentQuestionIndex].correctAnswer) {
               score++;
            }
            currentQuestionIndex++;
            selectedAnswer.checked = false;

            if (currentQuestionIndex < quiz.questions.length) {
               loadQuestion();
            } else {
               finishQuiz();
            }
         }
      });

      function loadQuestion() {
         const question = quiz.questions[currentQuestionIndex];
         quizContainer.innerHTML = '';
         const questionElement = document.createElement('h3');
         questionElement.textContent = `Запитання ${currentQuestionIndex + 1}: ${question.question}`;
         const answerList = document.createElement('ul');
         question.answers.forEach((answer, index) => {
            const answerItem = document.createElement('li');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.value = index;
            answerItem.textContent = answer;
            answerItem.prepend(input);
            answerList.appendChild(answerItem);
         });

         quizContainer.appendChild(questionElement);
         quizContainer.appendChild(answerList);
      }

      function finishQuiz() {
         localStorage.setItem(localStorageKey, score.toString());
         saveToHistory();
         const finishUrl = `finish.html?quiz=${quizIndex}`;
         window.location.href = finishUrl;
      }

      function saveToHistory() {
         const history = JSON.parse(localStorage.getItem(historyKey)) || [];
         const quizResult = {
            date: new Date().toLocaleString(),
            score: score,
            totalQuestions: quiz.questions.length
         };
         history.push(quizResult);
         localStorage.setItem(historyKey, JSON.stringify(history));
      }
   }
});
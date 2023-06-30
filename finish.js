document.addEventListener('DOMContentLoaded', function () {
   const urlParams = new URLSearchParams(window.location.search);
   const quizIndex = urlParams.get('quiz');
   const historyKey = `quiz_${quizIndex}_history`;

   const quizResultsContainer = document.getElementById('quizResults');
   const table = document.createElement('table');

   const tableHeaders = ['Назва вікторини', 'Всього питань', 'Правельні відпові', 'Неправильні відповіді'];
   const tableHeaderRow = document.createElement('tr');
   tableHeaders.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      tableHeaderRow.appendChild(th);
   });
   table.appendChild(tableHeaderRow);

   if (quizIndex !== null && quizIndex >= 0 && quizIndex < quizzes.length) {
      const quiz = quizzes[quizIndex];
      const history = JSON.parse(localStorage.getItem(historyKey)) || [];

      const quizResult = history[history.length - 1];

      const quizRow = document.createElement('tr');
      quizRow.appendChild(createCell(quiz.title));
      quizRow.appendChild(createCell(quiz.questions.length));
      quizRow.appendChild(createCell(quizResult.score));
      quizRow.appendChild(createCell(quiz.questions.length - quizResult.score));
      table.appendChild(quizRow);
   }

   quizResultsContainer.appendChild(table);

   function createCell(text) {
      const cell = document.createElement('td');
      cell.textContent = text;
      return cell;
   }
});
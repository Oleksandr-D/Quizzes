document.addEventListener('DOMContentLoaded', function () {
   const quizData = [];

   for (let i = 0; i < quizzes.length; i++) {
      const quiz = quizzes[i];
      const localStorageKey = `quiz_${i}_score`;
      const historyKey = `quiz_${i}_history`;
      const score = localStorage.getItem(localStorageKey);
      const history = JSON.parse(localStorage.getItem(historyKey));

      if (score !== null) {
         const quizResult = {
            quizTitle: quiz.title,
            totalQuestions: quiz.questions.length,
            score: parseInt(score),
            history: history || []
         };
         quizData.push(quizResult);
      }
   }

   displayQuizResults();

   function displayQuizResults() {
      const quizResultsContainer = document.getElementById('quizResults');
      const table = document.createElement('table');
      const tableHeaders = ['Назва вікторини', 'Вього питань', 'Остання оцінка', 'Історія'];
      const tableHeaderRow = document.createElement('tr');
      tableHeaders.forEach(headerText => {
         const th = document.createElement('th');
         th.textContent = headerText;
         tableHeaderRow.appendChild(th);
      });
      table.appendChild(tableHeaderRow);

      quizData.forEach(quizResult => {
         const quizRow = document.createElement('tr');
         const createCell = (text) => {
            const cell = document.createElement('td');
            cell.textContent = text;
            return cell;
         };

         quizRow.appendChild(createCell(quizResult.quizTitle));
         quizRow.appendChild(createCell(quizResult.totalQuestions));
         quizRow.appendChild(createCell(quizResult.score));

         const historyCell = document.createElement('td');
         const historyList = document.createElement('ul');
         quizResult.history.forEach(result => {
            const historyItem = document.createElement('li');
            historyItem.textContent = `Дата: ${result.date}, Правельно/Неправильно: ${result.score}/${result.totalQuestions}`;
            historyList.appendChild(historyItem);
         });
         historyCell.appendChild(historyList);
         quizRow.appendChild(historyCell);
         table.appendChild(quizRow);
      });
      quizResultsContainer.appendChild(table);
   }
});
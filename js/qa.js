export async function fetchQuestionsAndAnswers(levelName, monthNumber, storyNumber) {

    try {

        const response = await fetch(`http://localhost:3000/api/level/${levelName}/month/${monthNumber}/story/${storyNumber}/questions`)


        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const questions = await response.json();
        const qaList = document.getElementById('question-and-answer-list');
        qaList.innerHTML = '';

        // Display questions in the div
        questions.forEach((qa, index) => {

            // Creae a list item for each question
            const qaItem = document.createElement('p');

            // Create a question element
            const questionText = document.createElement('p');
            questionText.innerHTML = `<strong>Q${index + 1}:</strong> ${qa.question}`;

            // Create an answer element
            const answerText = document.createElement('p');
            answerText.innerHTML = `<strong>A:</strong> ${qa.answer}`;

            // Append question and answer to the list item
            qaItem.appendChild(questionText);
            qaItem.appendChild(answerText);

            // Append the List item to the Q&A List
            qaList.appendChild(qaItem);


        })

    } catch (error) {

    console.error('Error fetching questions and answers:', error);
}

}

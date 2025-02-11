import { fetchQuestionsAndAnswers } from './qa.js';
const questionsAndAnswersContainer = document.getElementById("questionsAndAnswersContainer");   

export async function fetchStories(levelName, monthNumber) {

    try {
        const response = await fetch(`https://teacher-feedback-app-c9c0e9c8892f.herokuapp.com/api/level/${levelName}/month/${monthNumber}/stories`);

        if (!response.ok) {
            throw new Error (`HTTP error! Status: ${response.status}`);
        }

        const stories = await response.json();

        const storiesList = document.getElementById('stories-list');
        storiesList.innerHTML = '';

        // Display stories in the div

        stories.forEach((story, index) => {

            // Create a list item for each story
            const storyItem = document.createElement('li');

            // Create a radio button for each story
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `story-${index}`;
            input.name = 'storyChoice';
            input.value = story.storyName;

            input.addEventListener('change', () => {
                questionsAndAnswersContainer.style.display = "block";
                 fetchQuestionsAndAnswers(levelName, monthNumber, story.storyNumber)
            })

            // Create a label for the radio button
            const label = document.createElement('label');
            label.htmlFor = `story-${index}`;
            label.textContent = story.storyName;

            // Append input and label to the list item
            storyItem.appendChild(input);
            storyItem.appendChild(label);

            // Append the list item to the Stories List
            storiesList.appendChild(storyItem);

        })

    } catch (error) {
        console.error('Error fetching stories:', error);
    }

}
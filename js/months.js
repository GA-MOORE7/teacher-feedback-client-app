import { fetchStories} from './stories.js';
const storiesContainer = document.getElementById("storiesContainer");

export async function fetchMonths(levelName) {

    try {
        const response = await fetch(`https://teacher-feedback-app-c9c0e9c8892f.herokuapp.com/api/level/${levelName}/months`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const months = await response.json();

        // Get the div element for months
        const monthsList = document.getElementById('months-list');
        monthsList.innerHTML = '';

        // Display months in the div
      months.forEach((month, index) => {
        // Create a list item for each month
        const monthItem = document.createElement('li');

        // Create a radio button for each month
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `month-${index}`;
        input.name = 'monthChoice';
        input.value = month.monthNumber;

        input.addEventListener('change', () => {
            storiesContainer.style.display = "block";
            fetchStories(levelName, month.monthNumber);
        });

        // Create a label for the radio button
        const label = document.createElement('label');
        label.htmlFor = `month-${index}`;
        label.textContent = `Month ${month.monthNumber}`;

        // Append input and label to the list item
        monthItem.appendChild(input);
        monthItem.appendChild(label);

        //Append the list item to the Months List
        monthsList.appendChild(monthItem);

      })

    } catch (error) {
        console.error('Error fetching months:', error);
    }

}
import { fetchMonths } from './months.js';
const monthsContainer = document.getElementById("monthsContainer");

async function fetchLevels() {

    try {
        const response = await fetch('http://localhost:3000/api/getAllLevels');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const levels = await response.json();

        //get the div element
        const levelsList = document.getElementById('levels-list');

        //clear previous content
        levelsList.innerHTML = '';

        //display levels in the div
        levels.forEach((level, index) => {
            // Create a list item for each level
            const levelItem = document.createElement('li');

            // Create a radio button for each level
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `level-${index}`;
            input.name = 'levelChoice';
            input.value = level.levelName;

            input.addEventListener('change', () => {
                monthsContainer.style.display = "block";
                fetchMonths(level.levelName);
            });
            
            //Create a label for the radio button
            const label = document.createElement('label');
            label.htmlFor = `level-${index}`;
            label.textContent = level.levelName;

            //Append input and label to the list item
            levelItem.appendChild(input);
            levelItem.appendChild(label);

            //Append the list item to the Levels list
            levelsList.appendChild(levelItem);
        

        });

        } catch (error) {
        console.error('Error fetching levels:', error);
    }
    
}

fetchLevels();
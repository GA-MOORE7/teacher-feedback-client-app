document.addEventListener("DOMContentLoaded", function () {
    const monthDropdown = document.getElementById("monthNumber");
    const storyDropdown = document.getElementById("storyNumber");

    // Populate dropdowns for months (1-12) and stories (1-20)
    for (let i = 1; i <= 6; i++) {
        monthDropdown.innerHTML += `<option value="${i}">Month ${i}</option>`;
    }
    for (let i = 1; i <= 8; i++) {
        storyDropdown.innerHTML += `<option value="${i}">Story ${i}</option>`;
    }

    document.getElementById("addQuestionBtn").addEventListener("click", addQuestion);
    document.getElementById("generateJsonBtn").addEventListener("click", generateJSON);
    document.getElementById("submitBtn").addEventListener("click", submitData);
});

function addQuestion() {
    const container = document.getElementById("questionsContainer");
    const div = document.createElement("div");
    div.classList.add("question-item");

    div.innerHTML = `
        <input type="text" class="question" placeholder="Enter question" required>
        <input type="text" class="answer" placeholder="Enter answer" required>
        <button type="button" class="remove-btn">Remove</button>
    `;

    div.querySelector(".remove-btn").addEventListener("click", function () {
        div.remove();
    });

    container.appendChild(div);
}

function generateJSON() {
    const jsonData = collectFormData();
    if (jsonData) {
        document.getElementById("jsonOutput").textContent = JSON.stringify(jsonData, null, 4);
    }
}

function collectFormData() {
    const levelName = document.getElementById("levelName").value;
    const monthNumber = parseInt(document.getElementById("monthNumber").value);
    const storyNumber = parseInt(document.getElementById("storyNumber").value);
    const storyName = document.getElementById("storyName").value.trim();

    const questions = [];
    document.querySelectorAll(".question-item").forEach(item => {
        const question = item.querySelector(".question").value.trim();
        const answer = item.querySelector(".answer").value.trim();
        if (question && answer) {
            questions.push({ question, answer });
        }
    });

    if (!levelName || !monthNumber || !storyNumber || !storyName || questions.length === 0) {
        alert("Please fill in all fields and add at least one question.");
        return null;
    }

    return { levelName, monthNumber, storyNumber, storyName, questions };
}

async function submitData() {
    const jsonData = collectFormData();
    if (!jsonData) return;

    try {
        const response = await fetch("http://localhost:3000/api/create-level", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        });

        const result = await response.json();
        if (response.ok) {
            alert("Data submitted successfully!");
        } else {
            alert("Error: " + result.error);
        }
    } catch (error) {
        console.error("Submission error:", error);
        alert("Failed to send data. Please try again.");
    }
}


const QUESTIONS = [
    { question: "Christmas is my favorite holiday.", answer: 5 },
    { question: "I like pickles.", answer: 1 },
    { question: "I prefer quiet nights in over parties.", answer: 5 },
    { question: "I believe in ghosts.", answer: 3 },
    { question: "I love music.", answer: 5 }
];

const THRESHOLDS = {
    marriage: 90,
    trueLove: 100,
    possibility: 60,
    friendzoned: 20,
    noThankYou: 0,
};

function createQuestionElements() {
    const questionContainer = document.getElementById("questions");
    QUESTIONS.forEach((q, index) => {
        questionContainer.innerHTML += `
            <label>${q.question}</label>
            <input type="number" min="1" max="5" id="answer${index}" required>
        `;
    });
}

function validate() {
    for (let i = 0; i < QUESTIONS.length; i++) {
        const answer = document.getElementById(`answer${i}`).value;
        if (answer < 1 || answer > 5) {
            alert("Please enter a number between 1 and 5 for each question.");
            return false;
        }
    }
    return true;
}

function calculateCompatibility() {
    let totalScore = 0;

    for (let i = 0; i < QUESTIONS.length; i++) {
        const userAnswer = parseInt(document.getElementById(`answer${i}`).value);
        const compatibilityScore = Math.abs(userAnswer - QUESTIONS[i].answer);
        totalScore += compatibilityScore;
    }

    const finalScore = 100 - (totalScore / (QUESTIONS.length * 4) * 100);
    return finalScore;
}

function displayResult(score) {
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `<strong>Your Compatibility Score: ${score.toFixed(2)}%</strong><br/>`;

    if (score >= THRESHOLDS.marriage) {
        resultDiv.innerHTML += "💍 You should get married! 💍";
    } else if (score >= THRESHOLDS.trueLove) {
        resultDiv.innerHTML += "💖 True Love! 💖";
    } else if (score >= THRESHOLDS.possibility) {
        resultDiv.innerHTML += "🥳 There’s a possibility!";
    } else if (score >= THRESHOLDS.friendzoned) {
        resultDiv.innerHTML += "🥶 Friendzoned!";
    } else {
        resultDiv.innerHTML += "⚠️ You might want to run away!";
    }
}

document.getElementById("submit").addEventListener("click", () => {
    if (validate()) {
        const score = calculateCompatibility();
        displayResult(score);
    }
});

// Reset functionality
document.getElementById("reset").addEventListener("click", () => {
    document.getElementById("result").style.display = "none";
    document.getElementById("questions").innerHTML = "";
    createQuestionElements();
});

// Initialize questions
createQuestionElements();

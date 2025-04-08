document.addEventListener("DOMContentLoaded", function () {
    let tapCount = localStorage.getItem("tapCount") || 0;
    document.getElementById("tap-count").innerText = tapCount;
});

function submitQuestion() {
    const questionText = document.getElementById("question").value.trim();

    if (questionText === "") {
        alert("Please enter a question.");
        return;
    }

    fetch("http://localhost:5000/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: questionText })
    })
    .then(response => response.json())
    .then(() => {
        window.location.href = "submitted.html";  // Redirect to new page
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong!");
    });
}

const randomQuestions = [
    "What's your biggest fear?",
    "If you could time travel, where would you go?",
    "What's the best advice you've ever received?",
    "If you had a superpower, what would it be?",
    "What makes you truly happy?",
    "What's a secret talent you have?"
];

function generateRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * randomQuestions.length);
    document.getElementById("question").value = randomQuestions[randomIndex];
}

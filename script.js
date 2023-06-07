//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];


// Retrieve progress from session storage
let progress = JSON.parse(sessionStorage.getItem("progress")) || [];

// Retrieve score from local storage
const score = localStorage.getItem("score");

// Check if progress exists in session storage
if (progress.length > 0) {
  // Retrieve user answers from progress
  const userAnswers = progress.map((item) => item.answer);

  // Function to save user answers in session storage
  function saveProgress() {
    const questionInputs = document.querySelectorAll("input[type=radio]:checked");
    const userProgress = [];

    questionInputs.forEach((input) => {
      const questionIndex = parseInt(input.name.split("-")[1]);
      const answer = input.value;
      userProgress.push({ index: questionIndex, answer: answer });
    });

    sessionStorage.setItem("progress", JSON.stringify(userProgress));
  }

  // Add event listener to save progress whenever a radio button is selected
  const radioButtons = document.querySelectorAll("input[type=radio]");
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", saveProgress);
  });

  // Populate user answers from session storage
  userAnswers.forEach((answer, index) => {
    const questionIndex = `question-${index}`;
    const inputElement = document.querySelector(`input[name="${questionIndex}"][value="${answer}"]`);
    if (inputElement) {
      inputElement.checked = true;
    }
  });
}

// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      if (progress.length > 0) {
        // Check if user has already answered this question
        const previousAnswer = progress.find((item) => item.index === i);
        if (previousAnswer && previousAnswer.answer === choice) {
          choiceElement.setAttribute("checked", true);
        }
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

// Add event listener to submit button
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", calculateScore);

// Calculate and display the score
function calculateScore() {
  const questionInputs = document.querySelectorAll("input[type=radio]:checked");
  const userAnswers = Array.from(questionInputs).map((input) => input.value);

  // Save the score in local storage
  const correctAnswers = questions.map((question) => question.answer);
  const score = calculateCorrectAnswers(userAnswers, correctAnswers);
  localStorage.setItem("score", score);

  // Display the score
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of 5.`;
}

// Function to calculate the score based on the user's answers
function calculateCorrectAnswers(userAnswers, correctAnswers) {
  let score = 0;

  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      score++;
    }
  }

  return score;
}

// Call the function to render the questions
renderQuestions();





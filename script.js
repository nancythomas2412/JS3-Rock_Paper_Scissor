// Select DOM elements
const buttons = document.querySelectorAll("button");
const resultEl = document.getElementById("result");
const playerScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const body = document.body;

// Initialize scores
let playerScore = 0;
let computerScore = 0;

// Event listener for button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerSelection = button.id;
    const computerSelection = computerPlay();
    const result = playRound(playerSelection, computerSelection);

    // Display the result
    resultEl.textContent = `You chose ${playerSelection.toUpperCase()}, computer chose ${computerSelection.toUpperCase()}. ${result}`;

    // Trigger animation on button click
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 150);

    // Change background based on result
    updateBackground(result);

    // Add result to history (optional)
    logResult(playerSelection, computerSelection, result);
  });
});

// Function to simulate computer's choice
function computerPlay() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Function to play one round and update scores
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "It's a tie!";
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    return "You win!";
  } else {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    return "You lose!";
  }
}

// Function to update the background based on result
function updateBackground(result) {
  if (result.includes("win")) {
    body.style.backgroundColor = "#004d00"; // Green for win
  } else if (result.includes("lose")) {
    body.style.backgroundColor = "#4d0000"; // Red for lose
  } else {
    body.style.backgroundColor = "#333"; // Neutral for tie
  }
  setTimeout(() => (body.style.backgroundColor = "#000"), 500); // Reset to black
}

// Function to log result history
function logResult(playerSelection, computerSelection, result) {
  let history = document.getElementById("history");
  if (!history) {
    // Create history section if not present
    history = document.createElement("div");
    history.id = "history";
    document.body.appendChild(history);
  }

  // Append new result
  const logEntry = document.createElement("p");
  logEntry.textContent = `Player: ${playerSelection.toUpperCase()} | Computer: ${computerSelection.toUpperCase()} | ${result}`;
  history.appendChild(logEntry);
  // Ensure the latest result is always visible
  history.scrollTop = history.scrollHeight;
}

// Reset Button (Optional Feature)
const resetButton = document.createElement("button");
resetButton.textContent = "Reset Game";
resetButton.style.marginTop = "20px";
resetButton.style.padding = "10px 20px";
resetButton.style.fontSize = "1rem";
resetButton.style.color = "#fff";
resetButton.style.backgroundColor = "#444";
resetButton.style.border = "none";
resetButton.style.borderRadius = "5px";
resetButton.style.cursor = "pointer";
resetButton.style.transition = "all 0.3s ease";
resetButton.addEventListener("click", resetGame);
document.body.appendChild(resetButton);

// Reset game function
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  resultEl.textContent = "Game reset. Start playing!";
  const history = document.getElementById("history");
  if (history) history.innerHTML = ""; // Clear result history
}

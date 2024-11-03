const NUM_ROUNDS = 5;
const START_ROUND = 1;

function getComputerChoice() {
    let numChoice = Math.floor(Math.random() * 3)
    let choice = undefined
    switch (numChoice) {
        case 0:
            choice = 'rock'
            break;
        case 1:
            choice = 'paper'
            break;
        case 2:
            choice = 'scissors'
            break;
        default:
        // console.log('Choice unsuccessful')
    }
    // console.log('Computer choice = ' + choice)
    return choice
}

function playRound(humanChoice, computerChoice) {
    let winner = undefined
    if (computerChoice === 'rock' && humanChoice === 'scissors'
        || computerChoice === 'scissors' && humanChoice === 'paper'
        || computerChoice === 'paper' && humanChoice === 'rock') {
        winner = 'computer'
        // console.log('You lose this round. :(')
    } else if (humanChoice === 'rock' && computerChoice === 'scissors'
        || humanChoice === 'scissors' && computerChoice === 'paper'
        || humanChoice === 'paper' && computerChoice === 'rock') {
        winner = 'human'
        // console.log('You win this round. :)')
    } else {
        winner = 'draw'
        // console.log('This round is a draw.')
    }
    return winner;
}

function declareWinner(humanScore, computerScore) {
    let winMessage = '';
    if (computerScore > humanScore) {
        winMessage = 'Computer wins';
    } else if (humanScore > computerScore) {
        winMessage = 'You win';
    } else {
        winMessage = "It's a draw"
    }
    return winMessage;
}

function playGame(numRounds, startRound) {

    let humanScore = 0;
    let computerScore = 0;
    let draws = 0;
    let currentRound = startRound;

    // console.log(`starting game. ${numRounds} total rounds.`);

    displayRound(currentRound, numRounds);
    displayScore(humanScore, computerScore, draws);

    const userOption = Array.from(document.querySelectorAll("#user-option button"));


    const handleRound = (event) => {

        // console.log('ROUND ' + currentRound)

        let target = event.target;

        // console.log(target.textContent);

        let humanChoice = target.textContent.toLowerCase();
        let computerChoice = getComputerChoice();

        const winner = playRound(humanChoice, computerChoice);
        if (winner === 'computer') computerScore++;
        if (winner === 'human') humanScore++;
        if (winner === 'draw') draws++;
        currentRound++
        // console.log('round incremented ' + currentRound);

        displayRound(currentRound, numRounds);
        displayScore(humanScore, computerScore, draws);
        // console.log(winner);
        displayRoundwinner(humanChoice, winner);

        if (currentRound > numRounds) {
            hideButtons();
            displayWinner(humanScore, computerScore)
            userOption.forEach(button => button.removeEventListener("click", handleRound));
            resetGame()
        }
    };

    userOption.forEach(option => option.addEventListener("click", handleRound));
}

function resetGame() {
    const results = document.querySelector("#user-option");

    const existingResetButton = document.querySelector(".resetButton");
    if (existingResetButton) {
        existingResetButton.remove();
    }
    const resetButton = document.createElement("button");
    resetButton.classList.add("resetButton");
    resetButton.textContent = "New Game";
    results.appendChild(resetButton);
    resetButton.addEventListener("click", (event) => {
        if (event.target.classList.contains("resetButton")) {
            playGame(NUM_ROUNDS, START_ROUND);
            resetButton.remove();
            // console.log("game reset")
        }
        clearWinner();
        showButtons();
    });

}


// ui stuff
function displayRound(roundNumber, totalRounds) {
    const round = document.querySelector(".round");
    if (roundNumber > totalRounds) {
        roundNumber = totalRounds;
    }
    round.textContent = `Round ${roundNumber}/${NUM_ROUNDS}`;
};

function displayScore(humanScore, computerScore, draws) {
    const scoreboard = document.querySelector(".score");
    scoreboard.textContent = `Wins - ${humanScore} || Draw - ${draws} || Loss - ${computerScore}`;
}

function displayWinner(humanScore, computerScore) {
    const winner = document.querySelector(".winner");
    const text = declareWinner(humanScore, computerScore);
    typewriter(winner, text)
};

function clearWinner() {
    const winner = document.querySelector(".winner");
    winner.textContent = "";
}


function showButtons() {
    const buttons = document.querySelectorAll("#user-option button");
    buttons.forEach(button => button.style.display = "block");
};

function hideButtons() {
    const buttons = document.querySelectorAll("#user-option button");
    buttons.forEach(button => button.style.display = "none");
};

function displayRoundwinner(humanChoice, winner) {
    const roundWinner = document.querySelector(".round-winner");
    roundWinner.textContent = getRoundWinnerMessage(humanChoice, winner);
}


function getRoundWinnerMessage(humanChoice, winner) {
    let message = "";
    switch (winner) {
        case "human":
            switch (humanChoice) {
                case "rock":
                    message = "Rock beats scissors"
                    break;
                case "paper":
                    message = "Paper beats rock"
                    break;
                case "scissors":
                    message = "Scissors beats paper"
                    break;
            }
            break;
        case "computer":
            switch (humanChoice) {
                case "rock":
                    message = "Paper beats rock";
                    break;
                case "paper":
                    message = "Scissors beats paper";
                    break;
                case "scissors":
                    message = "Rock beats scissor"
                    break;
            }
            break;
        case "draw":
            message = "This round is a draw";
            break;
    }
    return message;

}



function typewriter(element, text, i = 0) {
    element.textContent += text[i];
    if (i === text.length - 1) {
        return;
    }
    setTimeout(() => typewriter(element, text, i + 1), 50);
};

// start the game
playGame(NUM_ROUNDS, START_ROUND);
const title = document.querySelector(".heading");
const text = "Rock Paper Scissors";
typewriter(title, text);

const NUM_ROUNDS = 3;
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
            console.log('Choice unsuccessful')
    }
    console.log('Computer choice = ' + choice)
    return choice
}

function playRound(humanChoice, computerChoice) {
    let winner = undefined
    if (computerChoice === 'rock' && humanChoice === 'scissors'
        || computerChoice === 'scissors' && humanChoice === 'paper'
        || computerChoice === 'paper' && humanChoice === 'rock') {
        winner = 'computer'
        console.log('You lose this round. :(')
    } else if (humanChoice === 'rock' && computerChoice === 'scissors'
        || humanChoice === 'scissors' && computerChoice === 'paper'
        || humanChoice === 'paper' && computerChoice === 'rock') {
        winner = 'human'
        console.log('You win this round. :)')
    } else {
        winner = 'draw'
        console.log('This round is a draw.')
    }
    return winner;
}

function declareWinner(humanScore, computerScore) {
    let winMessage = '';
    if (computerScore > humanScore) {
        winMessage = 'Computer wins - better luck next time. :(';
    } else if (humanScore > computerScore) {
        winMessage = 'Congratulations, you win! :)';
    } else {
        winMessage = 'This time it was a draw'
    }
    return winMessage;
}

function playGame(numRounds, startRound) {
    let humanScore = 0;
    let computerScore = 0;
    let draws = 0;
    let currentRound = startRound;

    console.log(`starting game. ${numRounds} total rounds.`);

    displayRound(currentRound, numRounds);
    displayScore(humanScore, computerScore, draws);

    const userOption = document.querySelector("#user-option");

    const handleRound = (event) => {

        console.log('ROUND ' + currentRound)

        let target = event.target;

        console.log(target.textContent);

        let input = target.textContent.toLowerCase();
        let computerChoice = getComputerChoice();

        const winner = playRound(input, computerChoice)
        if (winner === 'computer') computerScore++;
        if (winner === 'human') humanScore++;
        if (winner === 'draw') draws++;
        currentRound++
        console.log('round incremented ' + currentRound);

        displayRound(currentRound, numRounds);
        displayScore(humanScore, computerScore, draws)

        if (currentRound > numRounds) {
            buttons = document.querySelectorAll("#user-option button");
            disableButtons(buttons);
            displayWinner(humanScore, computerScore)
            userOption.removeEventListener("click", handleRound);
            resetGame()
        }
    };
    userOption.addEventListener("click", handleRound);
}

function resetGame() {
    const resultsContainer = document.querySelector(".reset");
    const existingResetButton = document.querySelector(".resetButton");
    if (existingResetButton) {
        existingResetButton.remove();
    }
    const resetButton = document.createElement("button");
    resetButton.classList.add("resetButton");
    resetButton.textContent = "New Game";
    resultsContainer.appendChild(resetButton);
    resetButton.addEventListener("click", (event) => {
        if (event.target.classList.contains("resetButton")) {
            playGame(NUM_ROUNDS, START_ROUND);
            document.querySelector(".resetButton").remove();
            document.querySelector(".results").textContent = "";
            console.log("game reset")
        }
        buttons = document.querySelectorAll("#user-option button");
        enableButtons(buttons);
    });

}
playGame(NUM_ROUNDS, START_ROUND)


// ui stuff
function displayRound(roundNumber, totalRounds) {
    const round = document.querySelector(".round");
    if (roundNumber > totalRounds) {
        roundNumber = totalRounds;
    }
    round.textContent = `Round ${roundNumber}`;
};

function displayScore(humanScore, computerScore, draws) {
    const scoreboard = document.querySelector(".score");
    scoreboard.textContent = `Wins - ${humanScore} || Draw - ${draws} || Loss - ${computerScore}`;
}

function displayWinner(humanScore, computerScore) {
    let winner = document.querySelector(".results");
    winner.textContent = declareWinner(humanScore, computerScore);
};

function disableButtons(buttons) {
    buttons.forEach(button => button.disabled = true);
}

function enableButtons(buttons) {
    buttons.forEach(button => button.disabled = false);
}


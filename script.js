
const NUM_ROUNDS = 3;

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

function getHumanChoice(input) {
    let userInput = input

    return userInput
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

function playGame(numRounds) {
    let humanScore = 0;
    let computerScore = 0;
    let currentRound = 1;

    console.log(`starting game. ${numRounds} total rounds.`);

    displayRound(currentRound, numRounds); // Pass numRounds as an argument

    let userOption = document.querySelector("#userOption");

    userOption.addEventListener("click", (event) => {

        console.log('ROUND ' + currentRound)
        // stop game continuing if round number exceeded
        if (currentRound > numRounds) {
            console.log('game over. The winner is ');
            return;
        }

        let target = event.target;

        console.log(target.textContent);

        let input = target.textContent.toLowerCase();
        let computerChoice = getComputerChoice();

        let winner = playRound(getHumanChoice(input), computerChoice)

        if (winner === 'computer') {
            computerScore++
        } else if (winner === 'human') {
            humanScore++
        }

        currentRound++
        console.log('round incremented ' + currentRound);
        displayRound(currentRound, numRounds);
        if (currentRound > numRounds) {
            buttons = document.querySelectorAll("#userOption button");
            disableButtons(buttons);
            displayWinner(humanScore, computerScore)
            resetGame() // Remove unnecessary arguments
        }
    });
}

// ui stuff
function displayRound(roundNumber, totalRounds) {
    let round = document.querySelector(".round");
    if (roundNumber > totalRounds) {
        roundNumber = totalRounds;
    }
    round.textContent = `Round ${roundNumber}`;
};

function displayWinner(humanScore, computerScore) {
    let winner = document.querySelector(".results");

    winner.textContent = declareWinner(humanScore, computerScore)


};

function disableButtons(buttons) {
    buttons.forEach(button => button.disabled = true);
}

function enableButtons(buttons) {
    buttons.forEach(button => button.disabled = false);
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
            playGame(NUM_ROUNDS);
            document.querySelector(".resetButton").remove();
            document.querySelector(".results").textContent = "";

        }
        buttons = document.querySelectorAll("#userOption button");
        enableButtons(buttons);
    });

}

playGame(NUM_ROUNDS)


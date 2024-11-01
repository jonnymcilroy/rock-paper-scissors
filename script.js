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

function getHumanChoice() {
    const validInputs = ['rock', 'paper', 'scissors']
    let userInput = undefined
    do {
        userInput = prompt("Please enter your choice? Rock, Paper or Scissors.").toLowerCase()
    } while (!validInputs.includes(userInput))
    console.log('Human choice = ' + userInput)
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
    if (computerScore > humanScore) {
        console.log('Computer wins - better luck next time. :(')
    } else if (humanScore > computerScore) {
        console.log('Congratulations, you win! :)')
    }
    console.log('Want to play again? Simply refresh the browser.')
}

function playGame(numRounds) {
    let humanScore = 0;
    let computerScore = 0;
    for (let i = 1; i <= numRounds; i++) {
        console.log(`Round number ${i}`)
        let winner = playRound(getHumanChoice(), getComputerChoice())
        if (winner === 'computer') {
            computerScore++
        } else if (winner === 'human') {
            humanScore++
        }
    }
    declareWinner(humanScore, computerScore)
}

playGame(5)
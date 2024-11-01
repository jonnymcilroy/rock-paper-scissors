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
    console.log(choice)
    return choice
}
getComputerChoice()

function getHumanChoice() {
    const validInputs = ['rock', 'paper', 'scissors']
    let userInput = undefined
    do {
        userInput = prompt("Please enter your choice? Rock, Paper or Scissors.").toLowerCase()
    } while (!validInputs.includes(userInput))
    console.log(userInput)
}

getHumanChoice()
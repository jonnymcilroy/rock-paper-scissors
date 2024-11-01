function getComputerChoice() {
    numChoice = Math.floor(Math.random() * 3)
    choice = undefined
    switch (numChoice) {
        case 0:
            choice = 'Rock'
            break;
        case 1:
            choice = 'Paper'
            break;
        case 2:
            choice = 'Scissors'
            break;
        default:
            console.log('Choice unsuccessful')
    }
    console.log(choice)
    return choice
}
getComputerChoice()
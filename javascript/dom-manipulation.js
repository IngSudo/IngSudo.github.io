class InitGame {
  constructor(game) {
    this.game = game;

    this.playerScore = 0;
    this.computerScore = 0;

    const scoreValues = this.game.querySelectorAll(".rps-game__score-value");
    this.playerScoreSpan = scoreValues[0];
    this.computerScoreSpan = scoreValues[1];

    this.roundResultsMsg = this.game.querySelector(".rps-game__results-msg");
    this.winnerMsg = this.game.querySelector(".rps-game__results-winner");
    this.optionsContainer = this.game.querySelector(".rps-game__options");
    this.resetGameBtn = this.game.querySelector(
      ".rps-game__results .rps-game__btn"
    );

    this.resetGameBtn.addEventListener("click", () => this.resetGame());

    const optionBtns = this.game.querySelectorAll(
      ".rps-game__options-btns .rps-game__btn"
    );

    optionBtns.forEach((btn) => {
      btn.addEventListener("click", () =>
        this.showResults(btn.textContent.trim())
      );
    });
  }

  getRandomComputerResult() {
    const options = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  hasPlayerWonTheRound(player, computer) {
    return (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Scissors" && computer === "Paper") ||
      (player === "Paper" && computer === "Rock")
    );
  }

  getRoundResults(userOption) {
    const computerResult = this.getRandomComputerResult();

    if (this.hasPlayerWonTheRound(userOption, computerResult)) {
      this.playerScore++;
      return `Player wins! ${userOption} beats ${computerResult}`;
    } else if (computerResult === userOption) {
      return `It's a tie! Both chose ${userOption}`;
    } else {
      this.computerScore++;
      return `Computer wins! ${computerResult} beats ${userOption}`;
    }
  }

  showResults(userOption) {
    this.roundResultsMsg.innerText = this.getRoundResults(userOption);
    this.computerScoreSpan.innerText = this.computerScore;
    this.playerScoreSpan.innerText = this.playerScore;

    if (this.playerScore === 3 || this.computerScore === 3) {
      this.winnerMsg.innerText = `${
        this.playerScore === 3 ? "Player" : "Computer"
      } has won the game!`;

      this.resetGameBtn.style.display = "block";
      this.optionsContainer.style.display = "none";
    }
  }

  resetGame() {
    this.playerScore = 0;
    this.computerScore = 0;
    this.playerScoreSpan.innerText = this.playerScore;
    this.computerScoreSpan.innerText = this.computerScore;
    this.resetGameBtn.style.display = "none";
    this.optionsContainer.style.display = "block";
    this.winnerMsg.innerText = "";
    this.roundResultsMsg.innerText = "";
  }
}

document.querySelectorAll(".rps-game").forEach((component) => {
  new InitGame(component);
});

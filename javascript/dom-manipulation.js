(function () {
  function getRandomComputerResult() {
    const options = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  function hasPlayerWonTheRound(player, computer) {
    return (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Scissors" && computer === "Paper") ||
      (player === "Paper" && computer === "Rock")
    );
  }

  function initGame(game) {
    let playerScore = 0;
    let computerScore = 0;

    const scoreValues = game.querySelectorAll(".rps-game__score-value");
    const playerScoreSpan = scoreValues[0];
    const computerScoreSpan = scoreValues[1];

    const roundResultsMsg = game.querySelector(".rps-game__results-msg");
    const winnerMsg = game.querySelector(".rps-game__results-winner");
    const optionsContainer = game.querySelector(".rps-game__options");
    const resetGameBtn = game.querySelector(".rps-game__results .rps-game__btn");

    function getRoundResults(userOption) {
      const computerResult = getRandomComputerResult();

      if (hasPlayerWonTheRound(userOption, computerResult)) {
        playerScore++;
        return `Player wins! ${userOption} beats ${computerResult}`;
      } else if (computerResult === userOption) {
        return `It's a tie! Both chose ${userOption}`;
      } else {
        computerScore++;
        return `Computer wins! ${computerResult} beats ${userOption}`;
      }
    }

    function showResults(userOption) {
      roundResultsMsg.innerText = getRoundResults(userOption);
      computerScoreSpan.innerText = computerScore;
      playerScoreSpan.innerText = playerScore;

      if (playerScore === 3 || computerScore === 3) {
        winnerMsg.innerText = `${
          playerScore === 3 ? "Player" : "Computer"
        } has won the game!`;

        resetGameBtn.style.display = "block";
        optionsContainer.style.display = "none";
      }
    }

    function resetGame() {
      playerScore = 0;
      computerScore = 0;
      playerScoreSpan.innerText = playerScore;
      computerScoreSpan.innerText = computerScore;
      resetGameBtn.style.display = "none";
      optionsContainer.style.display = "block";
      winnerMsg.innerText = "";
      roundResultsMsg.innerText = "";
    }

    resetGameBtn.addEventListener("click", resetGame);

    const optionBtns = game.querySelectorAll(
      ".rps-game__options-btns .rps-game__btn"
    );

    optionBtns.forEach((btn) => {
      btn.addEventListener("click", () =>
        showResults(btn.textContent.trim())
      );
    });
  }

  const components = document.querySelectorAll(".rps-game");
  for (const component of components) {
    initGame(component);
  }
})();

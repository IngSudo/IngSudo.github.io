class PalindromeChecker {
  constructor(rootE) {
    this.rootE = rootE;
    this.palInput = this.rootE.querySelector(".palindrome__container-input");
    this.palCheckBtn = this.rootE.querySelector(".palindrome__container-btn");
    this.palResults = this.rootE.querySelector(
      ".palindrome__container-results"
    );

    this.initEvents();
  }

  initEvents() {
    this.palCheckBtn.addEventListener("click", () =>
      this.checkForPalindrome(this.palInput.value)
    );
    this.palInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.checkForPalindrome(this.palInput.value);
      }
    });
  }

  checkForPalindrome(input) {
    const originalInput = input;

    if (input === "") {
      alert("Please input a value");
      return;
    }

    const lowerCaseStr = input.replace(/[^A-Za-z0-9]/gi, "").toLowerCase();
    const isPalindrome = lowerCaseStr === [...lowerCaseStr].reverse().join("");
    const resultMsg = `${originalInput} ${
      isPalindrome ? "is" : "is not"
    } a palindrome.`;

    const pTag = document.createElement("p");
    pTag.className = "palindrome__user-input";
    pTag.innerText = resultMsg;
    this.palResults.replaceChildren(pTag);

    this.palResults.classList.remove("palindrome__container-results--hidden");

    this.palInput.value = "";
  }
}

document
  .querySelectorAll(".palindrome")
  .forEach((component) => new PalindromeChecker(component));

(function () {
  class Phone {
    constructor(rootE) {
      this.rootE = rootE;
      this.phoneInput = this.rootE.querySelector(".phone__container__input");
      this.checkBtn = this.rootE.querySelector(
        ".phone__container__footer__btn--check"
      );
      this.clearBtn = this.rootE.querySelector(
        ".phone__container__footer__btn--clear"
      );
      this.resultsContainer = this.rootE.querySelector(
        ".phone__container__results"
      );

      this.initEvents();
    }

    initEvents() {
      this.checkBtn.addEventListener("click", () => {
        this.checkValidNumber(this.phoneInput.value);
        this.phoneInput.value = "";
      });

      this.phoneInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.checkValidNumber(this.phoneInput.value);
          this.phoneInput.value = "";
        } else {
          const textError = this.resultsContainer.querySelector(
            ".phone__container__results__text--error"
          );
          if (textError) {
            this.clearResults();
          }
        }
      });

      this.clearBtn.addEventListener("click", () => {
        this.resultsContainer.textContent = "";
      });
    }

    clearResults() {
      this.resultsContainer.textContent = "";
    }

    checkValidNumber(input) {
      const resultText = document.createElement("p");
      resultText.className = "phone__container__results__text";

      if (input === "") {
        resultText.classList.add("phone__container__results__text--error");
        resultText.innerText = "Please inserte a valid number";
        this.resultsContainer.replaceChildren(resultText);
        return;
      }

      const countryCode = "^(1\\s?)?";
      const areaCode = "(\\([0-9]{3}\\)|[0-9]{3})";
      const spacesDashes = "[\\s\\-]?";
      const phoneNumber = "[0-9]{3}[\\s\\-]?[0-9]{4}$";
      const phoneRegex = new RegExp(
        `${countryCode}${areaCode}${spacesDashes}${phoneNumber}`
      );

      if (phoneRegex.test(input)) {
        resultText.classList.add("phone__container__results__text--valid");
        resultText.innerText = `Valid US number: ${input}`;
      } else {
        resultText.classList.add("phone__container__results__text--invalid");
        resultText.innerText = `Invalid US number: ${input}`;
      }

      this.resultsContainer.appendChild(resultText);
    }
  }

  document.querySelectorAll(".phone").forEach((component) => {
    new Phone(component);
  });
})();

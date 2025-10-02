(function () {
  class Phone {
    constructor(rootE) {
      this.rootE = rootE;
      this.conInput = this.rootE.querySelector(".phone__container__input");
      this.checkBtn = this.rootE.querySelector(
        ".phone__container__footer__btn--check"
      );
      this.clearBtn = this.rootE.querySelector(
        ".phone__container__footer__btn--clear"
      );
      this.results = this.rootE.querySelector(".phone__container__results");

      this.initEvents();
    }

    initEvents() {
      this.checkBtn.addEventListener("click", () => {
        this.checkValidNumber(this.conInput.value);
        this.conInput.value = "";
      });

      this.conInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.checkValidNumber(this.conInput.value);
          this.conInput.value = "";
        }
      });

      this.clearBtn.addEventListener("click", () => {
        this.results.textContent = "";
      });
    }

    checkValidNumber(input) {
      if (input === "") {
        alert("Please provide a phone number");
        return;
      }

      const countryCode = "^(1\\s?)?";
      const areaCode = "(\\([0-9]{3}\\)|[0-9]{3})";
      const spacesDashes = "[\\s\\-]?";
      const phoneNumber = "[0-9]{3}[\\s\\-]?[0-9]{4}$";
      const phoneRegex = new RegExp(
        `${countryCode}${areaCode}${spacesDashes}${phoneNumber}`
      );

      const labelP = this.rootE.ownerDocument.createElement("p");
      labelP.className = "phone__container__results__text";

      if (phoneRegex.test(input)) {
        labelP.style.color = "#00471b";
      } else {
        labelP.style.color = "#4d3800";
      }

      labelP.innerText = `${
        phoneRegex.test(input) ? "Valid" : "Invalid"
      } US number: ${input}`;

      this.results.appendChild(labelP);
    }
  }

  document.querySelectorAll(".phone").forEach((component) => {
    new Phone(component);
  });
})();

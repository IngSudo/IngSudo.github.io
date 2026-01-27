(function () {
  function converter(rootE) {
    const form = rootE.querySelector(".converter__form");
    const convertButton = rootE.querySelector(".converter__form__fieldset-btn");
    const output = rootE.querySelector(".converter__output");
    const input = rootE.querySelector(".converter__form__fieldset-input");

    const convertToRoman = (num) => {
      const ref = [
        ["M", 1000],
        ["CM", 900],
        ["D", 500],
        ["CD", 400],
        ["C", 100],
        ["XC", 90],
        ["L", 50],
        ["XL", 40],
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1],
      ];
      const res = [];

      ref.forEach(function (arr) {
        while (num >= arr[1]) {
          res.push(arr[0]);
          num -= arr[1];
        }
      });

      return res.join("");
    };

    const isValid = (str, int) => {
      rootE.querySelectorAll(".converter__errors__error").forEach((err) => {
        err.classList.remove("converter__errors__error--visible");
      });

      if (!str || str.match(/[e.]/g)) {
        rootE
          .querySelector(".converter__errors__error--invalid")
          .classList.add("converter__errors__error--visible");
        return false;
      } else if (int < 1) {
        rootE
          .querySelector(".converter__errors__error--low")
          .classList.add("converter__errors__error--visible");
        return false;
      } else if (int > 3999) {
        rootE
          .querySelector(".converter__errors__error--high")
          .classList.add("converter__errors__error--visible");
        return false;
      }

      return true;
    };

    const clearOutput = () => {
      output.innerText = "";
      output.classList.add("converter__output--hidden");
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      updateUI();
    });

    convertButton.addEventListener("click", () => {
      updateUI();
    });

    const updateUI = () => {
      const numStr = input.value.trim();
      const int = parseInt(numStr, 10);

      clearOutput();

      if (isValid(numStr, int)) {
        output.innerText = convertToRoman(int);
        output.classList.remove("converter__output--hidden");
      }
    };
  }

  const components = document.querySelectorAll(".converter");
  for (const component of components) {
    converter(component);
  }
})();

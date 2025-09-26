(function () {
  function converter(rootE) {
    const form = rootE.querySelector(".converter__form");
    const convertButton = rootE.querySelector(".converter__form__fieldset-btn");
    const output = rootE.querySelector(".converter__output");
    const input = rootE.querySelector(".converter__form__fieldset-input")

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
      let errText = "";

      if (!str || str.match(/[e.]/g)) {
        errText = "Please enter a valid number.";
      } else if (int < 1) {
        errText = "Please enter a number greater than or equal to 1.";
      } else if (int > 3999) {
        errText = "Please enter a number less than or equal to 3999.";
      } else {
        return true;
      }

      output.innerText = errText;
      output.classList.add("converter__output--alert");

      return false;
    };

    const clearOutput = () => {
      output.innerText = "";
      output.classList.remove("converter__output--alert");
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

      output.classList.remove("converter__output--hidden");

      clearOutput();

      if (isValid(numStr, int)) {
        output.innerText = convertToRoman(int);
      }
    };
  }

  const components = document.querySelectorAll(".converter");
  for (const component of components) {
    converter(component);
  }
})();

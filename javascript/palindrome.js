(function () {
  function palindrome(rootE) {
    const palInput = rootE.querySelector(".palindrome__container-input");
    const palCheckBtn = rootE.querySelector(".palindrome__container-btn");
    const palResults = rootE.querySelector(".palindrome__container-results");

    const checkForPalindrome = (input) => {
      const originalInput = input;

      if (input === "") {
        alert("Please input a value");
        return;
      }

      palResults.replaceChildren();

      const lowerCaseStr = input.replace(/[^A-Za-z0-9]/gi, "").toLowerCase();
      let resultMsg = `${originalInput} ${
        lowerCaseStr === [...lowerCaseStr].reverse().join("") ? "is" : "is not"
      } a palindrome.`;

      const pTag = document.createElement("p");
      pTag.className = "palindrome__user-input";
      pTag.innerText = resultMsg;
      palResults.appendChild(pTag);

      palResults.classList.remove("palindrome__container-results--hidden");
    };

    palCheckBtn.addEventListener("click", () => {
      checkForPalindrome(palInput.value);
      palInput.value = "";
    });

    palInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        checkForPalindrome(palInput.value);
        palInput.value = "";
      }
    });
  }

  const components = document.querySelectorAll(".palindrome");
  for (const component of components) {
    palindrome(component);
  }
})();

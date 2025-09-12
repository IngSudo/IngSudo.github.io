(function (rootE) {
  const calorieCounter = rootE.querySelector(".calorie-counter__form");
  const budgetNumberInput = calorieCounter.querySelector(
    ".calorie-counter__input"
  );
  const entryDropdown = calorieCounter.querySelector(
    ".calorie-counter__select"
  );
  const addEntryButton = calorieCounter.querySelector(
    '.calorie-counter__button:not([type="submit"]):not([id="clear"])'
  );
  const clearButton = calorieCounter.querySelector(
    ".calorie-counter__button--secondary"
  );
  const output = rootE.querySelector(".calorie-counter__output");
  let isError = false;

  function cleanInputString(str) {
    const regex = /[+\-\s]/g;
    return str.replace(regex, "");
  }

  function isInvalidInput(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
  }

  function addEntry() {
    const targetFieldset = calorieCounter.querySelector(
      `.calorie-counter__fieldset--${entryDropdown.value}`
    );
    const targetInputContainer = targetFieldset.querySelector(
      ".calorie-counter__inputs"
    );
    const entryNumber =
      targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    const HTMLString = `
      <label class="calorie-counter__label" for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
      <input type="text" class="calorie-counter__input" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
      <label class="calorie-counter__label" for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
      <input type="number" min="0" class="calorie-counter__input" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories"/>
    `;
    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
  }

  function calculateCalories(e) {
    e.preventDefault();
    isError = false;

    const breakfastNumberInputs = calorieCounter.querySelectorAll(
      ".calorie-counter__fieldset--breakfast input[type='number']"
    );
    const lunchNumberInputs = calorieCounter.querySelectorAll(
      ".calorie-counter__fieldset--lunch input[type='number']"
    );
    const dinnerNumberInputs = calorieCounter.querySelectorAll(
      ".calorie-counter__fieldset--dinner input[type='number']"
    );
    const snacksNumberInputs = calorieCounter.querySelectorAll(
      ".calorie-counter__fieldset--snacks input[type='number']"
    );
    const exerciseNumberInputs = calorieCounter.querySelectorAll(
      ".calorie-counter__fieldset--exercise input[type='number']"
    );

    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

    if (isError) {
      return;
    }

    const consumedCalories =
      breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories =
      budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

    output.innerHTML = `
      <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
      remainingCalories
    )} Calorie ${surplusOrDeficit}</span>
      <hr>
      <p>${budgetCalories} Calories Budgeted</p>
      <p>${consumedCalories} Calories Consumed</p>
      <p>${exerciseCalories} Calories Burned</p>
    `;
    output.classList.remove("calorie-counter__output--hidden");
    output.classList.remove("hide");
  }

  function getCaloriesFromInputs(list) {
    let calories = 0;

    for (const item of list) {
      const currVal = cleanInputString(item.value);
      const invalidInputMatch = isInvalidInput(currVal);

      if (invalidInputMatch) {
        alert(`Invalid Input: ${invalidInputMatch[0]}`);
        isError = true;
        return null;
      }
      calories += Number(currVal);
    }
    return calories;
  }

  function clearForm() {
    const inputContainers = calorieCounter.querySelectorAll(
      ".calorie-counter__inputs"
    );

    for (const container of inputContainers) {
      container.innerHTML = "";
    }

    budgetNumberInput.value = "";
    output.innerText = "";
    output.classList.add("calorie-counter__output--hidden");
    output.classList.add("hide");
  }

  addEntryButton.addEventListener("click", addEntry);
  calorieCounter.addEventListener("submit", calculateCalories);
  clearButton.addEventListener("click", clearForm);
})(document.querySelector(".calorie-counter__container"));

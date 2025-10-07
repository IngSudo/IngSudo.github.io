(function () {
  class CashRegister {
    constructor(rootE) {
      this.rootE = rootE;

      this.displayChangeDue = this.rootE.querySelector(
        ".cash-register__change-due"
      );
      this.cashInput = this.rootE.querySelector(".cash-register__input-field");
      this.purchaseBtn = this.rootE.querySelector(".cash-register__btn--check");
      this.priceScreen = this.rootE.querySelector(
        ".cash-register__price-screen"
      );
      this.cashDrawerDisplay = this.rootE.querySelector(
        ".cash-register__drawer-display"
      );

      this.price = 3.26;
      this.cid = [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100],
      ];

      this.initEvents();
      this.updateUI();
    }

    initEvents() {
      this.purchaseBtn.addEventListener("click", () => this.checkResults());

      this.cashInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.checkResults();
        }
      });
    }

    checkResults() {
      if (!this.cashInput.value) return;
      this.checkCashRegister();
    }

    checkCashRegister() {
      const cashInCents = Math.round(Number(this.cashInput.value) * 100);
      const priceInCents = Math.round(this.price * 100);

      if (cashInCents < priceInCents) {
        alert("Customer does not have enough money to purchase the item");
        this.cashInput.value = "";
        return;
      }

      if (cashInCents === priceInCents) {
        this.displayChangeDue.innerHTML =
          "<p>No change due - customer paid with exact cash</p>";
        this.cashInput.value = "";
        return;
      }

      let changeDue = cashInCents - priceInCents;
      const reversedCid = [...this.cid]
        .reverse()
        .map(([denominationName, amount]) => [
          denominationName,
          Math.round(amount * 100),
        ]);
      const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
      const result = { status: "OPEN", change: [] };
      const totalCID = reversedCid.reduce(
        (prev, [_, amount]) => prev + amount,
        0
      );

      if (totalCID < changeDue) {
        this.displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
        return;
      }

      if (totalCID === changeDue) {
        result.status = "CLOSED";
      }

      for (let i = 0; i < reversedCid.length; i++) {
        if (changeDue >= denominations[i] && changeDue > 0) {
          const [denominationName, total] = reversedCid[i];
          const possibleChange = Math.min(total, changeDue);
          const count = Math.floor(possibleChange / denominations[i]);
          const amountInChange = count * denominations[i];
          changeDue -= amountInChange;

          if (count > 0) {
            result.change.push([denominationName, amountInChange / 100]);
          }
        }
      }

      if (changeDue > 0) {
        this.displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
        return;
      }

      this.formatResults(result.status, result.change);
      this.updateUI(result.change);
    }

    formatResults(status, change) {
      this.displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
      this.displayChangeDue.innerHTML += change
        .map(
          ([denominationName, amount]) =>
            `<p>${denominationName}: $${amount}</p>`
        )
        .join("");
    }

    updateUI(change) {
      const currencyNameMap = {
        PENNY: "Pennies",
        NICKEL: "Nickels",
        DIME: "Dimes",
        QUARTER: "Quarters",
        ONE: "Ones",
        FIVE: "Fives",
        TEN: "Tens",
        TWENTY: "Twenties",
        "ONE HUNDRED": "Hundreds",
      };

      if (change) {
        change.forEach(([changeDenomination, changeAmount]) => {
          const targetArr = this.cid.find(
            ([denominationName]) => denominationName === changeDenomination
          );
          targetArr[1] =
            (Math.round(targetArr[1] * 100) - Math.round(changeAmount * 100)) /
            100;
        });
      }

      this.cashInput.value = "";
      this.priceScreen.textContent = `Total: $${this.price}`;
      this.cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
        ${this.cid
          .map(
            ([denominationName, amount]) =>
              `<p>${currencyNameMap[denominationName]}: $${amount}</p>`
          )
          .join("")}
      `;
    }
  }

  document.querySelectorAll(".cash-register").forEach((component) => {
    new CashRegister(component);
  });
})();

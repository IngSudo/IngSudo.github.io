(function () {
  class RpgCreatureSearch {
    constructor(rootE) {
      this.rootE = rootE;

      // inputs y secciones
      this.form = this.rootE.querySelector(".rpg__form");
      this.input = this.rootE.querySelector(".rpg__form-input");

      // info principal
      this.name = this.rootE.querySelector(".rpg__info-name");
      this.id = this.rootE.querySelector(".rpg__info-id");
      this.weight = this.rootE.querySelector(".rpg__info-weight");
      this.height = this.rootE.querySelector(".rpg__info-height");

      // especial
      this.specialName = this.rootE.querySelector(".rpg__special-name");
      this.specialDescription = this.rootE.querySelector(".rpg__special-description");

      // tipos
      this.types = this.rootE.querySelector(".rpg__types");

      // stats
      this.stats = {
        hp: this.rootE.querySelector(".rpg__stat-hp"),
        attack: this.rootE.querySelector(".rpg__stat-attack"),
        defense: this.rootE.querySelector(".rpg__stat-defense"),
        spAttack: this.rootE.querySelector(".rpg__stat-sp-attack"),
        spDefense: this.rootE.querySelector(".rpg__stat-sp-defense"),
        speed: this.rootE.querySelector(".rpg__stat-speed"),
      };

      this.initEvents();
    }

    initEvents() {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.fetchCreature();
      });
    }

    async fetchCreature() {
      const query = this.input.value.trim().toLowerCase();
      if (!query) return;

      try {
        const response = await fetch(
          `https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`
        );
        if (!response.ok) throw new Error("Not found");
        const data = await response.json();
        this.renderCreature(data);
      } catch (err) {
        this.resetDisplay();
        alert("Creature not found");
        console.error("Error:", err);
      }
    }

    renderCreature(data) {
      this.name.textContent = data.name.toUpperCase();
      this.id.textContent = `#${data.id}`;
      this.weight.textContent = `Weight: ${data.weight}`;
      this.height.textContent = `Height: ${data.height}`;
      this.specialName.textContent = data.special.name;
      this.specialDescription.textContent = data.special.description;

      const [hp, atk, def, spAtk, spDef, spd] = data.stats;
      this.stats.hp.textContent = hp.base_stat;
      this.stats.attack.textContent = atk.base_stat;
      this.stats.defense.textContent = def.base_stat;
      this.stats.spAttack.textContent = spAtk.base_stat;
      this.stats.spDefense.textContent = spDef.base_stat;
      this.stats.speed.textContent = spd.base_stat;

      this.types.innerHTML = data.types
        .map((t) => `<span class="type ${t.name}">${t.name}</span>`)
        .join("");
    }

    resetDisplay() {
      this.name.textContent = "";
      this.id.textContent = "";
      this.weight.textContent = "";
      this.height.textContent = "";
      this.specialName.textContent = "";
      this.specialDescription.textContent = "";
      this.types.innerHTML = "";
      Object.values(this.stats).forEach((el) => (el.textContent = ""));
    }
  }

  document.querySelectorAll(".rpg").forEach((component) => {
    new RpgCreatureSearch(component);
  });
})();

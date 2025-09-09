(function() {
  const darkColorsArr = [
    "#2C3E50",
    "#34495E",
    "#2C2C2C",
    "#616A6B",
    "#4A235A",
    "#2F4F4F",
    "#0E4B5A",
    "#36454F",
    "#2C3E50",
    "#800020",
  ];

  function getRandomIndex() {
    return Math.floor(darkColorsArr.length * Math.random());
  }

  function initColorChanger(i) {
    const hexColor = i.querySelector(".color-info__code");
    const btn = i.querySelector(".button");

    btn.addEventListener("click", () => {
      const color = darkColorsArr[getRandomIndex()];
      hexColor.innerText = color;
      i.style.backgroundColor = color;
    });
  }

  const components = document.querySelectorAll(".color-changer");
    for (component of components){
      initColorChanger(component);
    }

})();

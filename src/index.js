const colorable = require("colorable");
const polished = require("polished");

const styles = document.createElement("style");
document.head.appendChild(styles);

const inputs = {
  baseColor: document.getElementById("base"),
  function: document.getElementById("function"),
  mixColor: document.getElementById("mix-color"),
  amount: document.getElementById("amount")
};

const outputs = {
  stylesheet: styles,
  inputBackground: document.getElementById("input"),
  amountDisplay: document.getElementById("amount-display"),
  mixColorWrap: document.getElementById("mix-color-wrap"),
  hex: document.getElementById("output").querySelector("p"),
  formula: document.getElementById("output").querySelector("pre")
};

update();
inputs.baseColor.addEventListener("change", update);
inputs.function.addEventListener("change", update);
inputs.mixColor.addEventListener("change", update);
inputs.amount.addEventListener("change", update);

function update() {
  const baseColor = inputs.baseColor.value;
  const formula = inputs.function.value;
  const mixColor = inputs.mixColor.value;
  const amount = inputs.amount.value;
  const decimal = Number(amount) / 100;

  outputs.mixColorWrap.style.display = formula === "mix" ? "block" : "none";
  outputs.amountDisplay.innerText = `${amount}% (${decimal})`;

  let color = baseColor;
  let formulaString = `${baseColor}`;
  if (formula === "tint") {
    color = polished.tint(decimal, baseColor);
    formulaString = `tint(${decimal}, "${baseColor}");`;
  } else if (formula === "lighten") {
    color = polished.lighten(decimal, baseColor);
    formulaString = `lighten(${decimal}, "${baseColor}");`;
  } else if (formula === "shade") {
    color = polished.shade(decimal, baseColor);
    formulaString = `shade(${decimal}, "${baseColor}");`;
  } else if (formula === "darken") {
    color = polished.darken(decimal, baseColor);
    formulaString = `darken(${decimal}, "${baseColor}");`;
  } else if (formula === "mix") {
    color = polished.mix(decimal, mixColor, baseColor);
    formulaString = `mix(${Number(amount) /
      100}, "${mixColor}", "${baseColor}");`;
  }

  outputs.stylesheet.innerHTML = `
  body { background-color: ${color}; }
  #input { background-color: ${baseColor}; }
  `;

  outputs.hex.innerText = color;
  outputs.formula.innerText = formulaString;
}

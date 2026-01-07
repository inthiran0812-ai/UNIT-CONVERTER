// 1. Data: The math rules for conversions
const conversionData = {
    length: { meters: 1, kilometers: 1000, feet: 0.3048 },
    mass: { kilograms: 1, grams: 0.001, pounds: 0.4535 }
};

const category = document.getElementById('category');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const fromInput = document.getElementById('fromInput');
const toInput = document.getElementById('toInput');

// 2. Function: Update unit choices when category changes
function updateUnits() {
    const units = Object.keys(conversionData[category.value] || {Celsius:0, Fahrenheit:0});
    fromUnit.innerHTML = units.map(u => `<option>${u}</option>`).join('');
    toUnit.innerHTML = units.map(u => `<option>${u}</option>`).join('');
}

// 3. Function: Do the math
function calculate() {
    const val = parseFloat(fromInput.value);
    if (isNaN(val)) return;

    const cat = category.value;
    const fromRate = conversionData[cat][fromUnit.value];
    const toRate = conversionData[cat][toUnit.value];

    // Formula: Value * (FromUnit / ToUnit)
    toInput.value = (val * (fromRate / toRate)).toFixed(4);
}

// 4. Listeners: Watch for user typing
category.onchange = updateUnits;
fromInput.oninput = calculate;
fromUnit.onchange = calculate;
toUnit.onchange = calculate;

// Start the page
updateUnits();
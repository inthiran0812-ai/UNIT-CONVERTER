const units = {
    length: {
        Meters: 1,
        Kilometers: 1000,
        Feet: 0.3048,
        Inches: 0.0254,
        Miles: 1609.34
    },
    mass: {
        Kilograms: 1,
        Grams: 0.001,
        Pounds: 0.453592,
        Ounces: 0.0283495
    },
    temp: ['Celsius', 'Fahrenheit', 'Kelvin']
};

let activeCategory = 'length';

const fromInput = document.getElementById('fromInput');
const toInput = document.getElementById('toInput');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const historyList = document.getElementById('historyList');

// 1. Logic to Populate Dropdowns
function setCategory(cat) {
    activeCategory = cat;

    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === cat);
    });

    const options = cat === 'temp' ? units.temp : Object.keys(units[cat]);
    
    const optionsHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
    fromUnit.innerHTML = optionsHTML;
    toUnit.innerHTML = optionsHTML;

    // Set a default "to" unit different from "from"
    if (options.length > 1) toUnit.selectedIndex = 1;

    convert();
}

// 2. Conversion Logic
function convert() {
    const val = parseFloat(fromInput.value);
    
    if (isNaN(val)) {
        toInput.value = '';
        return;
    }

    let result;

    if (activeCategory === 'temp') {
        result = tempConvert(val, fromUnit.value, toUnit.value);
    } else {
        const fromFactor = units[activeCategory][fromUnit.value];
        const toFactor = units[activeCategory][toUnit.value];
        // Convert input to base unit, then to target unit
        result = (val * fromFactor) / toFactor;
    }

    // FIX 1: Limit decimals and remove trailing zeros
    // toPrecision(7) handles very small and large numbers for engineers
    toInput.value = parseFloat(result.toPrecision(7));
}

function tempConvert(v, f, t) {
    let c;
    if (f === 'Celsius') c = v;
    else if (f === 'Fahrenheit') c = (v - 32) * 5 / 9;
    else c = v - 273.15; // Kelvin

    if (t === 'Celsius') return c;
    if (t === 'Fahrenheit') return (c * 9 / 5) + 32;
    if (t === 'Kelvin') return c + 273.15;
    return v;
}

// 3. Event Listeners
document.querySelectorAll('.nav-link').forEach(btn => {
    btn.onclick = () => setCategory(btn.dataset.cat);
});

document.getElementById('swapBtn').onclick = () => {
    const temp = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = temp;
    convert();
};

document.querySelector('.action-btn').onclick = convert;

document.querySelector('.save-btn').onclick = () => {
    if (toInput.value === '') return;
    const item = document.createElement('li');
    item.textContent = `${fromInput.value} ${fromUnit.value} = ${toInput.value} ${toUnit.value}`;
    historyList.prepend(item);
};

// Live conversion as you type
fromInput.oninput = convert;
fromUnit.onchange = convert;
toUnit.onchange = convert;

// Initial Load
setCategory('length');
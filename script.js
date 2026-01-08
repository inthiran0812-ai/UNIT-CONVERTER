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

document.querySelectorAll('.nav-link').forEach(btn => {
    btn.onclick = () => setCategory(btn.dataset.cat);
});

document.getElementById('swapBtn').onclick = () => {
    [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];
    convert();
};

fromInput.oninput = convert;
fromUnit.onchange = convert;
toUnit.onchange = convert;

document.querySelector('.action-btn').onclick = convert;

function setCategory(cat) {
    activeCategory = cat;

    document.querySelectorAll('.nav-link').forEach(b =>
        b.classList.toggle('active', b.dataset.cat === cat)
    );

    const options = cat === 'temp' ? units.temp : Object.keys(units[cat]);
    fromUnit.innerHTML = toUnit.innerHTML =
        options.map(u => `<option>${u}</option>`).join('');

    convert();
}

function convert() {
    const val = parseFloat(fromInput.value);
    if (isNaN(val)) { toInput.value = ''; return; }

    if (fromUnit.value === toUnit.value) {
        toInput.value = val.toFixed(activeCategory === 'temp' ? 2 : 5);
        return;
    }

    let result;

    if (activeCategory === 'temp') {
        result = tempConvert(val, fromUnit.value, toUnit.value);
        toInput.value = result.toFixed(2);
    } else {
        const base = val * units[activeCategory][fromUnit.value];
        result = base / units[activeCategory][toUnit.value];
        toInput.value = result.toFixed(5);
    }
}

function tempConvert(v, f, t) {
    let c;
    if (f === 'Celsius') c = v;
    else if (f === 'Fahrenheit') c = (v - 32) * 5 / 9;
    else c = v - 273.15;

    if (t === 'Celsius') return c;
    if (t === 'Fahrenheit') return (c * 9 / 5) + 32;
    return c + 273.15;
}

setCategory('length');

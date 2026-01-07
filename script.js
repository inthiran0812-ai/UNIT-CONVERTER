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

const symbols = {
    Meters: 'm',
    Kilometers: 'km',
    Feet: 'ft',
    Inches: 'in',
    Miles: 'mi',
    Kilograms: 'kg',
    Grams: 'g',
    Pounds: 'lb',
    Ounces: 'oz',
    Celsius: '°C',
    Fahrenheit: '°F',
    Kelvin: 'K'
};

let activeCategory = 'length';

function setCategory(cat) {
    activeCategory = cat;

    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === cat);
    });

    const from = document.getElementById('fromUnit');
    const to = document.getElementById('toUnit');

    const options = cat === 'temp'
        ? units.temp
        : Object.keys(units[cat]);

    from.innerHTML = options.map(u => `<option>${u}</option>`).join('');
    to.innerHTML = options.map(u => `<option>${u}</option>`).join('');

    convert();
}

function convert() {
    const value = parseFloat(document.getElementById('fromInput').value);
    const output = document.getElementById('toInput');

    if (isNaN(value)) {
        output.value = '';
        return;
    }

    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    let result;

    if (activeCategory === 'temp') {
        result = convertTemp(value, fromUnit, toUnit);
    } else {
        const base = value * units[activeCategory][fromUnit];
        result = base / units[activeCategory][toUnit];
    }

    output.value = result.toFixed(5);
}

function convertTemp(v, f, t) {
    let c;

    if (f === 'Celsius') c = v;
    else if (f === 'Fahrenheit') c = (v - 32) * 5 / 9;
    else c = v - 273.15;

    if (t === 'Celsius') return c;
    if (t === 'Fahrenheit') return (c * 9 / 5) + 32;
    return c + 273.15;
}

function saveToHistory() {
    const fromVal = document.getElementById('fromInput').value;
    const toVal = document.getElementById('toInput').value;

    if (!fromVal || !toVal) return;

    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    const li = document.createElement('li');
    li.textContent = `${fromVal} ${symbols[fromUnit]} → ${toVal} ${symbols[toUnit]}`;

    document.getElementById('historyList').prepend(li);
}

setCategory('length');

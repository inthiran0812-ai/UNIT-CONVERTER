const units = {
    length: { Meters: 1, Kilometers: 1000, Feet: 0.3048, Inches: 0.0254, Miles: 1609.34 },
    mass: { Kilograms: 1, Grams: 0.001, Pounds: 0.453592, Ounces: 0.0283495 },
    temp: { type: 'F' }
};

let activeCategory = 'length';

function setCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('active');
        if(btn.textContent.toLowerCase() === cat) btn.classList.add('active');
    });

    const options = cat === 'temp' ? ['Celsius', 'Fahrenheit', 'Kelvin'] : Object.keys(units[cat]);
    document.getElementById('fromUnit').innerHTML = options.map(u => `<option>${u}</option>`).join('');
    document.getElementById('toUnit').innerHTML = options.map(u => `<option>${u}</option>`).join('');
    convert();
}

function convert() {
    const val = parseFloat(document.getElementById('fromInput').value);
    const toField = document.getElementById('toInput');
    if (isNaN(val)) { toField.value = ""; return; }

    const fromU = document.getElementById('fromUnit').value;
    const toU = document.getElementById('toUnit').value;

    if (activeCategory === 'temp') {
        toField.value = runTemp(val, fromU, toU).toFixed(3);
    } else {
        const base = val * units[activeCategory][fromU];
        toField.value = (base / units[activeCategory][toU]).toFixed(5);
    }
}

function runTemp(v, f, t) {
    let c = f === 'Celsius' ? v : f === 'Fahrenheit' ? (v-32)*5/9 : v-273.15;
    return t === 'Celsius' ? c : t === 'Fahrenheit' ? (c*9/5)+32 : c+273.15;
}

function saveToFavs() {
    const res = document.getElementById('toInput').value;
    if (!res) return;
    const entry = `[LOG]: ${document.getElementById('fromInput').value}${document.getElementById('fromUnit').value.charAt(0)} -> ${res}${document.getElementById('toUnit').value.charAt(0)}`;
    const li = document.createElement('li');
    li.textContent = entry;
    document.getElementById('historyList').prepend(li);
}

setCategory('length');
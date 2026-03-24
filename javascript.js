// KRUH FUNKCE
function setCircleValue(id, percent) {
    const circle = document.getElementById(id);
    const r = circle.r.baseVal.value;
    const c = 2 * Math.PI * r;

    circle.style.strokeDasharray = c;
    circle.style.strokeDashoffset = c - (percent / 100) * c;
}

// PØEPOÈET
function updateValues() {
    const protein = Number(document.getElementById("val_protein").value);
    const carbs   = Number(document.getElementById("val_carbs").value);
    const fat     = Number(document.getElementById("val_fat").value);

    const kcal_p = protein * 4;
    const kcal_c = carbs * 4;
    const kcal_f = fat * 9;

    const total = kcal_p + kcal_c + kcal_f;

    const p1 = total ? (kcal_p / total) * 100 : 0;
    const p2 = total ? (kcal_c / total) * 100 : 0;
    const p3 = total ? (kcal_f / total) * 100 : 0;

    setCircleValue("protein", p1);
    setCircleValue("carbs", p2);
    setCircleValue("fat", p3);

    document.getElementById("kcal_total").textContent =
        "Celkem: " + total.toFixed(0) + " kcal";
}

// NAÈTENÍ JÍDEL Z localStorage
function loadFoods() {
    const list = JSON.parse(localStorage.getItem("foods")) || [];
    const select = document.getElementById("food_select");

    list.forEach((food, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.textContent = `${food.name} (${food.weight}g)`;
        select.appendChild(opt);
    });
}

// PØIDAT VYBRANÉ JÍDLO DO MAKER
function addSelectedFood() {
    const index = document.getElementById("food_select").value;
    if (index === "") return;

    const foods = JSON.parse(localStorage.getItem("foods")) || [];
    const food = foods[index];

    document.getElementById("val_protein").value =
        Number(document.getElementById("val_protein").value) + food.protein;

    document.getElementById("val_carbs").value =
        Number(document.getElementById("val_carbs").value) + food.carbs;

    document.getElementById("val_fat").value =
        Number(document.getElementById("val_fat").value) + food.fat;

    updateValues();
}

// LIVE UPDATE
document.querySelectorAll("input").forEach(el => {
    el.addEventListener("input", updateValues);
});

// INIT
loadFoods();
updateValues();
``
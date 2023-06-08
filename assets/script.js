const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")
const createForm = document.querySelector("#create-form");

let cal = 0
const fruitCal = {}
const apiKey = "37099370-66e6515ea1eec39df2884a14d"//key to your api

fruitForm.addEventListener("submit", extractFruit);
createForm.addEventListener("submit", createNewFruit);

function extractFruit(e) {
    e.preventDefault();
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value = "";
}

async function fetchFruitData(fruit) {
    try {
        const repsData = await fetch('https://pixabay.com/api/?key=37099370-66e6515ea1eec39df2884a14d&q=fruits&image_type=photo')

        const respImg = await fetch(`https://pixabay.com/api/?key=37099370-66e6515ea1eec39df2884a14d&q=${fruit}&image_type=photo`);
        if (repsData.ok && respImg.ok) {
            const data = await repsData.json();
            const imgData = await respImg.json();
            addFruit(data, imgData);
        } else {
            throw "something has gone wrong with one of the API requests"
        }
    } catch (e) {
        console.log(e)
    }
}

async function createNewFruit(e) {
    e.preventDefault();
    const data = { name: e.target.fruitInput.value };

    const options = {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
}



const response = await fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`, options);
let messageStatus = document.querySelector("#message")
if (response.status === 201) {
    e.target.fruitInput.value = ''
    messageStatus.textContent = "Fruit successfully created."
    setTimeout(() => {
        messageStatus.textContent = ""
    }, 4000)
} else {
    e.target.fruitInput.value = ''
    messageStatus.textContent = "This fruit already exists. Please enter another fruit!"
    setTimeout(() => {
        messageStatus.textContent = ""
    }, 4000)
}


function addFruit(fruit, fruitImg) {
    const img = document.createElement("img");
    img.classList.add('fruits');
    img.alt = fruit.name;
    img.src = fruitImg.hits[0].previewURL;

    img.addEventListener("click", removeFruit, { once: true });
    fruitList.appendChild(img);

    fruitCal[fruit.name] = fruit.nutritions.calories;

    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = "Total Calories: " + cal;
}

function removeFruit(e) {
    const fruitName = e.target.alt;
    cal -= fruitCal[fruitName];
    fruitNutrition.textContent = "Total Calories: " + cal;

    delete fruitCal[fruitName];
    e.target.remove();
}

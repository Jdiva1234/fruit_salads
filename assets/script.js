const fruitForm = document.querySelector("#inputSection form")
console.log(fruitForm)

const fruitNutrition = document.querySelector("#nutritionSection p")
let cal = 0
console.log(fruitForm)
const fruitList = document.querySelector("#fruitSection ul")

const addFruit = (fruit) => {
    const li = document.createElement('li')
    li.textContent = `${fruit.name} of Genus ${fruit.genus}`
    li.addEventListener("click", (e) => {
        cal -= fruit.nutritions.calories;
        if (cal === 0) {
            fruitNutrition.textContent = "";
        } else {
            fruitNutrition.textContent = cal;
        }
        e.target.remove()


    },
        { once: true })
    fruitList.appendChild(li)

    cal += fruit.nutritions.calories
    fruitNutrition.textContent = cal;
}

const fetchFruitData = async (fruit) => {
    try {
        const resp = await fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
        if (resp.ok) {
            const data = await resp.json()
            addFruit(data)
        } else {
            throw "Error: http status code = " + resp.status
        }
    } catch (err) {
        console.log(err)
    }
}

const extractFruit = (e) => {
    e.preventDefault()
    fetchFruitData(e.target.fruitInput.value)
    e.target.fruitInput.value = ""
}
fruitForm.addEventListener("submit", extractFruit)

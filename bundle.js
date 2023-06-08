(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        const resp = await fetch(`https://justicesfruitapi.onrender.com/fruits`)
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
//after the api link it didn't work.

    
const extractFruit = (e) => {
    e.preventDefault()
    fetchFruitData(e.target.fruitInput.value)
    e.target.fruitInput.value = ""
}
fruitForm.addEventListener("submit", extractFruit)

},{}]},{},[1]);

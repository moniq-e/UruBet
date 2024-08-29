const rollButt = document.querySelector("button")

const slot1 = document.querySelector("span#s1")
const slot2 = document.querySelector("span#s2")
const slot3 = document.querySelector("span#s3")

let interval

rollButt.addEventListener("click", e => {
    slot1.setAttribute("rolls", 0)
    slot2.setAttribute("rolls", 0)
    slot3.setAttribute("rolls", 0)

    interval = setInterval(roll, 10)
})

function roll() {
    if (slot1.getAttribute("rolls") < 100) {
        slot1.innerText = Math.floor(Math.random() * 10)
        slot1.setAttribute("rolls", parseInt(slot1.getAttribute("rolls")) + 1)
    }
    if (slot2.getAttribute("rolls") < 200) {
        slot2.innerText = Math.floor(Math.random() * 10)
        slot2.setAttribute("rolls", parseInt(slot2.getAttribute("rolls")) + 1)
    }
    if (slot3.getAttribute("rolls") < 300) {
        slot3.innerText = Math.floor(Math.random() * 10)
        slot3.setAttribute("rolls", parseInt(slot3.getAttribute("rolls")) + 1)
    }
}
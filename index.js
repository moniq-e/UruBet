const rollButt = document.querySelector("button")
const amount = document.querySelector("input#amount")
const balance = document.querySelector("span#balance")

const slot1 = document.querySelector("span#s1")
const slot2 = document.querySelector("span#s2")
const slot3 = document.querySelector("span#s3")

const slots = [slot1, slot2, slot3]

let interval

rollButt.addEventListener("click", e => {
    if (amount.value && amount.value <= parseInt(balance.innerText)) {
        balance.innerText -= amount.value

        slot1.setAttribute("rolls", 0)
        slot2.setAttribute("rolls", 0)
        slot3.setAttribute("rolls", 0)

        slot1.removeAttribute("done")
        slot2.removeAttribute("done")
        slot3.removeAttribute("done")

        clearInterval(interval)
        interval = setInterval(roll, 15)
        rollButt.disabled = true
    }
})

function roll() {
    if (slot1.getAttribute("rolls") < 100) {
        slot1.innerText = Math.floor((Math.random() * 10) + 1)
        slot1.setAttribute("rolls", parseInt(slot1.getAttribute("rolls")) + 1)
    } else {
        slot1.setAttribute("done", true)
    }

    if (slot2.getAttribute("rolls") < 200) {
        slot2.innerText = Math.floor((Math.random() * 10) + 1)
        slot2.setAttribute("rolls", parseInt(slot2.getAttribute("rolls")) + 1)
    } else {
        slot2.setAttribute("done", true)
    }

    if (slot3.getAttribute("rolls") < 300) {
        slot3.innerText = Math.floor((Math.random() * 10) + 1)
        slot3.setAttribute("rolls", parseInt(slot3.getAttribute("rolls")) + 1)
    } else {
        slot3.setAttribute("done", true)
    }

    if (slot1.getAttribute("done") && slot2.getAttribute("done") && slot3.getAttribute("done")) {
        rollButt.disabled = false
        check()
        clearInterval(interval)
    }
}

function check() {
    if (slot1.innerText == slot2.innerText == slot3.innerText) {
        win()
        return
    }
    if (slots.some(s => s.innerText == 1)) {
        slots.forEach(s => {
            if (s.innerText == 1) {
                balance.innerText += amount * .25
            }
        })
    }
}

function win() {
    balance.innerText += amount * parseInt(slot1.innerText)
}
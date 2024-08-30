const rollButt = document.querySelector("button")
const amount = document.querySelector("input#amount")
const balance = document.querySelector("span#balance")

const slot1 = document.querySelector("span#s1")
const slot2 = document.querySelector("span#s2")
const slot3 = document.querySelector("span#s3")

const img1 = document.querySelector("img#s1")
const img2 = document.querySelector("img#s2")
const img3 = document.querySelector("img#s3")

const slots = [slot1, slot2, slot3]

let interval

rollButt.addEventListener("click", e => {
    if (!amount.value || amount.value < 0) return

    if (amount.value <= parseFloat(balance.innerText)) {
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
        rollButt.style.filter = "saturate(0%)"
        amount.disabled = true
    }
})

function roll() {
    if (slot1.getAttribute("rolls") < 100) {
        slot1.innerText = Math.floor((Math.random() * 5) + 1)
        img1.src = "images/imagem" + slot1.innerText + ".png"
        slot1.setAttribute("rolls", parseInt(slot1.getAttribute("rolls")) + 1)
    } else {
        slot1.setAttribute("done", true)
    }

    if (slot2.getAttribute("rolls") < 200) {
        slot2.innerText = Math.floor((Math.random() * 5) + 1)
        img2.src = "images/imagem" + slot2.innerText + ".png"
        slot2.setAttribute("rolls", parseInt(slot2.getAttribute("rolls")) + 1)
    } else {
        slot2.setAttribute("done", true)
    }

    if (slot3.getAttribute("rolls") < 300) {
        slot3.innerText = Math.floor((Math.random() * 5) + 1)
        img3.src = "images/imagem" + slot3.innerText + ".png"
        slot3.setAttribute("rolls", parseInt(slot3.getAttribute("rolls")) + 1)
    } else {
        slot3.setAttribute("done", true)
    }

    if (slot1.getAttribute("done") && slot2.getAttribute("done") && slot3.getAttribute("done")) {
        rollButt.disabled = false
        rollButt.style.filter = "saturate(50%)"
        amount.disabled = false
        check()
        clearInterval(interval)
    }
}

function check() {
    if (slot1.innerText == slot2.innerText && slot2.innerText == slot3.innerText) {
        win()
    }
    if (slots.some(s => s.innerText == 1)) {
        slots.forEach(s => {
            if (s.innerText == 1) {
                balance.innerText = parseFloat(balance.innerText) + amount.value * 1.5
            }
        })
    }
}

function win() {
    balance.innerText = parseFloat(balance.innerText) + amount.value * parseInt(slot1.innerText) * 2
}

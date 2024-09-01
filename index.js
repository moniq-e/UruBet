const rollButt = document.querySelector("button#buttRoll")
const increase = document.querySelector("button#increase")
const decrease = document.querySelector("button#decrease")
const infoButt = document.querySelector("button#buttHelp")
const closeButt = document.querySelector("button#close")

const help = document.querySelector("div#help")

const amount = document.querySelector("input#amount")
const balance = document.querySelector("span#balance")

const slot1 = document.querySelector("input#s1")
const slot2 = document.querySelector("input#s2")
const slot3 = document.querySelector("input#s3")

const windows = document.querySelectorAll("span.slot")

const img1 = document.querySelector("img#i1")
const img2 = document.querySelector("img#i2")
const img3 = document.querySelector("img#i3")

const slots = [slot1, slot2, slot3]

let interval, generated = [0, 0, 0]

decrease.addEventListener("click", e => {
    amount.value = Math.max(0, parseFloat(amount.value) - 1)
})

increase.addEventListener("click", e => {
    amount.value = Math.min(parseFloat(balance.innerText), parseFloat(amount.value) + 1)
})

infoButt.addEventListener("click", e => {
    help.style.display = "flex"
})
closeButt.addEventListener("click", e => {
    help.style.display = "none"
})

rollButt.addEventListener("click", e => {
    for (const w of windows) {
        w.classList.remove("win")
    }
    
    
    if (!amount.value || parseFloat(amount.value) < 0) return

    if (parseFloat(amount.value) <= parseFloat(balance.innerText)) {
        img1.style.animation = "spin .2s ease-in-out infinite"
        img2.style.animation = "spin .2s ease-in-out infinite"
        img3.style.animation = "spin .2s ease-in-out infinite"
        generated = generated.map(() => Math.floor((Math.random() * 5) + 1))
        
        //align the two equals numbers
        generated.sort(Math.random() < 0.5 ? (a, b) => a - b : (a, b) => b - a)
        if (generated[1] == generated[2]) {
            let temp = generated[0]
            generated[0] = generated[2]
            generated[2] = temp
        }

        balance.innerText -= amount.value

        slot1.setAttribute("rolls", 0)
        slot2.setAttribute("rolls", 0)
        slot3.setAttribute("rolls", 0)

        slot1.removeAttribute("done")
        slot2.removeAttribute("done")
        slot3.removeAttribute("done")

        clearInterval(interval)
        interval = setInterval(roll, 70)

        rollButt.style.filter = "saturate(0%)"
        rollButt.disabled = true
        increase.disabled = true
        decrease.disabled = true
        amount.disabled = true
    }
})

function roll() {
    if (slot1.getAttribute("rolls") < 30) {
        slot1.innerText = Math.floor((Math.random() * 5) + 1)
        img1.src = "images/imagem" + slot1.innerText + ".png"
        slot1.setAttribute("rolls", parseInt(slot1.getAttribute("rolls")) + 1)
    } else {
        slot1.innerText = generated[0]
        img1.src = "images/imagem" + slot1.innerText + ".png"
        img1.style.animation = "spinFinish .2s ease-in-out"
        slot1.setAttribute("done", true)
    }

    if (slot2.getAttribute("rolls") < 40) {
        slot2.innerText = Math.floor((Math.random() * 5) + 1)
        img2.src = "images/imagem" + slot2.innerText + ".png"
        slot2.setAttribute("rolls", parseInt(slot2.getAttribute("rolls")) + 1)
    } else {
        slot2.innerText = generated[1]
        img2.src = "images/imagem" + slot2.innerText + ".png"
        img2.style.animation = "spinFinish .2s ease-in-out"
        slot2.setAttribute("done", true)
    }

    if (slot3.getAttribute("rolls") < 50) {
        slot3.innerText = Math.floor((Math.random() * 5) + 1)
        img3.src = "images/imagem" + slot3.innerText + ".png"
        slot3.setAttribute("rolls", parseInt(slot3.getAttribute("rolls")) + 1)
    } else {
        slot3.innerText = generated[2]
        img3.src = "images/imagem" + slot3.innerText + ".png"
        img3.style.animation = "spinFinish .2s ease-in-out"
        slot3.setAttribute("done", true)
    }

    if (slot1.getAttribute("done") && slot2.getAttribute("done") && slot3.getAttribute("done")) {
        rollButt.style.filter = ""
        rollButt.disabled = false
        amount.disabled = false
        increase.disabled = false
        decrease.disabled = false
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
    for (const w of windows) {
        w.classList.add("win")
    }
}

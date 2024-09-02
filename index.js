const rollButt = document.querySelector("button#buttRoll")
const increase = document.querySelector("button#increase")
const decrease = document.querySelector("button#decrease")
const infoButt = document.querySelector("button#buttHelp")
const closeButt = document.querySelector("button#close")
const autoRollButt = document.querySelector("button#buttAutoRoll")

const help = document.querySelector("div#help")
const winAmount = document.querySelector("#winAmount")
const restart = document.querySelector("#restart")

const amount = document.querySelector("input#amount")
const balance = document.querySelector("span#balance")

const input1 = document.querySelector("input#s1")
const input2 = document.querySelector("input#s2")
const input3 = document.querySelector("input#s3")

const windows = document.querySelectorAll("span.slot")

const img1 = document.querySelector("img#i1")
const img2 = document.querySelector("img#i2")
const img3 = document.querySelector("img#i3")

const inputs = [input1, input2, input3]

let interval, autoRoll = false, generated = [0, 0, 0]

balance.innerText = localStorage.getItem("urubet") ?? 10

restart.addEventListener("click", _ => {
    localStorage.removeItem("urubet")
    location.reload()
})

decrease.addEventListener("click", _ => {
    amount.value = Math.max(0, parseFloat(amount.value) - 1)
})
increase.addEventListener("click", _ => {
    amount.value = Math.min(parseFloat(balance.innerText), parseFloat(amount.value) + 1)
})

infoButt.addEventListener("click", _ => {
    help.style.display = "flex"
})
closeButt.addEventListener("click", _ => {
    help.style.display = "none"
})
autoRollButt.addEventListener("click", _ => {
    if (autoRoll) {
        autoRollButt.querySelector("img").classList.remove("autoRoll")
    } else {
        autoRollButt.querySelector("img").classList.add("autoRoll")
    }
    autoRoll = !autoRoll
})

rollButt.addEventListener("click", _ => {
    winAmount.classList.remove("winnimation")
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

        input1.setAttribute("rolls", 0)
        input2.setAttribute("rolls", 0)
        input3.setAttribute("rolls", 0)

        input1.removeAttribute("done")
        input2.removeAttribute("done")
        input3.removeAttribute("done")

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
    if (input1.getAttribute("rolls") < 30) {
        input1.innerText = Math.floor((Math.random() * 5) + 1)
        img1.src = "images/imagem" + input1.innerText + ".png"
        input1.setAttribute("rolls", parseInt(input1.getAttribute("rolls")) + 1)
    } else {
        input1.innerText = generated[0]
        img1.src = "images/imagem" + input1.innerText + ".png"
        img1.style.animation = "spinFinish .2s ease-in-out"
        input1.setAttribute("done", true)
    }

    if (input2.getAttribute("rolls") < 40) {
        input2.innerText = Math.floor((Math.random() * 5) + 1)
        img2.src = "images/imagem" + input2.innerText + ".png"
        input2.setAttribute("rolls", parseInt(input2.getAttribute("rolls")) + 1)
    } else {
        input2.innerText = generated[1]
        img2.src = "images/imagem" + input2.innerText + ".png"
        img2.style.animation = "spinFinish .2s ease-in-out"
        input2.setAttribute("done", true)
    }

    if (input3.getAttribute("rolls") < 50) {
        input3.innerText = Math.floor((Math.random() * 5) + 1)
        img3.src = "images/imagem" + input3.innerText + ".png"
        input3.setAttribute("rolls", parseInt(input3.getAttribute("rolls")) + 1)
    } else {
        input3.innerText = generated[2]
        img3.src = "images/imagem" + input3.innerText + ".png"
        img3.style.animation = "spinFinish .2s ease-in-out"
        input3.setAttribute("done", true)
    }

    if (input1.getAttribute("done") && input2.getAttribute("done") && input3.getAttribute("done")) {
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
    winAmount.innerText = 0
    let won = false
    if (input1.innerText == input2.innerText && input2.innerText == input3.innerText) {
        won = true
        win()
    }
    if (inputs.some(s => s.innerText == 1)) {
        let bonus = 0
        inputs.forEach(s => {
            if (s.innerText == 1) {
                bonus += amount.value * 1.5
            }
        })
        balance.innerText = parseFloat(balance.innerText) + bonus
        winAmount.innerText = parseFloat(winAmount.innerText) + bonus
    }
    if (autoRoll) {
        setTimeout(() => rollButt.click(), won ? 1500 : 500)
    }
    if (winAmount.innerText != 0) {
        winAmount.classList.add("winnimation")
        winAmount.innerText = "+" + winAmount.innerText
    }
    localStorage.setItem("urubet", balance.innerText)
}

function win() {
    let bonus = amount.value * parseInt(input1.innerText) * 2
    balance.innerText = parseFloat(balance.innerText) + bonus
    winAmount.innerText = parseFloat(winAmount.innerText) + bonus

    for (const w of windows) {
        w.classList.add("win")
    }
}
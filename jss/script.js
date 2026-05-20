const tokens = [
  {
    id: "solana",
    symbol: "SOL",
    price: null,
    change: null
  },
  {
    id: "bitcoin",
    symbol: "BTC",
    price: null,
    change: null
  },
  {
    id: "ethereum",
    symbol: "ETH",
    price: null,
    change: null
  },
  {
    id: "jupiter-exchange-solana",
    symbol: "JUP",
    price: null,
    change: null
  },
  {
    id: "raydium",
    symbol: "RAY",
    price: null,
    change: null
  }
]
 const ids = tokens.map(token => token.id).join(",")

const fetchCrypto = async () =>{
try {
   const apikey ="CG-5E82C2QxRpFV8PT5hRGXzfLa"

const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&x_cg_demo_api_key=${apikey}`;
const response = await fetch(url);

const data = await response.json()
console.log(data)
 tokens.forEach(token => {
    token.price = data[token.id].usd
    token.change = data[token.id].usd_24h_change
})
updateDOM()

console.log(tokens)
}
catch(err){
    console.log(`error spotted${err}`)
}

}
fetchCrypto()
setInterval(fetchCrypto, 60000)

const walletOverlay = document.querySelector(".connecting-wallet")
const walletButton = document.querySelector(".wallet-btn")
const closeButton = document.querySelector(".close")

if (walletButton && walletOverlay) {
  walletButton.addEventListener("click", () => {
    walletOverlay.classList.add("active")
  })
}

if (closeButton && walletOverlay) {
  closeButton.addEventListener("click", () => {
    walletOverlay.classList.remove("active")
  })
}

const updateDOM = () => {
    tokens.forEach(token => {
        const priceEl = document.getElementById("price-" + token.symbol)
        const changeEl = document.getElementById("change-" + token.symbol)

        priceEl.textContent = "$" + token.price.toFixed(2)
        changeEl.textContent = token.change.toFixed(2) + "%"

        if(token.change > 0){
            changeEl.classList.add("positive")
            changeEl.classList.remove("negative")
        } else {
            changeEl.classList.add("negative")
            changeEl.classList.remove("positive")
        }
    })
}

const walletChoices = document.querySelectorAll(".wallet-choice")
const walletTitle = document.querySelector(".title")

const fakeAddress = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789"
  let address = ""
  for(let i = 0; i < 44; i++){
    address += chars[Math.floor(Math.random() * chars.length)]
  }
  return address
}

walletChoices.forEach(choice => {
  choice.addEventListener("click", () => {

    walletTitle.textContent = "Connecting..."

    setTimeout(() => {
      walletTitle.textContent = "Connected ✓"
      const address = fakeAddress()

      setTimeout(() => {
        walletOverlay.classList.remove("active")
        walletButton.textContent = address.slice(0,4) + "..." + address.slice(-4)
        walletTitle.textContent = "Connect Wallet"
      }, 1000)

    }, 1500)

  })
})

const launchBtn = document.querySelector(".cta")

launchBtn.addEventListener("click", () => {
  alert("🚀 Coming Soon! Still building this — stay tuned.")
})

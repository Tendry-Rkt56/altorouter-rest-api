import { sendData } from "../data.js"
import { checkInput } from "../functions.js"

const form = document.getElementById('form')
const name = document.getElementById('name')
const price = document.getElementById('price')
const port = window.location.port

form.addEventListener('submit', async (e) => {
     e.preventDefault()
     if (checkInput(name) && checkInput(price)) {
          const data = {
               name: name.value,
               price: price.value,
          }
          const response = await sendData(`http://localhost:${port}/api/articles/create`, data)
          if (response) {
               window.location.href = "/articles"
          }
     }
})
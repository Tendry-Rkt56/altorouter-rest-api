import { sendData } from "../data.js"
import { checkInput } from "../functions.js"

const port = window.location.port
const query = new URLSearchParams(window.location.search)
const id = query.get('id')
const loader = document.querySelector('.loader')
const form = document.getElementById('form')
const nom = document.getElementById('name')
const price = document.getElementById('price')

form.addEventListener("submit", async (e) => {
     e.preventDefault()
     if (checkInput(nom.value) && checkInput(price.value)) {
          const data = {
               id: id,
               name: nom.value,
               price: price.value,
          }
          const response = await sendData(`http://localhost:${port}/api/articles/update`, data)
          if (response) {
               localStorage.setItem("message", JSON.stringify({
                    message: 'Article N°'+id+" mis à jour",
                    type: "success",
               }))
               window.location.href = "/"
          }
     }
})

async function getData(route, loader)
{
     try {
          loader.style.display = 'block'
          await new Promise(resolve => setTimeout(resolve, 500))
          const data = await fetch(route)
          if (data.ok) {
               const result = await data.json()
               return result.article;
          }
          else {
               throw new Error('Erreur lors de la recupération des données')
          }
     }
     catch(error) {
          return error.message
     }
     finally {
          loader.style.display = "none"
     }
}

function hideForm()
{
     form.style.display = "none"
}

function showForm()
{
     form.style.display = "block"
}

async function dataList () 
{
     const data = await getData(`http://localhost:${port}/api/articles/find?id=${id}`, loader)
     return data
}

(async function populateForm()
{
     hideForm()
     const data = await dataList()
     showForm()
     document.title = data.name
     document.querySelector('.title').textContent = data.name
     nom.value = data.name
     price.value = data.price
})()

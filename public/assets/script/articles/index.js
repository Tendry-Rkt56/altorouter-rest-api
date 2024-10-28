import { deleteData, recupData } from "../data.js"
import { createCell, flashMessage } from "../functions.js"

const tables = document.querySelector('.tables')
const loader = document.querySelector('.loader')
const flash = document.querySelector('.flashMessage')
const search = document.getElementById('search')
const port = window.location.port


function createTd(valeur, options = {})
{
     const node = document.createElement('td')
     node.innerHTML = valeur
     if (options.hasOwnProperty('class')) {
          node.classList.add(options.class)
     }
     return node
}

async function dataList()
{
     const data = await recupData(`http://localhost:${port}/api/articles`, loader)
     return data
}

search.addEventListener('input', async () => {
     
     const data = await dataList()

     if (search.value !== "") {
          const value = search.value
          const newData = data.filter(element => element.name.toLowerCase().includes(value.toLowerCase()))
          populateTable(newData, tables)
     }
     else {
          populateTable(data, tables)
     }
})

// Fonction pour peupler le tableau avec les données
function populateTable(data, container) 
{
     container.innerHTML = ''

     const thead = document.createElement('thead')
     const headerRow = document.createElement('tr')
     headerRow.appendChild(createCell('#', { header: true }))
     headerRow.appendChild(createCell('Nom', { header: true }))
     headerRow.appendChild(createCell('Prix', { header: true }))
     headerRow.appendChild(createCell('Actions', { header: true }))
     thead.appendChild(headerRow)

     const tbody = document.createElement('tbody')
     data.forEach(element => {
          const tr = document.createElement('tr')
          const price = element.price.toLocaleString('fr-FR', {
               minimumFractionDigits: 2,
               maximumFractionDigits: 2,
          })
          tr.setAttribute('data', element.id)

          tr.appendChild(createCell(element.id))
          tr.appendChild(createCell(element.name))
          tr.appendChild(createCell(price + ' Ar', {class: 'fw-bolder'}))

          const actionsCell = createCell('', { 'class': 'd-flex gap-1' })
          const edit = document.createElement('a')
          edit.setAttribute('href', '#')
          edit.setAttribute('class', 'btn btn-sm btn-primary')
          edit.textContent = "Éditer"
          
          const suppr = document.createElement('button')
          suppr.setAttribute('class', 'btn btn-sm btn-danger suppr')
          suppr.textContent = "Supprimer"

          actionsCell.appendChild(edit)
          actionsCell.appendChild(suppr)
          tr.appendChild(actionsCell)

          tbody.appendChild(tr)
     })

     container.appendChild(thead)
     container.appendChild(tbody)
}

async function deleteElement()
{
     const btnSuppr = document.querySelectorAll('.suppr')
     btnSuppr.forEach((element, index) => {
          element.addEventListener('click', async (e) => {
               const tr = e.target.closest('tr')
               const dataId = parseInt(tr.getAttribute('data'))
               const response = await deleteData(`http://localhost:${port}/api/articles/delete`, dataId)
               tr.remove()
               if (response) flashMessage("Article supprimé", 'danger', flash)
               else flashMessage(response, 'danger', flash)
          })
     })
}

(async function append() {
     const data = await dataList()
     populateTable(data, tables)
     await deleteElement()
})()


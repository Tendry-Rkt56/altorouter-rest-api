import { recupData } from "../data.js"
import { createCell } from "../functions.js"

const tables = document.querySelector('.tables')
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

          tr.appendChild(createCell(element.id))
          tr.appendChild(createCell(element.name))
          tr.appendChild(createCell(element.price))

          const actionsCell = createCell('', { 'class': 'd-flex gap-1' })
          const edit = document.createElement('a')
          edit.setAttribute('href', '#')
          edit.setAttribute('class', 'btn btn-sm btn-primary')
          edit.textContent = "Éditer"
          
          const suppr = document.createElement('button')
          suppr.setAttribute('class', 'btn btn-sm btn-danger')
          suppr.textContent = "Supprimer"

          actionsCell.appendChild(edit)
          actionsCell.appendChild(suppr)
          tr.appendChild(actionsCell)

          tbody.appendChild(tr)
     })

     container.appendChild(thead)
     container.appendChild(tbody)
}

(async function append() {
     const data = await recupData(`http://localhost:${port}/api/articles`)
     populateTable(data, tables)
})()


// Fonction pour créer un élément de cellule de table <td> ou <th>
export function createCell(content, options = {}) 
{
     const cell = options.header ? document.createElement('th') : document.createElement('td')
     cell.textContent = content
     for (const key in options) {
          if (key !== 'header') cell.setAttribute(key, options[key])
     }
     return cell
}

export function flashMessage(valeur, type, container)
{
     const div = document.createElement('div')
     div.textContent = valeur
     div.setAttribute('class', `alert alert-${type} container d-flex align-items-center justify-content-center`)
     setTimeout(() => {
          container.classList.remove('active')
          div.remove()
     }, 4000)
     container.classList.add('active')
     container.appendChild(div)

}
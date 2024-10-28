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
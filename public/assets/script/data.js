export async function recupData(route, loader)
{
     try {
          loader.style.display = 'block'
          await new Promise(resolve => setTimeout(resolve, 500))
          const data = await fetch(route)
          if (data.ok) {
               const result = await data.json()
               return result;
          }
          else {
               throw new Error('Erreur lors de la recupération des données')
          }
     }
     catch(error) {
          console.log(error.message)
     }
     finally {
          loader.style.display = "none"
     }

} 


export async function sendData(route, data)
{
     try {
          const response = await fetch(route, {
               method: "POST",
               headers: {
                    "Content-Type" : 'application/json',
               },
               body: JSON.stringify(data)
          })
          if (response.ok) {
               const result = await response.json()
               return result.response
          }
          else {
               throw new Error('Erreur')
          }
     }
     catch(error) {
          return error.message
     }
}

export async function deleteData(route, id)
{
     try {
          const response = await fetch(route, {
               method: "POST",
               headers: {
                    "Content-Type" : 'application/json',
               },
               body: JSON.stringify({id: id})
          })
          if (response.ok) {
               const result = await response.json()
               return result.response
          }
          else {
               throw new Error('Erreur')
          }
     }
     catch(error) {
          return error.message
     }
}

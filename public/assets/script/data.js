export async function recupData(route)
{
     try {
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

} 
async function leerDatos() {
  let text = document.getElementById("textoBuscar").value
  let num = document.getElementById("cantidad").value
  let tipo = document.getElementById("tipo").value
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${text}&cnt=${num}&units=${tipo}&lang=es&appid=8ea115a8875190c8af50ed4a8da786b9`
  try{
    let listG = await axios.get(url)
    listG = listG.data
    return [...listG.list]
  }catch(err){ 
    return false
  }
  
}

export default leerDatos

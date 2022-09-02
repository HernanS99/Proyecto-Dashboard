let responsee = []

async function leerDatosCurrent() {
    let text = document.getElementById("textoBuscar").value
    let num = document.getElementById("cantidad").value
    let tipo = document.getElementById("tipo").value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&cnt=${num}&units=${tipo}&lang=es&appid=8ea115a8875190c8af50ed4a8da786b9`
    try {
        responsee = await axios.get(url)
        responsee = responsee.data
        return responsee
    } catch (err) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Debe ingresar una direccion valida',
            showConfirmButton: false,
            timer: 1500
          })
          return false
    }
}

export default leerDatosCurrent
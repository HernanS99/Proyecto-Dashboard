document.querySelector("#buscar").addEventListener("click", leerDatos)
let responsee = []

async function leerDatos() {
    let text = document.getElementById("textoBuscar").value;
    let num = document.getElementById("cantidad").value;
    let tipo = document.getElementById("tipo").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&cnt=${num}&units=${tipo}&lang=es&appid=8ea115a8875190c8af50ed4a8da786b9`
  
    let config = {}

    responsee = await axios.get(url, config)
    responsee = responsee.data
    print()
  }


  function print () {
    console.log(responsee.name)
    let icon = `http://openweathermap.org/img/w/${responsee.weather[0].icon}.png`
    document.getElementById("humedad").innerHTML = responsee.main.humidity;
    document.getElementById("wind").innerHTML = responsee.wind.speed;
    document.getElementById("mainTempHot").innerHTML = responsee.main.temp_max;
    document.getElementById("mainTempLow").innerHTML = responsee.main.temp_min;
    document.getElementById("mainTemperature").innerHTML = `${responsee.main.feels_like}°`;
    document.getElementById("tempDescription").innerHTML = responsee.weather[0].description;
    document.getElementById("cityName").innerHTML = responsee.name;
    document.getElementById("main-icon").setAttribute("src",icon);
  /*   document.getElementById("wicon").setAttribute("src",icon) */
  }
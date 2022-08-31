import leerDatos from './getFromApi.js'
import leerDatosCurrent from './getCurrenWheater.js'
let myChart;
let myChart1;
let myChart2;
let array = []
let array2 = []
let labelss = []

document.querySelector("#buscar").addEventListener("click", print)

document.getElementById("wrapper").style.display = "none"

function print (){
  graphForecast()
  graphWinds()
  graphHumedity()
  tarjeta()
}

async function graphForecast() {
  
  let resul = await leerDatos()
  let response = [...resul]
  document.getElementById("wrapper").style.display = ""
  array = response.map(Element => Element.main.temp_max)
  array2 = response.map(Element => Element.main.temp_min)
  labelss = response.map(Element => Element.dt_txt) 
  const labels = [...labelss];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperatura Maxima',
        data: [...array],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        borderCapStyle: 'butt',
        borderDash: [5, 5],
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value + '°'
            }
          }
        },
        x: {
          ticks: {
            maxRotation: 90,
            minRotation: 90
          }
        },
      }
    }
  };
  if(myChart != undefined){
    myChart.destroy();
  }
  myChart = new Chart(document.getElementById('myChart'), config);
  
}

async function graphWinds() {
  let resul = await leerDatos()
  let response = [...resul]

  let wind = response.map(Element => Element.wind.speed)
  labelss = response.map(Element => Element.dt_txt)
  const labels = [...labelss];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Velocidad del viento',
        data: [...wind],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        borderCapStyle: 'butt',
        borderDash: [5, 5],
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value + '°'
            }
          }
        },
        x: {
          ticks: {
            maxRotation: 90,
            minRotation: 90
          }
        },
      }
    }
  };
  if(myChart1 != undefined){
    myChart.destroy();
  }
  myChart1 = new Chart(document.getElementById('myChart1'), config);
}

async function graphHumedity() {
  let resul = await leerDatos()
  let response = [...resul]
  let humedity = response.map(Element => Element.main.humidity)
  labelss = response.map(Element => Element.dt_txt)
  const labels = [...labelss];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Humedad',
        data: [...humedity],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        borderCapStyle: 'butt',
        borderDash: [5, 5],
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value + '°'
            }
          }
        },
        x: {
          ticks: {
            maxRotation: 90,
            minRotation: 90
          }
        },
      }
    }
  };
  if(myChart2 != undefined){
    myChart.destroy();
  }
  myChart2 = new Chart(document.getElementById('myChart2'), config);
  
  
}

async function tarjeta() {
  let responsee = await leerDatosCurrent()
  console.log(responsee)
  let icon = `http://openweathermap.org/img/w/${responsee.weather[0].icon}.png`
  document.getElementById("humedad").innerHTML = responsee.main.humidity;
  document.getElementById("wind").innerHTML = responsee.wind.speed;
  document.getElementById("mainTempHot").innerHTML = responsee.main.temp_max;
  document.getElementById("mainTempLow").innerHTML = responsee.main.temp_min;
  document.getElementById("mainTemperature").innerHTML = `${responsee.main.feels_like}°`;
  document.getElementById("tempDescription").innerHTML = responsee.weather[0].description;
  document.getElementById("cityName").innerHTML = responsee.name;
  document.getElementById("cityCode").innerHTML = responsee.sys.id;
  document.getElementById("localDate").innerHTML = new Date(responsee.dt * 1000 - (responsee.timezone * 1000));
  document.getElementById("main-icon").setAttribute("src", icon);

}
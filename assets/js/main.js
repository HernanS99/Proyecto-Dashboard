import leerDatos from './getFromApi.js'
import leerDatosCurrent from './getCurrenWheater.js'
let graficoTemp
let graficoViento
let graficoHumedad
let temp = []
let date = []

document.querySelector("#buscar").addEventListener("click", print)

document.getElementById("wrapper").style.display = "none"

function print() {
  graphForecast()
  graphWinds()
  graphHumedity()
  tarjeta()
}

async function graphForecast() {
  let resul = await leerDatos()
  if(resul){
    let response = [...resul]
    document.getElementById("wrapper").style.display = ""
    temp = response.map(element => element.main.temp_max)
    date = response.map(element => element.dt_txt)
    const labels = [...date]
  
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Temperatura Maxima',
          data: [...temp],
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
        }
      ]
    }
  
    const config = {
      type: 'line',
      data: data,
      options: {
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              fontColor: "white",
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
    }
    if (graficoTemp != undefined) {
      graficoTemp.destroy()
    }
    graficoTemp = new Chart(document.getElementById('myChart'), config)
  
  }
  
}

async function graphWinds() {
  let resul = await leerDatos()
  if(resul){
    let response = [...resul]
    let wind = response.map(element => element.wind.speed)
    date = response.map(element => element.dt_txt)
    const labels = [...date]
  
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Velocidad del viento',
          data: [...wind],
          backgroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(255, 255, 255)',
          borderCapStyle: 'butt',
          borderDash: [5, 5],
          animations: {
            tension: {
              duration: 3000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          },
        }
      ]
    }
  
    const config = {
      type: 'line',
      data: data,
      options: {
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + 'm/s'
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
    }
    if (graficoViento != undefined) {
      graficoViento.destroy()
    }
    graficoViento = new Chart(document.getElementById('myChart1'), config)
  }
}

async function graphHumedity() {
  let resul = await leerDatos()
  if(resul){
    let response = [...resul]
    let humedity = response.map(element => element.main.humidity)
    date = response.map(element => element.dt_txt)
    const labels = [...date]
  
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Humedad',
          data: [...humedity],
          backgroundColor: 'rgb(0, 0, 255)',
          borderColor: 'rgb(0, 0, 255)',
          pointBackgroundColor: '#fff',
          borderJoinStyle: 'miter',
          pointHoverBorderColor: '#fff',
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
    }
  
    const config = {
      type: 'line',
      data: data,
      options: {
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function (value) {
                return value + '%'
              }
            }
          },
          x: {
            ticks: {
              maxRotation: 90,
              minRotation: 90
            }
          },
        },
      }
    }
    if (graficoHumedad != undefined) {
      graficoHumedad.destroy()
    }
    graficoHumedad = new Chart(document.getElementById('myChart2'), config)
  }
}

async function tarjeta() {
  let responsee = await leerDatosCurrent()
  if(responsee){
    let icon = `http://openweathermap.org/img/w/${responsee.weather[0].icon}.png`
    document.getElementById("humedad").innerHTML = responsee.main.humidity
    document.getElementById("wind").innerHTML = responsee.wind.speed
    document.getElementById("mainTempHot").innerHTML = responsee.main.temp_max
    document.getElementById("mainTempLow").innerHTML = responsee.main.temp_min
    document.getElementById("mainTemperature").innerHTML = `${responsee.main.feels_like}°`
    document.getElementById("tempDescription").innerHTML = responsee.weather[0].description
    document.getElementById("cityName").innerHTML = responsee.name
    document.getElementById("cityCode").innerHTML = responsee.sys.id
    document.getElementById("localDate").innerHTML = new Date(responsee.dt * 1000 - (responsee.timezone * 1000))
    document.getElementById("main-icon").setAttribute("src", icon)
  }
}


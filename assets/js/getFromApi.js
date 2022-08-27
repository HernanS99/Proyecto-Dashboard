document.querySelector("#buscar").addEventListener("click", leerDatos)
let response = []
let myChart;
let array = []
let labelss = []
let array2 = []

async function leerDatos() {
  let text = document.getElementById("textoBuscar").value;

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${text}&units=metric&lang=es&appid=8ea115a8875190c8af50ed4a8da786b9`

  let config = {

  }
  response = await axios.get(url, config)
  response = response.data
  response = [...response.list]
  
  generarGrafico()
  
}

function generarGrafico() {

  array = response.map(Element => Element.main.temp_max)
  array2 = response.map(Element => Element.main.temp_min)



  labelss = response.map(Element => Element.dt_txt)
  console.log(array)
  console.log(array2)

  

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
      },
      {
        label: 'Temperatura Minima',
        data: [...array2],
        backgroundColor: 'rgb(30,144,255)',
        borderColor: 'rgb(30,144,255)',
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



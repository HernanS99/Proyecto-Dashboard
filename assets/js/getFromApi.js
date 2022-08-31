document.querySelector("#buscar").addEventListener("click", leerDatos)
let response = []
let response1 = []
let myChart;
let array = []
let labelss = []
let array2 = []
document.getElementById("wrapper").style.display = "none"

async function leerDatos() {
  let text = document.getElementById("textoBuscar").value;
  let num = document.getElementById("cantidad").value;
  let tipo = document.getElementById("tipo").value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${text}&cnt=${num}&units=${tipo}&lang=es&appid=8ea115a8875190c8af50ed4a8da786b9`

  try{
    response = await axios.get(url)
    response = response.data
    response1 = [...response.list]
    generarGrafico()
  }catch(err){
    
  }
}

function generarGrafico() {
  console.log(response)
  document.getElementById("wrapper").style.display = ""
  array = response1.map(Element => Element.main.temp_max)
  array2 = response1.map(Element => Element.main.temp_min)
  labelss = response1.map(Element => Element.dt_txt)
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



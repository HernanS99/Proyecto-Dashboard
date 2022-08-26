document.querySelector("#buscar").addEventListener("click",leerDatos)
let response = []
let myChart;

async function leerDatos(){
    let text = document.getElementById("textoBuscar").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=f2a8d961bd047d95b5b3fb44e5f037ce`
    let config = {

    }
    response = await axios.get (url,config)
    response = response.data
    
    console.log(response)
   generarGrafico()
}

function generarGrafico(){

    
    if(myChart)
    {
        myChart.destroy;
    }

    const labels = [
        'Temperatura Maxima',
        'Temperatura Minima'
      ];

      const data = {
        labels: labels,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [response.main.temp_min,response.main.temp_max]
        }]
      };
    
      const config = {
        type: 'bar',
        data: data,
        options: {}
      };
    
      myChart = new Chart(document.getElementById('myChart'),config);
    
}





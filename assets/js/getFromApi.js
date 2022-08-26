document.querySelector("#buscar").addEventListener("click",leerDatos)
let response = []
let myChart;
let array = []
let labelss = []
let array2 = []

async function leerDatos(){
    let text = document.getElementById("textoBuscar").value;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${text}&units=metric&lang=es&appid=78cdde4230a71d871746cb112305633d`
    let config = {

    }
    response = await axios.get (url,config)
    response = response.data
   response = [...response.list]
    
   generarGrafico()
}

function generarGrafico(){

  array = response.map(Element => Element.main.temp_max)
  array2 = response.map(Element => Element.main.temp_min)
  labelss = response.map(Element => Element.dt_txt)
 
    console.log(array)
    if(myChart)
    {
        myChart.destroy;
    }

    const labels = [...labelss];

      const data = {
        labels: labels,
        datasets: [{
          label: 'Temperatura Maxima',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          
          data: [...array,...array2]
        }]
      };
    
      const config = {
        type: 'line',
        data: data,
        options: {}
      };
    
      myChart = new Chart(document.getElementById('myChart'),config);
    
}





fetch("/data.json")
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    })
    .then(function(value) {
    //recup des 3 valeurs qui nous interesse
    console.log(value);
    //let name = value[i].name; 
    const labels = [];
    dataSet = [];
    for (var i=0; i<value.length; i++){
        labels.push(value[i].sampleNr);
        dataSet.push(value[i].temperature);
    }
    
    const data = {
        labels: labels,
        datasets: [{
            label: 'Crop 1 data temperature over time',
            backgroundColor: 'rgb(240, 248, 255)',
            borderColor: 'rgb(34, 139, 34)',
            data: dataSet,    
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {}
    };
    
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    })
    .catch(function(err) {
    // Une erreur est survenue
    });
    
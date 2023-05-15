window.addEventListener('DOMContentLoaded', () => {
  const serverIp = window.location.hostname;
  const baseUri = `http://${serverIp}:1880/brewery`;
  const ctx = document.getElementById('myChart');
  const currentTemp = document.getElementById('currentTemp');
  const currentHum = document.getElementById('currentHum');
  const startTime = document.getElementById('startTime');
  const rstBtn = document.getElementById('rstBtn');
  const bias = document.getElementById('bias');
  const biasBtn = document.getElementById('biasBtn');
  const biasInp = document.getElementById('biasInp');

  const setBias = value => {
    let result = Math.round(value * 100000.0)/1000.0;
    bias.innerText = result;
    biasInp.value = result;
  };

  const setTime = value => {
    startTime.innerText = new Date(value);
  };

  const resetInfo = (bias, startTime) => {
    setBias(bias);
    setTime(startTime);
  };

  const resetChart = () => {
    for (let i = 0; i < chartData.datasets.length; i++)
    {
      chartData.datasets[i].data = [];
    }
    chart.update();
    currentTemp.innerText = '';
    currentHum.innerText = '';
  };

  const addChartData = (data, index) => {
    for (let element of data) {
      chartData.datasets[index].data.push({ x: element.timestamp, y: element.value });
    }
    chart.update();
  };

  biasBtn.addEventListener('click', e => {
    fetch(`${baseUri}/bias`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bias: (biasInp.value / 100.0) }),
    })
    .then((resp) => resp.json())
    .then((data) => {
      setBias(data.bias);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });

  rstBtn.addEventListener('click', e => {
    fetch(`${baseUri}/reset`, {
      method: 'DELETE'
    })
    .then((resp) => resp.json())
    .then((data) => {
      resetInfo(data.bias, data.startTime);
      resetChart();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });

  const chartData = {
    datasets: [{
      label: 'Temperature',
      data: [],
      backgroundColor: 'rgb(255, 99, 132)',
      yAxisID: 'y',
    },
    {
      label: 'Humidity',
      data: [],
      backgroundColor: 'rgb(75, 192, 192)',
      yAxisID: 'y2',
    }]
  };

  const chart = new Chart(ctx, {
    type: 'scatter',
    data: chartData,
    options: {
      scales: {
        y: {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          position: 'left',
          ticks: {
            color: 'rgb(255, 99, 132)'
          }
        },
        y2: {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          position: 'right',
          ticks: {
            color: 'rgb(75, 192, 192)'
          },
          grid: {
            drawOnChartArea: false // only want the grid lines for one axis to show up
          }
        }
      }
    }
  });

  const clientId = `mqttjs_${Math.random().toString(16).substring(2, 10)}`;
  const host = `ws://${serverIp}:8081`;

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    },
    rejectUnauthorized: false
  };

  console.log('connecting mqtt client');
  const client = mqtt.connect(host, options);

  client.on('error', function(err) {
    console.log(err);
    client.end();
  });

  client.on('connect', function() {
    console.log('client connected:' + clientId);
    client.subscribe('filtTemp', { qos: 0 });
    client.subscribe('filtHum', { qos: 0 });
  });

  client.on('message', function(topic, message, packet) {
    const data = JSON.parse(message);
    let dataset = 0;
    let output = currentTemp;
    switch (topic) {
      case 'filtTemp':
        dataset = 0;
        output = currentTemp;
        break;
      case 'filtHum':
        dataset = 1;
        output = currentHum;
        break;
    }
    output.innerText = data.value.toFixed(1);
    chartData.datasets[dataset].data.push({ x: new Date(data.timestamp), y: data.value });
    chart.update();
  });

  client.on('close', function() {
    console.log(clientId + ' disconnected');
  });

  fetch(`${baseUri}/info`)
  .then(resp => resp.json())
  .then(data => {
    resetInfo(data.bias, data.startTime);
  });

  fetch(`${baseUri}/temp/log`)
  .then(resp => resp.json())
  .then(data => {
    addChartData(data, 0);
  });

  fetch(`${baseUri}/hum/log`)
  .then(resp => resp.json())
  .then(data => {
    addChartData(data, 1);
  });
});

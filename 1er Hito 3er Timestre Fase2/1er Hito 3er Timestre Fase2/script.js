document.addEventListener('DOMContentLoaded', function() {
    const weatherInfoDiv = document.getElementById('weather-info');

    // Realizar la petición Fetch al API
    fetch('https://www.el-tiempo.net/api/json/v2/provincias')
        .then(response => response.json())
        .then(data => {
            if (data && data.provincias) {
                // Manejar los datos obtenidos
                const provinces = data.provincias;
                provinces.forEach(province => {
                    console.log(province); // Imprimir datos de cada provincia en la consola
                    const provinceName = province.NOMBRE_PROVINCIA;
                    const provinceWeather = province.info;

                    const weatherCard = document.createElement('div');
                    weatherCard.classList.add('weather-card');

                    const title = document.createElement('h2');
                    title.textContent = `Tiempo en ${provinceName}`;
                    weatherCard.appendChild(title);

                    if (provinceWeather && provinceWeather.prediccion) {
                        const weatherPredictions = provinceWeather.prediccion;
                        const weatherDetails = document.createElement('div');
                        weatherDetails.classList.add('weather-details');

                        // Iterar sobre las predicciones meteorológicas
                        for (const [date, prediction] of Object.entries(weatherPredictions)) {
                            const detail = document.createElement('div');
                            detail.innerHTML = `<strong>${date}</strong>: ${prediction}`;
                            weatherDetails.appendChild(detail);
                        }

                        weatherCard.appendChild(weatherDetails);
                    } else {
                        const errorMessage = document.createElement('p');
                        errorMessage.textContent = 'No hay datos disponibles para este lugar.';
                        weatherCard.appendChild(errorMessage);
                    }

                    weatherInfoDiv.appendChild(weatherCard);
                });
            } else {
                throw new Error('La propiedad "provincias" no está definida en los datos recibidos.');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos del tiempo:', error);
            weatherInfoDiv.innerHTML = '<p>Ocurrió un error al obtener los datos del tiempo.</p>';
        });
});

// script.js
document.getElementById('Botao_Apertado').addEventListener('click', function () {
    const latitude = document.getElementById('latitude').value.trim();
    const longetude = document.getElementById('longetude').value.trim();
    if (latitude === '' || longetude ==='') {
      document.getElementById('error').textContent = 'Por favor, insira o nome de uma cidade.';
      return;
    }
  
    document.getElementById('error').textContent = ''; // Limpar mensagem de erro anterior
    fetchWeather(latitude, longetude);
  });
  
  async function fetchWeather(latitude, longetude) {
    const apiKey = '964ada4fd1a2df44209b5a5f37a4a287'; // Substitua com sua chave da API do OpenWeatherMap
   
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longetude}&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Local não encontrado');
      }
  
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      document.getElementById('error').textContent = error.message;
      document.getElementById('result').style.display = 'none'; // Oculta o resultado em caso de erro
    }
  }
  
  function displayWeather(data) {
    document.getElementById('Cidade_e_Pais').innerText = `${data.name}, ${data.sys.country}`;

    let tempMAX = corretor(data.main.temp_max);
    document.getElementById('Temperatura_Max').innerText = `Temp. Max = ${tempMAX} °C`;

    let temp = corretor(data.main.temp);
    document.getElementById('Temperatura_Normal').innerText = `Temp. = ${temp} °C`;

    let tempMIN = corretor(data.main.temp_min);
    document.getElementById('Temperatura_Min').innerText = `Temp. Min = ${tempMIN} °C`;

    document.getElementById('Humidade').innerText = `Humidade = ${data.main.humidity.toFixed(2)}%`;

    document.getElementById('Velocidade_do_Vento').innerText = `Velocidade do Vento = ${data.wind.speed.toFixed(2)}m/s`; 
   
    document.getElementById('result').style.display = 'block'; // Exibe o resultado
  }
  
  function corretor(K){
    const C = K - 273.15 ;
    return C.toFixed(2);
  }
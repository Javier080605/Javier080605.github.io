document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById('Form')
const loc = document.getElementById('Loc')
const ubi = document.getElementById('obtenerUbicacion')

ubi.style.display = "none";

loc.addEventListener("click", function () {
    const location = form.value.trim();
    if (location !== "") {
        ubi.style.display = "block";
        obtenerUbicacion(location);
        
    }
})

function obtenerUbicacion(location) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=9e7d2cc434044c42afd12250230310&q=${location}&aqi=no&lang=es`)
    .then(response => response.json())
    .then(data => {
        mostrarUbicacion(data)
        mostrarImagenClima(data.current.condition.icon);
    })
    .catch(error => {
        console.error("Error al buscar ubicación:", error)
        ubi.innerHTML = "<p>No se encontró la ubicación.<p>"
    })
}

function mostrarUbicacion(data) {
  console.log(data);
      const ubicacionDiv = document.createElement("div");
      ubicacionDiv.classList.add("ubicacion");
  
      const ubicacionName = document.createElement("h2");
      ubicacionName.textContent = data.location.name;
  
      const ubicacionDatos = document.createElement("ul");
  
      const temperatura = document.createElement("li");
      temperatura.textContent = `Temperatura: ${data.current.temp_c}°C`;
  
      const condicion = document.createElement("li");
      condicion.textContent = `Condición: ${traducirCondicion(data.current.condition.text)}`;
  
      const humedad = document.createElement("li");
      humedad.textContent = `Humedad: ${data.current.humidity}%`;
  
      ubicacionDatos.appendChild(temperatura);
      ubicacionDatos.appendChild(condicion);
      ubicacionDatos.appendChild(humedad);
  
      ubicacionDiv.appendChild(ubicacionName);
      ubicacionDiv.appendChild(ubicacionDatos);
  
      ubi.innerHTML = "";
      ubi.appendChild(ubicacionDiv);
}

function mostrarImagenClima(icon) {
    const imagen = document.createElement("img");
    imagen.classList.add("imgClima");
    imagen.src = icon;

    ubi.appendChild(imagen);
}

function traducirCondicion(descripcion) {
    const traducciones = {
        'Cloudy' : 'Nublado',
        'Partly Cloudy' : 'Parcialmente Nublado',
        'Sunny'  : 'Soleado',
        'Overcast' : 'Cubierto',
        'Mist' : 'Neblina',
};
return traducciones[descripcion] || descripcion;
}
});
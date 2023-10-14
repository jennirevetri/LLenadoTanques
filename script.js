const tanque1Capacidad = 5000;
const tanque2Capacidad = 4000;
let tanque1Contenido = 5000;
let tanque2Contenido = 0;
let interval1;
let interval2;
animacionActiva = false;
let temporizador;
let ejecucion = false;
let segundosTotales = 0;

    const actualizarTemporizador = () => {
            const horas = Math.floor(segundosTotales / 3600).toString().padStart(2, '0');
            const minutos = Math.floor((segundosTotales % 3600) / 60).toString().padStart(2, '0');
            const segundos = (segundosTotales % 60).toString().padStart(2, '0');
            document.getElementById('tiempo').textContent = `${horas}:${minutos}:${segundos}`;
        };

    const actualizarTanque1 = () => {
      const porcentaje1 = (tanque1Contenido / tanque1Capacidad) * 100;
      const litros1 = tanque1Contenido;
      document.getElementById('tanque1').textContent = `Tanque 1: ${porcentaje1.toFixed(2)}% (${litros1.toFixed(2)} litros)`;

      const alturaAgua1 = (tanque1Contenido / tanque1Capacidad) * 100;
      document.getElementById('agua1').style.height = alturaAgua1 + "%";
};

    const actualizarTanque2 = () => {
      const porcentaje2 = (tanque2Contenido / tanque2Capacidad) * 100;
      const litros2 = tanque2Contenido;
      document.getElementById('tanque2').textContent = `Tanque 2: ${porcentaje2.toFixed(2)}% (${litros2.toFixed(2)} litros)`;

      const alturaAgua2 = (tanque2Contenido / tanque2Capacidad) * 100;
      document.getElementById('agua2').style.height = alturaAgua2 + "%";
};


    const llenarTanque1 = () => {
      const llave1 = parseInt(document.getElementById('llave1').value);
      const velocidadLlenado1 = Math.floor(Math.random() * llave1);
      tanque1Contenido += velocidadLlenado1;
      


      if (tanque1Contenido >= tanque1Capacidad * 0.75) {
        clearInterval(interval1);
        interval2 = setInterval(llenarTanque2, 1000);
        document.getElementById('llave1llenado').style.opacity = 0;
        document.getElementById('llave1vaciado').style.opacity = 1;
        document.getElementById('llave2llenado').style.opacity = 1;
        document.getElementById('llave2vaciado').style.opacity = 0;
        document.getElementById('llave3llenado').style.opacity = 0;
        document.getElementById('llave3vaciado').style.opacity = 1;
      }
      if (tanque1Contenido >= tanque1Capacidad) {
        tanque1Contenido = tanque1Capacidad;
        

        
      }

      actualizarTanque1();
      
    };

    const llenarTanque2 = () => {
      const llave2 = parseInt(document.getElementById('llave2').value);
      const velocidadLlenado2 = Math.floor(Math.random() * llave2);
      tanque2Contenido += velocidadLlenado2;
      tanque1Contenido -= velocidadLlenado2;
      

      if (tanque2Contenido >= tanque2Capacidad * 0.75) {
        clearInterval(interval2);
        interval2 = setInterval(vaciarTanque2, 1000);
        document.getElementById('llave1llenado').style.opacity = 0;
        document.getElementById('llave1vaciado').style.opacity = 1;
        document.getElementById('llave2llenado').style.opacity = 0;
        document.getElementById('llave2vaciado').style.opacity = 1;
        document.getElementById('llave3llenado').style.opacity = 1;
        document.getElementById('llave3vaciado').style.opacity = 0;
      }
      if (tanque1Contenido <= tanque1Capacidad * 0.5) {
        clearInterval(interval2);
        interval1 = setInterval(llenarTanque1, 1000);
        document.getElementById('llave1llenado').style.opacity = 1;
        document.getElementById('llave1vaciado').style.opacity = 0;
        document.getElementById('llave2llenado').style.opacity = 0;
        document.getElementById('llave2vaciado').style.opacity = 1;
        document.getElementById('llave3llenado').style.opacity = 0;
        document.getElementById('llave3vaciado').style.opacity = 1;
      }
      if (tanque2Contenido >= tanque2Capacidad) {
        tanque2Contenido = tanque2Capacidad;
        
      }

      actualizarTanque2();
      actualizarTanque1();
      
      
    };

    const vaciarTanque2 = () => {
      const llave3 = parseInt(document.getElementById('llave3').value);
      const velocidadVaciado2 = Math.floor(Math.random() * llave3);
      tanque2Contenido -= velocidadVaciado2;

      if (tanque2Contenido <= tanque2Capacidad * 0.5) {
        clearInterval(interval2);
        interval1 = setInterval(llenarTanque1, 1000);
        document.getElementById('llave2llenado').style.opacity = 0;
        document.getElementById('llave2vaciado').style.opacity = 1;
        document.getElementById('llave1llenado').style.opacity = 1;
        document.getElementById('llave1vaciado').style.opacity = 0;
        document.getElementById('llave3llenado').style.opacity = 0;
        document.getElementById('llave3vaciado').style.opacity = 1;
      }

      actualizarTanque2();
      
    };

    document.getElementById('iniciar').addEventListener('click', () => {
    
      const llave1 = parseInt(document.getElementById('llave1').value);
      const llave2 = parseInt(document.getElementById('llave2').value);
      const llave3 = parseInt(document.getElementById('llave3').value);
    
      
      if (llave1 >= 1 && llave1 <= 400 && llave2 >= 1 && llave2 <= 500 && llave3 >= 1 && llave3 <= 600) {
        
        interval1 = setInterval(llenarTanque1, 1000);
        animacionActiva = true;
        if (!ejecucion) {
          ejecucion = true;
          temporizador = setInterval(() => {
            segundosTotales++;
            actualizarTemporizador();
          }, 1000);
        }
      } else {
        
        alert('Por favor, ingrese valores validos para los campos de entrada.');
      }
    });

    document.getElementById('detener').addEventListener('click', () => {
      clearInterval(interval1);
      clearInterval(interval2);
      tanque1Contenido = 5000;
      tanque2Contenido = 0;
      actualizarTanque1();
      actualizarTanque2();
      document.getElementById('llave2llenado').style.opacity = 0;
      document.getElementById('llave2vaciado').style.opacity = 1;
      document.getElementById('llave1llenado').style.opacity = 0;
      document.getElementById('llave1vaciado').style.opacity = 1;
      document.getElementById('llave3llenado').style.opacity = 0;
      document.getElementById('llave3vaciado').style.opacity = 1;
      animacionActiva = false; 
      if (ejecucion) {
                    ejecucion = false;
                    clearInterval(temporizador);
                    segundosTotales = 0;
                    actualizarTemporizador();
                }
      

    });

    

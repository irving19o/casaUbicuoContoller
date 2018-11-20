Ejecutar npm install.

Despues de instalacion, modificar en index.js el puerto com en el que se conecta el arduinio, el monitor serial debe de estar cerrado para que se pueda utilizar por la aplicacion, 

    var port = new SerialPort('PUERTOCOM', {
        baudRate: 9600
    });

El arduinio debe de enviar un mensaje de inicio para detectar que está listo para recibir comandos 

/// linea de inicio para saber que se puede comenzar a enviar comandos 
    const parser = port.pipe(new Ready({ delimiter: 'Input 1 to Turn LED on and 2 to off' }));

modificar la funcion sendToArduinio con el parametro que corresponda para realizar la accion en el arduinio de cada uno de los focos 

        bathroom.on("value", function (snapshot) {
        console.log("bathroom: ", snapshot.val().value);
        if (snapshot.val().value == 1) {
            console.log("on");

            //valor que corresponde para encender el elemento bathroom
            sendToArduinio("1");

ejecutar npm start para que esté a la escucha de los cambios en la aplicacion web.

va a saltar un error con el archivo smartHouseAuth.json, ese archivo es la autenticación a la base de datos, te lo paso por otro medio.
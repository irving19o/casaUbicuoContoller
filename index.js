var admin = require("firebase-admin");
var SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline')
const Ready = require('@serialport/parser-ready')
var port = new SerialPort('/dev/cu.usbmodem1411', {
    baudRate: 9600
});

/// linea de inicio para saber que se puede comenzar a enviar comandos 
const parser = port.pipe(new Ready({ delimiter: 'Input 1 to Turn LED on and 2 to off' }));


const parserOut = port.pipe(new Readline({delimiter: '\n'}));
parser.on('ready', () => {
    
    parserOut.on('data', console.log);
    
    var serviceAccount = require("./smartHouseAuth.json");
    
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://smarthouse-c3c81.firebaseio.com"
    });    

    var db = admin.database();

    //instances of references on database
    var bathroom = db.ref("bathroom");
    var bedroom1 = db.ref("bedroom1");
    var bedroom2 = db.ref("bedroom2");
    var door = db.ref("door");
    var kitchen = db.ref("kitchen");
    var living = db.ref("living1");
    var parking = db.ref("parking");
    var storage = db.ref("storage");

    //put data to arduinio
    var sendToArduinio = option=>{
       
        setTimeout(() => {

            port.write(option, function (err) {
                if (err) {
                    return console.log('Error on write: ', err.message);
                }
                console.log('message written');
            });
            
        }, 1000);
    }

    // Attach an asynchronous callback to read the data 
    bathroom.on("value", function (snapshot) {
        console.log("bathroom: ", snapshot.val().value);
        if (snapshot.val().value == 1) {
            console.log("on");

            //valor que corresponde para encender el elemento bathroom
            sendToArduinio("1");


        }
        else {
            console.log("off");
            // valor que corresponde para apagar el elemento bathroom
            sendToArduinio("2");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    bedroom1.on("value", function (snapshot) {
        console.log("bedroom1: ", snapshot.val().value);
        
        if (snapshot.val().value == 1) {
            console.log("on");

            //valor que corresponde  para encender bedroom1
            sendToArduinio("1");


        }
        else {
            console.log("off");

            //valor que corresponde para encender bedroom1
            sendToArduinio("2");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    bedroom2.on("value", function (snapshot) {
        console.log("bedroom2: ", snapshot.val().value);

        if (snapshot.val().value == 1) {
            console.log("on");

            sendToArduinio("1");


        }
        else {
            console.log("off");

            sendToArduinio("2");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    kitchen.on("value", function (snapshot) {
        console.log("kitchen: ", snapshot.val().value);

        if (snapshot.val().value == 1) {
            console.log("on");

            sendToArduinio("1");


        }
        else {
            console.log("off");

            sendToArduinio("2");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    living.on("value", function (snapshot) {
        console.log("living: ", snapshot.val().value);

        if (snapshot.val().value == 1) {
            console.log("on");

            sendToArduinio("1");


        }
        else {
            console.log("off");

            sendToArduinio("2");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    parking.on("value", function (snapshot) {
        console.log("parking: ", snapshot.val().value);

        if (snapshot.val().value == 1) {
            console.log("on");

            sendToArduinio("1");


        }
        else {
            console.log("off");

            sendToArduinio("2");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    storage.on("value", function (snapshot) {
        console.log("storage: ", snapshot.val().value);

        if (snapshot.val().value == 1) {
            console.log("on");

            sendToArduinio("1");


        }
        else {
            console.log("off");

            sendToArduinio("2");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});
var admin = require("firebase-admin");
var SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline')
const Ready = require('@serialport/parser-ready')
var port = new SerialPort('/dev/cu.usbmodem1421', {
    baudRate: 9600
});

/// linea de inicio para saber que se puede comenzar a enviar comandos 
const parser = port.pipe(new Ready({ delimiter: 'Ready' }));


const parserOut = port.pipe(new Readline({delimiter: "\r\n"}));
parser.on('ready', () => {

    
    
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
    var window = db.ref("window");
    var color = db.ref("color");

    //put data to arduinio
    var sendToArduinio = option=>{
        console.log(option);

            port.write(option, function (err) {
                if (err) {
                    return console.log('Error on write: ', err.message);
                }
                console.log('message written');
            });  
       
    }
    //parse data to send window status 
    parserOut.on('data', (data) =>{
        
        switch (data.toString()) {
            //switch cases to interpreter window open
            case 'wopen':
                //console.log("desde wopen");
                window.set({value: true});
                break;
            case 'wclosed':
                window.set({value: false});
                //console.log("desde wclose");
            break   
        
            default:
                console.log(data);
                break;
        }
        //port.flush();

    });
    
    color.on("value", function (snapshot) {
        console.log("color: ", snapshot.val().value);
        //valor que corresponde para cambiar color de led el elemento bathroom
        sendToArduinio(snapshot.val().value+"\n");

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    // Attach an asynchronous callback to read the data 
    bathroom.on("value", function (snapshot) {
        console.log("bathroom: ", snapshot.val().value);
        if (snapshot.val().value == 1) {
            console.log("on");

            //valor que corresponde para encender el elemento bathroom
            sendToArduinio("a\n");


        }
        else {
            console.log("off");
            // valor que corresponde para apagar el elemento bathroom
            sendToArduinio("b\n");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    bedroom1.on("value", function (snapshot) {
        console.log("bedroom1: ", snapshot.val().value);
        
        if (snapshot.val().value == 1) {
            console.log("on");

            //valor que corresponde  para encender bedroom1
            sendToArduinio("c\n");


        }
        else {
            console.log("off");

            //valor que corresponde para encender bedroom1
            sendToArduinio("d\n");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    bedroom2.on("value", function (snapshot) {
        console.log("bedroom2: ", snapshot.val().value);

        if (snapshot.val().value == 1) {
            console.log("on");

            sendToArduinio("e\n");


        }
        else {
            console.log("off");

            sendToArduinio("f\n");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    kitchen.on("value", function (snapshot) {
        console.log("kitchen: ", snapshot.val().value);

        if (snapshot.val().value == 1) {
            console.log("on");

            sendToArduinio("g\n");


        }
        else {
            console.log("off");

            sendToArduinio("h\n");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    living.on("value", function (snapshot) {
        console.log("living: ", snapshot.val().value);

        if (snapshot.val().value == 1) {
            console.log("on");

            sendToArduinio("i\n");


        }
        else {
            console.log("off");

            sendToArduinio("j\n");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    parking.on("value", function (snapshot) {
        console.log("parking: ", snapshot.val().value);

        if (snapshot.val().value == 1) {
            console.log("on");

            sendToArduinio("k\n");


        }
        else {
            console.log("off");

            sendToArduinio("l\n");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    storage.on("value", function (snapshot) {
        console.log("storage: ", snapshot.val().value);

        if (snapshot.val().value == 1) {
            console.log("on");

            sendToArduinio("m\n");


        }
        else {
            console.log("off");

            sendToArduinio("n\n");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    // Attach an asynchronous callback to read the data 
    door.on("value", function (snapshot) {
        console.log("door: ", snapshot.val().value);
        if (snapshot.val().value == 1) {
            console.log("on");

            //valor que corresponde para encender el elemento bathroom
            sendToArduinio("o\n");


        }
        else {
            console.log("off");
            // valor que corresponde para apagar el elemento bathroom
            sendToArduinio("p\n");

        }


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    
});
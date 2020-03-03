const { Board, Servo, Led } = require("johnny-five")
const board = new Board()
let panDegree = null
let tiltDegree = null
let center = false
let wait = false
let fire = false

exports.setPanDegree = (newDegree) => {
    panDegree = newDegree
}

exports.setTiltDegree = (newDegree) => {
    tiltDegree = newDegree
}

exports.setCenter = (newCenter) => {
    center = newCenter
}

exports.setStop = (newWait) => {
    wait = newWait
}

exports.setFire = (newFire) => {
    fire = newFire
}

function getCenter() {
    let c = center
    center = false
    return c
}

function getStop() {
    let w = wait
    wait = false
    return w
}

function getFire() {
    let f = fire
    //fire = false
    return f
}

function getPanDegree() {
    return panDegree
}

function getTiltDegree() {
    return tiltDegree
}

board.on("ready", () => {
    const servoPan = new Servo({
        pin: 10,
        //invert: true
    })

    const servoTilt = new Servo({
        pin: 11,
        invert: true
    })

    const anode = new Led.RGB({
        pins: {
            red: 6,
            green: 5,
            blue: 3
        },
        isAnode: true
    })

    
    board.repl.inject({
        servoPan,
        servoTilt,
        anode
    });
    
    servoPan.center()
    servoTilt.center()
    anode.off()

    setInterval(() => {
        let dPan = getPanDegree()
        let dTilt = getTiltDegree()
        let c = getCenter()
        let stop = getStop()
        let fire = getFire()

        if (dPan === null) {
            // Do nothing on startup
        } else if (dPan === 0) {
            // hold position
        } else {
            servoPan.to(dPan)
        }

        if (dTilt === null) {
            // Do nothing on startup
        } else if (dTilt === 0) {
            // hold position
        } else {
            servoTilt.to(dTilt)
        }

        if (c === true) {
            servoPan.to(90)
            servoTilt.to(90)
        }

        if (stop === true) {
            servoPan.stop()
        }

        if (fire === true) {
            anode.on()
            anode.color("#FF0000")
        } else {
            anode.off()
        }

    }, 5)

    // Servo alternate constructor with options
    /*
    var servo = new five.Servo({
      id: "MyServo",     // User defined id
      pin: 10,           // Which pin is it attached to?
      type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
      range: [0,180],    // Default: 0-180
      fps: 100,          // Used to calculate rate of movement between positions
      invert: false,     // Invert all specified positions
      startAt: 90,       // Immediately move to a degree
      center: true,      // overrides startAt if true and moves the servo to the center of the range
    });
    */

    // Servo API

    // min()
    //
    // set the servo to the minimum degrees
    // defaults to 0
    //
    // eg. servo.min();

    // max()
    //
    // set the servo to the maximum degrees
    // defaults to 180
    //
    // eg. servo.max();

    // center()
    //
    // centers the servo to 90°
    //
    // servo.center();

    // to( deg )
    //
    // Moves the servo to position by degrees
    //


    // step( deg )
    //
    // step all servos by deg
    //
    // eg. array.step( -20 );

    // servo.sweep();
});
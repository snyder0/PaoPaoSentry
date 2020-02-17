const { Board, Servo, Led } = require("johnny-five")
const board = new Board()
let degree = null
let sweep = false
let wait = false
let fire = false

exports.setDegree = (newDegree) => {
    degree = newDegree
}

exports.setSweep = (newSweep) => {
    sweep = newSweep
}

exports.setStop = (newWait) => {
    wait = newWait
}

exports.setFire = (newFire) => {
    fire = newFire
}

function getSweep() {
    let s = sweep
    sweep = false
    return s
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

function getDegree() {
    return degree
}

board.on("ready", () => {
    const servo = new Servo({
        pin: 10,
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
    servo.center()
   
    board.repl.inject({
        servo,
        anode
    });

    anode.off()

    setInterval(() => {
        let d = getDegree()
        let s = getSweep()
        let stop = getStop()
        let fire = getFire()

        if (d === null) {
            // Do nothing on startup
        } else if (d === 0) {
            // hold position
        } else {
            servo.to(d)
        }

        if (s === true) {
            servo.sweep()
        }

        if (stop === true) {
            servo.stop()
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
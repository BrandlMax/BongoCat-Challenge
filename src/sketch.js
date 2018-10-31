let BC;
let MIRROR;

function setup() {

    // SETTINGS
    var height = 450;
    var width = 800;
    let scale = 0.6;

    // CANVAS
    let canvas = createCanvas(width * scale, height * scale);
    canvas.parent('bongocat')

    //CAM
    MIRROR = createCapture(VIDEO);
    MIRROR.parent('cam');
    // BONGOCAT
    BC = new BongoCat(width * scale, height * scale);
}

function draw() {

    BC.body();

}

function mousePressed() {
   BC.meow()
}
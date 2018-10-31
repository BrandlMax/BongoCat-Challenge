let BC;
let MIRROR;
let ML;

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

    //ML
    ML = new MLMODEL(MIRROR);

    // SETUP BUTTONS
    setupButtons();
}

function draw() {

    background(255);

    if(ML.PREDICTING){
        console.log(ML.RESULT)

        switch (ML.RESULT) {
            case 'Left':
                BC.left();
                break;

            case 'Right':
                BC.right();
                break;

            case 'Meow':
                BC.meow();
                BC.body();
                break;

            case 'Normal':
                BC.body();
                break;

            default:
                BC.body();
                break;
        }
    }else{
        BC.body();
    }

}

function setupButtons(){
    let buttonNormal = select('#buttonNormal');
    buttonNormal.mousePressed(()=>{
        ML.addImage(0, 'Normal');
    })

    let buttonLeft = select('#buttonLeft');
    buttonLeft.mousePressed(()=>{
        ML.addImage(1, 'Left');
    })

    let buttonRight = select('#buttonRight');
    buttonRight.mousePressed(()=>{
        ML.addImage(2, 'Right');
    })

    let buttonMeow = select('#buttonMeow');
    buttonMeow.mousePressed(()=>{
        ML.addImage(3, 'Meow');
    })


    let buttonTrain = select('#buttonTrain');
    buttonTrain.mousePressed(()=>{
        ML.train();
    })

    let buttonStart = select('#buttonStart');
    buttonStart.mousePressed(()=>{
        ML.predict();
    })
}
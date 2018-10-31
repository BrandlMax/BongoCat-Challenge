let cat, l1, l2, r1, r2, m1, m2, bongoL, bongoR, meow;

function preload() {
    cat = loadImage('./src/img/bongo.png');
    l1 = loadImage('./src/img/l1.png');
    l2 = loadImage('./src/img/l2.png');
    r1 = loadImage('./src/img/r1.png');
    r2 = loadImage('./src/img/r2.png');
    m1 = loadImage('./src/img/m1.png');
    m2 = loadImage('./src/img/m2.png');
    bongoL = loadSound('./src/sound/bongo0.mp3');
    bongoR = loadSound('./src/sound/bongo1.mp3');
    meow = loadSound('./src/sound/meow.mp3');
}


class BongoCat {
    constructor(width = 800, height = 255){
        
        cat.resize(width, height);
        l1.resize(width, height); 
        l2.resize(width, height);
        r1.resize(width, height);
        r2.resize(width, height);
        m1.resize(width, height);
        m2.resize(width, height);

        this.isMeow = false;
    }

    body(){
        image(cat, 0, 0);

        if(this.isMeow){
            image(m2, 0, 0);
        }else{
            image(m1, 0, 0);
        }

        image(r1, 0, 0);
        image(l1, 0, 0);
    }

    right(){
        image(cat, 0, 0);
        image(m1, 0, 0);

        image(r2, 0, 0);
        image(l1, 0, 0);

        if(!bongoR.isPlaying()){
            bongoR.play();
        }
        
    }

    left(){
        image(cat, 0, 0);
        image(m1, 0, 0);

        image(r1, 0, 0);
        image(l2, 0, 0);

        if(!bongoL.isPlaying()){
            bongoL.play();
        }
    }


    both(){
        image(cat, 0, 0);
        image(m1, 0, 0);

        image(r2, 0, 0);
        image(l2, 0, 0);

        bongoR.play();
        bongoL.play();
    }

    meow(){
        this.isMeow = true

        if(!meow.isPlaying()){
            meow.play();
        }

        meow.onended(() =>{
            this.isMeow = false;
        })
    }


}
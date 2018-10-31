class MLMODEL {
    constructor(input){
        this.INPUT = input;

        this.FEATUREEXTRACTOR = ml5.featureExtractor('MobileNet', this.modelReady);
        this.FEATUREEXTRACTOR.numClasses=4
        this.CLASSIFIER = this.FEATUREEXTRACTOR.classification(this.INPUT, this.videoReady.bind(this));

        this.LOSS;
        this.RESULT;

        this.READY = false;
        this.PREDICTING = false;

        this.DATA = [];
    }

    modelReady(){
        console.log('Model Ready!');
    }

    videoReady(){
        console.log('Video Ready!');
        this.READY = true;
    }

    classify(){
        this.CLASSIFIER.classify(this.gotResults.bind(this));
    }

    gotResults(err, result){
        if(err){
            console.error(err);
        }
        // console.log(result, err);
        this.RESULT = result;
        this.classify();
    }

    addImage(labelID ,label){
        this.CLASSIFIER.addImage(label)

        if(this.DATA[labelID] === undefined){
            this.DATA[labelID] = 1;
        } else{
            this.DATA[labelID] = this.DATA[labelID] + 1;
        }

        console.log(this.DATA);
    }

    train(){
        this.CLASSIFIER.train((lossValue) => {
            if (lossValue) {
                this.LOSS = lossValue;
                console.log('Loss: ' + this.LOSS);
            } else {
                console.log('Done Training! Final Loss: ' + this.LOSS);
            }
        });
    }

    predict(){
        this.classify();
        this.PREDICTING = true;
    }
}
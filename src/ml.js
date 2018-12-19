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

        this.DONETRAINING = false;

        this.DATA = [];

        // DIRTY UI/UX FIX
        this.NormalImages = document.getElementById('NormalImages');
        this.LeftImages = document.getElementById('LeftImages');
        this.RightImages = document.getElementById('RightImages');
        this.MeowImages = document.getElementById('MeowImages');

        this.TrainingStats = document.getElementById('TrainingStats');
        this.TrainingBox = document.getElementById('TrainingBox');
        this.StartBox = document.getElementById('StartBox');
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

        this.NormalImages.innerHTML = `${ (this.DATA[0] == undefined) ? '0' : this.DATA[0]} Images`;
        this.LeftImages.innerHTML = `${ (this.DATA[1] == undefined) ? '0' : this.DATA[1]} Images`;
        this.RightImages.innerHTML = `${ (this.DATA[2] == undefined) ? '0' : this.DATA[2]} Images`;
        this.MeowImages.innerHTML = `${ (this.DATA[3] == undefined) ? '0' : this.DATA[3]} Images`;

        this.TrainingBox.className = 'btnBox';
    }

    train(){
        this.CLASSIFIER.train((lossValue) => {
            if (lossValue) {
                this.LOSS = lossValue;
                console.log('Loss: ' + this.LOSS);
                this.TrainingStats.innerHTML = `Loss: ${this.LOSS}`;
            } else {
                console.log('Done Training! Final Loss: ' + this.LOSS);
                this.TrainingStats.innerHTML = `Done: ${this.LOSS}`;
                this.StartBox.className = 'btnBox';
            }
        });
    }

    predict(){
        this.classify();
        this.PREDICTING = true;
    }
}
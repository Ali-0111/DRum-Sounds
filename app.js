class Drum {
    constructor() {
        this.increment = 0;
        this.boxes = document.querySelectorAll('.pad');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.playbtn = document.querySelector('.play');
        this.onOffId = null;
        this.period = 60;
        this.trimmer = document.querySelector('.trimmer');
        this.trimmerMeter = document.querySelector('.trimmer-meter');
        this.muteBtn = document.querySelectorAll('.mute');
        this.selects = document.querySelectorAll('select');
    }
    // toggle class using this keyword
    activeBox()
    {
        this.classList.toggle('active');
    }

    trimmerText(event) {
        this.trimmerMeter.innerText = event.target.value /100;
    }

    trimmerWork(event) {
        this.period = event.target.value;
        clearInterval(this.onOffId);
        this.onOffId = null;
        if (this.playbtn.classList.contains("active")) {
          this.start();
  }   
    }
    // using data track for switch purpose
    mute(event) {
        const track = event.target.getAttribute('data-track');
        event.target.classList.toggle('muted');
        // fur muting and un-muting the sound using toggle class
        if (event.target.classList.contains('muted')) {
            switch(track) {
                case "1" : this.kickAudio.volume = 0;
                break;
                case "2" : this.snareAudio.volume = 0;
                break;
                case "3" : this.hihatAudio.volume = 0;
                break;
            }
        } else {
            switch(track) {
                case "1" : this.kickAudio.volume = 1;
                break;
                case "2" : this.snareAudio.volume = 1;
                break;
                case "3" : this.hihatAudio.volume = 1;
                break;
            }
        }


    }

    changeSound (event) {
        // the source will be change for audios
        const name = event.target.name;
        const val = event.target.value;
        switch (name) {
            case "Group1": this.kickAudio.src = val; break;
            case "Group2": this.snareAudio.src = val; break;
            case "Group3": this.hihatAudio.src = val; break;
        }
    }
    playStop () {
        if (this.onOffId) {
            this.playbtn.innerText = 'Stop';
            this.playbtn.classList.add('active');
        } else {
            this.playbtn.innerText = 'Play';
            this.playbtn.classList.remove('active');
        }
    }
    repeat () {
        let index = this.increment % 8;
        const indexBoxes = document.querySelectorAll(`.p${index}`);
        indexBoxes.forEach((box) => {
            box.style.animation = `zoom 0.3s alternate ease-in-out 2`;
            // playing sound based on  class , each group has its audio
            if (box.classList.contains("active"))
            {
                if (box.classList.contains("g1")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (box.classList.contains("g2")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (box.classList.contains("g3")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.increment++;
    }

    start() {
        // calc the interval 
        let interval = 60 /this.period * 1000;
        //  onOff switch key
        if (this.onOffId) {
            clearInterval(this.onOffId);
            this.onOffId = null;
        } else {

             // call back and arrow function
            this.onOffId = setInterval(()=> {
            this.repeat();
            } , interval);     
        }
    }
}


const drum = new Drum();

// event listners

//iterat each indexed boxes
drum.boxes.forEach((box)=> { 
    // for adding active class to boxes
    box.addEventListener("click",drum.activeBox)
    // for deleting previouse animation 
    box.addEventListener("animationend", ()=> {
        box.style.animation = "";
    });
});

drum.playbtn.addEventListener('click', ()=>{
    drum.start();
    drum.playStop();
});

drum.trimmer.addEventListener('input', function (event) {
    drum.trimmerWork(event);
    drum.trimmerText(event);
});

// adding mute function
drum.muteBtn.forEach((btn)=> {
    btn.addEventListener('click',(event)=> {
    drum.mute(event);
})});

// chaning the source of first 3 audios using option values
drum.selects.forEach((select) => {
    select.addEventListener('change', (event) =>{
        drum.changeSound(event);
    });
});

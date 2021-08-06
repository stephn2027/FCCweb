//text to voice
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voices"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');

const listenButton = document.querySelector('#listen');
const stoplistenButton = document.querySelector('#stop-voice');
msg.text = document.querySelector('[name="text"]').value;


function populateVoices(){
voices = this.getVoices();
   voicesDropdown.innerHTML = voices
 .filter(voice=>!voice.name.includes("Nora"))
 .filter(voice=>voice.lang.includes('en'))
   .map(voice =>`<option value = "${voice.name}">${voice.name} (${voice.lang})</option>`)
   .join("");
   
}

function setVoice(){
 msg.voice = voices.find(voice =>voice.name === this.value);
 
 toggle();
}

function toggle(startOver = false){
    if(msg.voice === null){
        msg.voice = voices[1];
        toggle();
    }
    speechSynthesis.cancel();
    if(startOver){
    speechSynthesis.speak(msg);
    }
    
    
};

function setOption(){
    // msg[this.name] = this.value;
    msg[this.name] = this.value;
    toggle();
}


speechSynthesis.addEventListener('voiceschanged',populateVoices);
voicesDropdown.addEventListener('change',setVoice);

listenButton.addEventListener('click',toggle);
stoplistenButton.addEventListener('click',()=>toggle(false));
options.forEach(option => option.addEventListener('change',setOption));


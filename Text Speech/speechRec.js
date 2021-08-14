//text to voice
let msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voices"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');

const listenButton = document.querySelector('#listen');
const stoplistenButton = document.querySelector('#stop-voice');
msg.text = document.querySelector('textarea').innerText;

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter((voice) => !voice.name.includes('Nora'))
    .filter((voice) => voice.lang.includes('en'))
    .map(
      (voice) =>
        `<option value = "${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join('');
}

function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);

  toggle();
}

function toggle(startOver = false) {
  if (msg.voice === null) {
    msg.voice = voices[1];
    toggle(true);
  }
  speechSynthesis.cancel();
  recognition.stop();
  if (startOver) {
    speakButton.classList.remove('active');

    speechSynthesis.speak(msg);
  }
}

function setOption() {
  // msg[this.name] = this.value;
  msg[this.name] = this.value;
  toggle();
}
function handleListen() {
  toggle(true);
  recognition.stop();
  msg.text = textArea.value;

  speakButton.classList.remove('active');
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);

listenButton.addEventListener('click', handleListen);

stoplistenButton.addEventListener('click', () => {
  toggle(false);
  recognition.stop();
  speakButton.classList.remove('active');
});
options.forEach((option) => option.addEventListener('change', setOption));

//voice to text

window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;

const speakButton = document.querySelector('#speak');

let textArea = document.querySelector('textarea');
const clearButton = document.querySelector('#clear-text');
const saveText = document.querySelector('#save');

recognition.onresult = getData;
saveText.addEventListener('click', () => {
  const text = textArea.value;
  const uriContent =
    'data:application/octet-stream,' + encodeURIComponent(text);
  const newWindow = window.open(uriContent, 'newDocument');
});

textArea.addEventListener('keydown', () => {
  recognition.abort();
  toggle(false);
  speakButton.classList.remove('active');
});

clearButton.addEventListener('click', () => {
  textArea.value = '';
  toggle(false);
  recognition.stop();
  speakButton.classList.remove('active');
});

speakButton.addEventListener('click', () => {
  recognition.start();

  speakButton.classList.add('active');
});

function getData(e) {
  let transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');

  // if(textArea.value){
  //     textArea.value = msg.text+" "+transcript;
  // }
  textArea.value = transcript;

  if (e.results[0].isFinal) {
    msg.text = textArea.value;
  }

  //setOption();
  //   toggle();
}

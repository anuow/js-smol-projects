const textarea = document.querySelector("textarea");
const voiceSelect  = document.querySelector("select");
const button = document.querySelector("button");

let voices = [];

function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";

    voices.forEach((voice, i) =>{
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

speechSynthesis.onvoiceschanged = loadVoices;

button.addEventListener("click",() => {
    const text = textarea.value;
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);

    const selectedVoice = voices[voiceSelect.value];
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);

});


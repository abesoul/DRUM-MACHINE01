const display = document.getElementById("display-text");
const pads = document.querySelectorAll(".drum-pad");
const uploadInput = document.getElementById("file-upload");
const assignKey = document.getElementById("assign-key");

const sounds = {
  Q: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  W: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  E: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  A: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  S: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  D: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  Z: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  X: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  C: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
};

const audioElements = {};

function createAudio(key, src) {
  const audio = new Audio(src);
  audioElements[key] = audio;
}

for (const key in sounds) {
  createAudio(key, sounds[key]);
}

function playSound(key) {
  const sound = audioElements[key];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
    display.textContent = `Playing: ${key}`;
  }
}

pads.forEach(pad => {
  pad.addEventListener("click", () => {
    const key = pad.dataset.key;
    playSound(key);
  });
});

document.addEventListener("keydown", e => {
  const key = e.key.toUpperCase();
  if (audioElements[key]) {
    playSound(key);
  }
});

uploadInput.addEventListener("change", function () {
  const file = this.files[0];
  const selectedKey = assignKey.value;

  if (file && selectedKey) {
    const url = URL.createObjectURL(file);
    createAudio(selectedKey, url);
    display.textContent = `Sample assigned to ${selectedKey}`;
  } else {
    alert("Select a key and upload a file.");
  }
});

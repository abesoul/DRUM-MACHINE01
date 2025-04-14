const display = document.getElementById("display-text");
const pads = document.querySelectorAll(".drum-pad");
const uploadInput = document.getElementById("file-upload");
const assignKey = document.getElementById("assign-key");
const loopToggle = document.getElementById("loop-toggle-checkbox");

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
  audio.loop = loopToggle.checked; // Default loop state
  audioElements[key] = audio;
}

// Loop state update for existing audios when toggled
loopToggle.addEventListener("change", () => {
  const isLooping = loopToggle.checked;
  Object.values(audioElements).forEach(audio => {
    audio.loop = isLooping;
  });
});

function playSound(key) {
  const sound = audioElements[key];
  if (sound) {
    sound.pause();        // Stop if already playing
    sound.currentTime = 0;
    sound.loop = loopToggle.checked; // Use current toggle state
    sound.play();
    display.textContent = `Playing: ${key} ${sound.loop ? '(Looping)' : ''}`;
  }
}

// Create default audio elements for all keys
for (const key in sounds) {
  createAudio(key, sounds[key]);
}

// Trigger sound on pad click
pads.forEach(pad => {
  pad.addEventListener("click", () => {
    const key = pad.dataset.key;
    playSound(key);
  });
});

// Trigger sound on key press
document.addEventListener("keydown", e => {
  const key = e.key.toUpperCase();
  if (audioElements[key]) {
    playSound(key);
  }
});

// Handle file upload and assign it to a key
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

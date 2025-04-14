import React, { useEffect, useState } from "react";
import "./App.css";

const defaultPads = [
  { key: "Q", sound: "SoundHelix-Song-1", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { key: "W", sound: "SoundHelix-Song-2", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { key: "E", sound: "SoundHelix-Song-3", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { key: "A", sound: "SoundHelix-Song-4", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { key: "S", sound: "SoundHelix-Song-5", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { key: "D", sound: "SoundHelix-Song-6", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { key: "Z", sound: "SoundHelix-Song-7", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { key: "X", sound: "SoundHelix-Song-8", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { key: "C", sound: "SoundHelix-Song-9", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
];

function App() {
  const [displayText, setDisplayText] = useState("Press a key or click a pad");
  const [pads, setPads] = useState(defaultPads);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const pad = pads.find(p => p.key === e.key.toUpperCase());
      if (pad) playSound(pad);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [pads]);

  const playSound = (pad) => {
    const audio = document.getElementById(pad.key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setDisplayText(`Playing: ${pad.sound}`);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const key = prompt("Assign a key for this sample (A-Z):").toUpperCase();
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target.result;
        const name = file.name.replace(/\.[^/.]+$/, "");
        setPads(prev => [...prev, { key, sound: name, url }]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🪐 Space Drum Machine</h1>
      <div id="display" className="display">{displayText}</div>
      <div className="pad-grid">
        {pads.map((pad) => (
          <div
            key={pad.key}
            className="drum-pad"
            id={pad.sound}
            onClick={() => playSound(pad)}
          >
            {pad.key}
            <audio id={pad.key} className="clip" src={pad.url}></audio>
          </div>
        ))}
      </div>
      <div className="controls">
        <label htmlFor="file-upload" className="upload-label">
          Upload Your Own Sample
        </label>
        <input id="file-upload" type="file" accept="audio/*" onChange={handleFileUpload} />
      </div>
    </div>
  );
}

export default App;

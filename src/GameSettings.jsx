import React from "react";
import "./GameSettings.css";

const GameSettings = ({ settings, setSettings, sounds }) => {
  const handleIsSoundsCheckbox = () => {
    setSettings({ ...settings, isSounds: !settings.isSounds });
  };
  const handleIsMusicCheckbox = () => {
    const newIsMusic = !settings.isMusic;
    if (newIsMusic) {
      sounds.music.play();
    } else {
      sounds.music.pause();
    }
    setSettings({ ...settings, isMusic: newIsMusic });
  };

  return (
    <div className="settings">
      <label className="setting">
        Sounds
        <input
          type="checkbox"
          checked={settings.isSounds}
          onChange={handleIsSoundsCheckbox}
        />
      </label>
      <label className="setting">
        Music
        <input
          type="checkbox"
          checked={settings.isMusic}
          onChange={handleIsMusicCheckbox}
        />
      </label>
    </div>
  );
};

export default GameSettings;

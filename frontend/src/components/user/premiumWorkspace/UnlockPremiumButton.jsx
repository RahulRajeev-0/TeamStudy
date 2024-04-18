import React from 'react';
import './UnlockPremiumButton.css'; // Assuming you have a CSS file for the button styles

function UnlockButton() {
  return (
    <button className="button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
        <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
      </svg>
      Unlock Premium
    </button>
  );
}

export default UnlockButton;

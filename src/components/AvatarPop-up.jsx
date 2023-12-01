import React from 'react';
import Popup from 'reactjs-popup';

export const PopUpAvatar = () => (
  <Popup
    trigger={<button placeholder="Upload an image with a valid URL" className="button"> Change profile image </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header">Change profile image </div>
    
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
       
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close
          </button>
        </div>
      </div>
    )}
  </Popup>
);

export default PopUpAvatar;

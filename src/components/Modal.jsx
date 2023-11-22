import React, { useState } from 'react';

const Modal = ({ modalContent, close_modal }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('top-bar')) {
      setIsDragging(true);
      setPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      document.body.style.userSelect = 'none';
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      let x = e.clientX - position.x;
      let y = e.clientY - position.y;

      x = Math.max(0, Math.min(x, window.innerWidth - e.target.offsetWidth));
      y = Math.max(0, Math.min(y, window.innerHeight - e.target.offsetHeight));

      setPosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = 'auto';
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x
      }}
      className="modal"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="top-bar" style={{ cursor: isDragging ? 'grabbing' : 'grab', }}>
        <button onClick={close_modal}>Close Modal</button>
      </div>
      {modalContent}
    </div>
  );
};

export default Modal;

import React, { useEffect, useState } from 'react';
import { openedModal as modalContent } from '../script/appStates';
const Modal = ({ close_modal, width = 400, height = 600 }) => {
  const [position, setPosition] = useState({
    x: (window.innerWidth - width) / 2,
    y: (window.innerHeight - height) / 2
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: (window.innerWidth - width) / 2,
      y: (window.innerHeight - height) / 2
    });
  }, [width, height]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      let x = e.clientX - dragOffset.x;
      let y = e.clientY - dragOffset.y;

      // Adjust position to stick to the edges
      x = Math.min(Math.max(x, 0), window.innerWidth - width);
      y = Math.min(Math.max(y, 0), window.innerHeight - height);

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
        left: position.x,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      className='modal'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className='top-bar'
        style={{
          height: 50,
          outline: '5px 0 0 0 solid #212225',
          outlineOffset: -25
        }}
      >
        <button onClick={close_modal}>Close Modal</button>
      </div>
      {modalContent}
    </div>
  );
};

export default Modal;

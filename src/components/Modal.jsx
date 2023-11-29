import React, { useEffect, useState } from 'react';

const Modal = ({ modalContent, close_modal, width = 400, height = 600 }) => {
  const [position, setPosition] = useState({
    x: (window.innerWidth - width) / 2,
    y: (window.innerHeight - height) / 2
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setPosition({
      x: (window.innerWidth - width) / 2,
      y: (window.innerHeight - height) / 2
    });
  }, [width, height]);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('top-bar')) {
      setIsDragging(true);
      setPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y 
      });
      document.body.style.userSelect = 'none';
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition((prevPosition) => {
        const x = e.clientX - prevPosition.x;
        const y = e.clientY - prevPosition.y;

        const newX = Math.max(0, Math.min(x, window.innerWidth - width));
        const newY = Math.max(0, Math.min(y, window.innerHeight - height));

        return { x: newX, y: newY };
      });
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
      className='modal'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className='top-bar'
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
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

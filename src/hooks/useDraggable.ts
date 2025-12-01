import { useState } from 'react';

export const useDraggable = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  let startX = 0;
  let startY = 0;
  let initialX = 0;
  let initialY = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    startX = e.clientX;
    startY = e.clientY;
    initialX = position.x;
    initialY = position.y;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    setPosition({
      x: initialX + deltaX,
      y: initialY + deltaY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return {
    position,
    isDragging,
    handleMouseDown,
  };
};

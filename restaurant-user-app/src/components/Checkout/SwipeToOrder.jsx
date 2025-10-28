import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const SwipeToOrder = ({ onOrderComplete, disabled }) => {
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const startXRef = useRef(0);

  const handleMouseDown = (e) => {
    if (disabled) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current || disabled) return;

    const currentX = e.clientX;
    const containerWidth = containerRef.current.offsetWidth;
    const swipeDistance = currentX - startXRef.current;
    const progress = Math.min(Math.max(swipeDistance / containerWidth, 0), 1);

    setSwipeProgress(progress);

    if (progress >= 0.9) {
      handleOrderComplete();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (swipeProgress < 0.9) {
      setSwipeProgress(0);
    }
  };

  const handleTouchStart = (e) => {
    if (disabled) return;
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !containerRef.current || disabled) return;

    const currentX = e.touches[0].clientX;
    const containerWidth = containerRef.current.offsetWidth;
    const swipeDistance = currentX - startXRef.current;
    const progress = Math.min(Math.max(swipeDistance / containerWidth, 0), 1);

    setSwipeProgress(progress);

    if (progress >= 0.9) {
      handleOrderComplete();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (swipeProgress < 0.9) {
      setSwipeProgress(0);
    }
  };

  const handleOrderComplete = () => {
    if (!disabled && swipeProgress >= 0.9) {
      setSwipeProgress(0);
      setIsDragging(false);
      onOrderComplete();
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, swipeProgress, disabled]);

  return (
    <div
      ref={containerRef}
      className={`swipe-to-order ${disabled ? 'disabled' : ''}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: disabled ? 'not-allowed' : 'grab',
      }}
    >
      <div
        className="swipe-background"
        style={{ width: `${swipeProgress * 100}%` }}
      />

      <div
        className="swipe-button"
        style={{
          left: `${swipeProgress * 85}%`,
          transition: isDragging ? 'none' : 'left 0.3s ease',
        }}
      >
        <ChevronRight size={24} />
      </div>

      <span className="swipe-text">
        {swipeProgress > 0.5 ? 'Release to Order' : 'Swipe to Order'}
      </span>
    </div>
  );
};

export default SwipeToOrder;
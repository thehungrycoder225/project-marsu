import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const isInteractable = e.target.closest('a, button, [role="button"], input, textarea, select');
      setIsPointer(!!isInteractable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Hide default cursor
    document.body.style.cursor = 'none';

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-100 ease-out ${
          isClicking ? 'scale-90' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
        }}
      >
        <div
          className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
            isPointer ? 'scale-150 opacity-80' : 'scale-100 opacity-60'
          }`}
          style={{
            borderColor: `rgba(${currentTheme.primary.r}, ${currentTheme.primary.g}, ${currentTheme.primary.b}, 0.8)`,
            backgroundColor: isPointer 
              ? `rgba(${currentTheme.primary.r}, ${currentTheme.primary.g}, ${currentTheme.primary.b}, 0.2)`
              : 'transparent',
            boxShadow: `0 0 20px rgba(${currentTheme.primary.r}, ${currentTheme.primary.g}, ${currentTheme.primary.b}, 0.4)`,
          }}
        />
      </div>

      {/* Trailing Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          transform: `translate(${position.x - 2}px, ${position.y - 2}px)`,
        }}
      >
        <div
          className="w-1 h-1 rounded-full"
          style={{
            backgroundColor: `rgba(${currentTheme.accent.r}, ${currentTheme.accent.g}, ${currentTheme.accent.b}, 0.9)`,
            boxShadow: `0 0 10px rgba(${currentTheme.accent.r}, ${currentTheme.accent.g}, ${currentTheme.accent.b}, 0.6)`,
          }}
        />
      </div>

      {/* Ripple Effect on Click */}
      {isClicking && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-[9997] animate-ping"
          style={{
            transform: `translate(${position.x - 15}px, ${position.y - 15}px)`,
          }}
        >
          <div
            className="w-8 h-8 rounded-full opacity-50"
            style={{
              backgroundColor: `rgba(${currentTheme.secondary.r}, ${currentTheme.secondary.g}, ${currentTheme.secondary.b}, 0.4)`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default CustomCursor;

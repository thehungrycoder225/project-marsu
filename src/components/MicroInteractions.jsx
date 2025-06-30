import { useState } from 'react';
import PropTypes from 'prop-types';

const MicroInteractionButton = ({ 
  children, 
  onClick, 
  variant = 'glass',
  size = 'md',
  className = '',
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      x,
      y,
      id: Date.now(),
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    if (onClick) onClick(e);
  };

  const baseClasses = 'relative overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    glass: 'glass hover:glass-strong glow-hover',
    neuro: 'neuro-button',
    gradient: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white',
    outline: 'border-2 border-primary-500 hover:bg-primary-50 hover:border-primary-600 text-primary-600',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        isPressed ? 'transform scale-95' : 'hover-lift'
      }`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
      {...props}
    >
      {children}
      
      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: '0.6s',
          }}
        />
      ))}
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </button>
  );
};

const FloatingActionButton = ({ 
  icon, 
  onClick, 
  position = 'bottom-right',
  className = '',
  ...props 
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <button
      className={`fixed ${positionClasses[position]} z-40 w-14 h-14 glass rounded-full hover:glass-strong hover-lift glow-hover group transition-all duration-300 ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center justify-center w-full h-full">
        {icon}
      </div>
      
      {/* Pulse Ring */}
      <div className="absolute inset-0 rounded-full bg-primary-500/20 animate-ping opacity-0 group-hover:opacity-100" />
    </button>
  );
};

const HoverCard = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`glass rounded-2xl p-6 hover:glass-strong hover-lift transition-all duration-300 group ${className}`}
      {...props}
    >
      {children}
      
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

MicroInteractionButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['glass', 'neuro', 'gradient', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

FloatingActionButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
  className: PropTypes.string,
};

HoverCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export { MicroInteractionButton, FloatingActionButton, HoverCard };
export default MicroInteractionButton;

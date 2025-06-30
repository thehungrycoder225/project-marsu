import { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import PropTypes from 'prop-types';

const DynamicBackground = ({ enableParticles = true, enableGradients = true }) => {
  const canvasRef = useRef(null);
  const { currentTheme, isDarkMode } = useTheme();
  const particlesRef = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    if (!enableParticles) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: currentTheme.primary,
    });

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
      }
      particlesRef.current = particles;
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity})`;
        ctx.fill();

        // Connect nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentTheme, enableParticles]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated Gradient Background */}
      {enableGradients && (
        <div className={`absolute inset-0 opacity-30 ${isDarkMode ? 'opacity-20' : 'opacity-30'}`}>
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} animate-gradient-shift`}
            style={{
              background: `linear-gradient(45deg, 
                rgba(${currentTheme.primary.r}, ${currentTheme.primary.g}, ${currentTheme.primary.b}, 0.1),
                rgba(${currentTheme.secondary.r}, ${currentTheme.secondary.g}, ${currentTheme.secondary.b}, 0.1),
                rgba(${currentTheme.accent.r}, ${currentTheme.accent.g}, ${currentTheme.accent.b}, 0.1))`,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 15s ease infinite',
            }}
          />
        </div>
      )}

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Circle */}
        <div 
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-5 animate-float"
          style={{
            background: `radial-gradient(circle, rgba(${currentTheme.primary.r}, ${currentTheme.primary.g}, ${currentTheme.primary.b}, 0.1) 0%, transparent 70%)`,
            animationDelay: '0s',
          }}
        />
        
        {/* Medium Triangle */}
        <div 
          className="absolute bottom-1/3 left-1/4 w-64 h-64 opacity-5 animate-float"
          style={{
            background: `conic-gradient(from 0deg, rgba(${currentTheme.secondary.r}, ${currentTheme.secondary.g}, ${currentTheme.secondary.b}, 0.1), transparent, rgba(${currentTheme.secondary.r}, ${currentTheme.secondary.g}, ${currentTheme.secondary.b}, 0.1))`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            animationDelay: '2s',
          }}
        />

        {/* Small Squares */}
        <div 
          className="absolute top-1/2 left-1/2 w-32 h-32 opacity-5 animate-float rotate-45"
          style={{
            background: `linear-gradient(45deg, rgba(${currentTheme.accent.r}, ${currentTheme.accent.g}, ${currentTheme.accent.b}, 0.1), transparent)`,
            animationDelay: '4s',
          }}
        />

        {/* Hexagon */}
        <div 
          className="absolute top-1/3 left-1/3 w-48 h-48 opacity-5 animate-float"
          style={{
            background: `radial-gradient(ellipse, rgba(${currentTheme.primary.r}, ${currentTheme.primary.g}, ${currentTheme.primary.b}, 0.1) 0%, transparent 70%)`,
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            animationDelay: '6s',
          }}
        />
      </div>

      {/* Particle Canvas */}
      {enableParticles && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: isDarkMode ? 0.3 : 0.2 }}
        />
      )}
    </div>
  );
};

DynamicBackground.propTypes = {
  enableParticles: PropTypes.bool,
  enableGradients: PropTypes.bool,
};

export default DynamicBackground;

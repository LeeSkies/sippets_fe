import React, { useEffect, useRef } from 'react';

export const Test = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    // Particle class
    class Particle {
      constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;
        this.opacity -= 0.01;
      }
    }

    function handleMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        // for (let i = 0; i < 10; i++) { // Create 30 particles in each burst
          const dx = (Math.random() - 0.5) * 10; // Random x velocity between -5 and 5
          const dy = (Math.random() - 0.5) * 10; // Random y velocity between -5 and 5
          const radius = Math.random() * 3; // Random radius between 0 and 10
          const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`; // Random color
          particlesArray.push(new Particle(mouseX, mouseY, dx, dy, radius, color)); // Add particle to array
        // }
      }
      

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing each frame
      particlesArray.forEach((particle, index) => {
        particle.draw();
        particle.update();
        if (particle.opacity <= 0) {
          particlesArray.splice(index, 1);
        }
      });
    }

    animate();

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove); // Remove event listener when component unmounts
    };
  }, []);

  return (
    <div className='h-screen w-full'>
      <canvas ref={canvasRef} className=''></canvas>
    </div>
  );
};

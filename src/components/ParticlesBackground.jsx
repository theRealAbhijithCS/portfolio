import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 50;

    // Choose color based on theme
    const colors = theme === "dark"
      ? ["rgba(255, 255, 255, 0.5)"]
      : ["rgba(0, 0, 0, 0.3)"];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.draw();
      }
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]); // specific dependancy on theme for updating colors

  return (
    <canvas
      ref={canvasRef} // Attach ref so we can access the canvas in JS
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    // fixed → stays fixed on screen
    // top-0 left-0 → positioned at top-left
    // w-full h-full → covers entire screen
    // pointer-events-none → doesn’t block clicks on UI
    // z-0 → stays in background
    />
  );
}

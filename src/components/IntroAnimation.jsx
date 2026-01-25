import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useTheme } from "./ThemeContext";

gsap.registerPlugin(MorphSVGPlugin);

export default function IntroAnimation({ onFinish }) {
  const { theme } = useTheme();
  const greetings = [
    { text: "Hello", lang: "English" },
    { text: "नमस्ते", lang: "Hindi" },
    { text: "Hola", lang: "Spanish" },
    { text: "Bonjour", lang: "French" },
    { text: "Ciao", lang: "Italian" },
    { text: "Olá", lang: "Portuguese" },
    { text: "Здравствуйте", lang: "Russian" },
    { text: "Merhaba", lang: "Turkish" },
    { text: "Γειά", lang: "Greek" },
    { text: "Hej", lang: "Swedish" },
    { text: "Hallo", lang: "German" },
    { text: "Salam", lang: "Arabic" },
    { text: "Welcome to my Portfolio", lang: "Let's Begin" }
  ];

  const [index, setIndex] = useState(0);
  const overlayRef = useRef(null);
  const greetingRef = useRef(null);
  const langRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    let greetingTimer;

    const duration = 0.25;
    const interval = 350;

    const animProps = {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      ease: "power3.out",
      filter: "blur(0px)",
      overwrite: "auto"
    };
    
    const initialProps = {
      opacity: 0,
      y: 20,
      scale: 0.95,
      filter: "blur(4px)"
    };

    if (index < greetings.length - 1) {
      gsap.fromTo(greetingRef.current, initialProps, animProps);
      gsap.fromTo(langRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.6, y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" }
      );
      gsap.fromTo(glowRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1.2, opacity: 0.3, duration: 0.4, ease: "power2.out", overwrite: "auto" }
      );
      greetingTimer = setTimeout(() => setIndex(i => i + 1), interval);
    } else {
      gsap.fromTo(greetingRef.current, initialProps, { ...animProps, duration: 0.4 });
      gsap.fromTo(langRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.6, y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" }
      );

      greetingTimer = setTimeout(() => {
        const tl = gsap.timeline({
          onComplete: () => onFinish && onFinish(),
        });

        tl.to([greetingRef.current, langRef.current], {
          duration: 0.6,
          opacity: 0,
          y: -20,
          ease: "power3.in"
        })
          .to(overlayRef.current, {
            duration: 1.2,
            y: "-100vh",
            ease: "power4.inOut",
          }, "-=0.2")
          .to(
            overlayRef.current.querySelector("path"),
            {
              duration: 1.2,
              morphSVG: "M0,0 L0,150 Q720,600 1440,150 L1440,0 Z",
              ease: "power4.inOut",
            },
            "<"
          );
      }, 700);
    }

    return () => clearTimeout(greetingTimer);
  }, [index, onFinish, greetings.length]);

  const isDark = theme === "dark";
  const fillColor = isDark ? "#000000" : "#f9fafb";

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none transition-colors duration-700 ${
        isDark ? "bg-black" : "bg-gray-50"
      }`}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-[40px] md:blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-[40px] md:blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Glow Effect Behind Text */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[600px] rounded-full blur-[60px] md:blur-[100px] opacity-0 will-change-transform"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0.2) 50%, transparent 100%)'
            : 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.15) 50%, transparent 100%)'
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center gap-2 md:gap-4 px-4">
        {/* Greeting Text - Added py-2 and leading-tight to prevent clipping */}
        <h1
          ref={greetingRef}
          className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-center py-2 leading-tight will-change-transform ${
            isDark
              ? 'text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-blue-200'
              : 'text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-purple-800 to-blue-900'
          }`}
          style={{
            textShadow: isDark
              ? '0 0 30px rgba(139,92,246,0.3)'
              : '0 0 20px rgba(139,92,246,0.1)'
          }}
        >
          {greetings[index].text}
        </h1>

        {/* Language Label */}
        <p
          ref={langRef}
          className={`text-xs sm:text-sm md:text-base font-semibold tracking-[0.2em] md:tracking-[0.3em] uppercase will-change-transform ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {greetings[index].lang}
        </p>

        {/* Animated Progress Dots */}
        <div className="flex gap-1.5 md:gap-2 mt-3 md:mt-4">
          {greetings.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-6 md:w-8 bg-gradient-to-r from-purple-500 to-blue-500'
                  : i < index
                  ? 'w-1.5 bg-purple-500/30'
                  : `w-1.5 ${isDark ? 'bg-white/10' : 'bg-black/10'}`
              }`}
            />
          ))}
        </div>
      </div>

      {/* SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path fill={fillColor} d="M0,0 L0,900 L1440,900 L1440,0 Z" />
      </svg>

      <style jsx>{`
        @keyframes gridMove {
          from { transform: translateY(0); }
          to { transform: translateY(50px); }
        }
      `}</style>
    </div>
  );
}
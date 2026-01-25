import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const MusicPlayer = () => {
  const playlist = [
    "/iwasneverthere.mp3",
    "/escapism.mp3",
    "/blue.mp3",
    "/YAD.mp3",
    "/stars.mp3",
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [infoText, setInfoText] = useState("Wanna play music while scrolling?");
  const [isScrolling, setIsScrolling] = useState(false);
  
  const audioRef = useRef(null);
  const lastTapTime = useRef(0);
  const clickTimeout = useRef(null);
  const isPlayingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Sync ref with state for callbacks
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Handle Scroll Visibility Logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Determine final visibility: Show if scrolling OR if music is playing
  const isVisible = isScrolling || isPlaying;

  const setSourceAndMaybePlay = (src, shouldPlay) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = src;
    audio.load();
    audio.muted = false;
    if (audio.volume === 0) audio.volume = 0.5;

    if (!shouldPlay) return;

    const onCanPlay = () => {
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          setIsPlaying(false);
          setInfoText("Wanna play music while scrolling?");
        });
      }
      audio.removeEventListener("canplay", onCanPlay);
    };
    audio.addEventListener("canplay", onCanPlay);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlayingRef.current) {
      audio.pause();
      setIsPlaying(false);
      setInfoText("Wanna play music while scrolling?");
    } else {
      setSourceAndMaybePlay(playlist[currentTrackIndex], true);
      setIsPlaying(true);
      setInfoText("Double tap to change the music");
    }
  };

  const shuffleNextTrack = () => {
    const wasPlaying = isPlayingRef.current;
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } while (nextIndex === currentTrackIndex && playlist.length > 1);

    setCurrentTrackIndex(nextIndex);
    setSourceAndMaybePlay(playlist[nextIndex], wasPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.preload = "auto";
    audio.volume = 0.6;
  }, []);

  const handleDoubleTapMobile = () => {
    const now = Date.now();
    if (now - lastTapTime.current < 400) {
      shuffleNextTrack();
    }
    lastTapTime.current = now;
  };

  const handleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      shuffleNextTrack();
    } else {
      clickTimeout.current = setTimeout(() => {
        togglePlay();
        clickTimeout.current = null;
      }, 250);
    }
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-2 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Text with no background or border */}
      <p className="text-xs text-gray-600 dark:text-gray-300 italic font-medium">
        {infoText}
      </p>

      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]}
        onEnded={shuffleNextTrack}
        preload="auto"
      />

      <button
        onClick={handleClick}
        onTouchStart={handleDoubleTapMobile}
        className="p-4 rounded-full shadow-lg transition transform hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #00f0ff, #00ff80)",
          boxShadow: "0 0 15px #00f0ff, 0 0 25px #00ff80",
          color: "white",
        }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
    </div>
  );
};

export default MusicPlayer;
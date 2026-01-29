import React, { useState, useEffect, useRef } from "react";
import { FaGraduationCap, FaCalendarAlt, FaUniversity } from "react-icons/fa";

const educationData = [
  {
    course: "Master of Computer Application (MCA)",
    college: "Mahatma Gandhi University",
    department: "DePaul Institute of Science and Technology, Angamaly (DiST)",
    duration: "2024 - 2026",
    description: (
      <>
        Currently pursuing MCA with a strong foundation in Django and PHP, maintaining an aggregate of{" "}
        <span className="text-purple-600 dark:text-purple-400 font-bold">84%</span>.
      </>
    ),
  },
  {
    course: "Bachelor of Computer Application (BCA)",
    college: "Calicut University",
    department: "Naipunnya Institute of Management and Information Technology, Pongam (NIMIT)",
    duration: "2021 - 2024",
    description: (
      <>
        Strong foundation in Data Structures, Algorithms, and Web Development. Served as the team lead for the college project and graduated with{" "}
        <span className="text-purple-600 dark:text-purple-400 font-bold">80%</span>.
      </>
    ),
  },
  {
    course: "Higher Secondary (12th)",
    college: "GHSS, Nandikara",
    department: "Science Stream",
    duration: "2019 - 2021",
    description: (
      <>
        Focused on Mathematics, Physics, and Chemistry. Graduated with distinction and achieved{" "}
        <span className="text-purple-600 dark:text-purple-400 font-bold">92% marks</span>.
      </>
    ),
  },
  {
    course: "Secondary (10th)",
    college: "SKHS, Mattathur",
    department: "General Education",
    duration: "2019",
    description: (
      <>
        Successfully completed secondary education with top honors and{" "}
        <span className="text-purple-600 dark:text-purple-400 font-bold">100% full marks</span>, recognized as the School Topper.
      </>
    ),
  },
];

const EducationItem = ({ edu, index, visibleIndices, isMobile, timelineHeight }) => {
  const isVisible = visibleIndices.includes(index);
  const isLeft = index % 2 === 0;
  const isLast = index === educationData.length - 1;
  
  // Calculate specific point for this dot (0 to 100 range)
  const dotActivationPoint = (index / (educationData.length - 1)) * 100;
  
  // FIXED SYNC LOGIC: 
  // We add a small buffer (+1.5 on mobile) to ensure the line physically overlaps the dot before it glows
  const buffer = isMobile ? 1.5 : 0.5;
  const isFocused = isLast 
    ? timelineHeight >= 99 
    : timelineHeight >= (dotActivationPoint + buffer);

  return (
    <div
      className={`relative flex items-center min-h-[220px] md:min-h-[280px] transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ zIndex: 20 }}
    >
      {/* CARD CONTAINER */}
      <div
        className={`relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border transition-all duration-700 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl z-20 ${
          isMobile
            ? "w-[calc(100%-5rem)] ml-auto mr-2" // Added mr-2 to fix the "lean to right edge" issue
            : `w-[42%] ${isLeft ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"}`
        } ${
          isFocused 
            ? "border-purple-500/50 dark:border-purple-400/50 scale-[1.03] ring-4 ring-purple-500/10" 
            : "border-slate-200 dark:border-white/5 opacity-60 scale-100"
        }`}
      >
        <div className="relative flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className={`p-3 md:p-4 rounded-2xl transition-all duration-1000 ${isFocused ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg rotate-[360deg]' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
              <FaGraduationCap className="text-xl md:text-3xl" />
            </div>
            <span className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase border transition-all duration-700 ${
              isFocused ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-xl" : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-white/5"
            }`}>
              <FaCalendarAlt /> {edu.duration}
            </span>
          </div>

          <div>
            <h3 className={`text-xl md:text-2xl font-black leading-tight mb-2 transition-colors duration-700 ${isFocused ? "text-purple-600 dark:text-purple-400" : "text-slate-900 dark:text-white"}`}>
              {edu.course}
            </h3>
            <div className="space-y-1">
                <p className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm md:text-base">
                  <FaUniversity className="text-purple-500" /> {edu.college}
                </p>
                <p className="text-slate-500 dark:text-slate-400 font-semibold text-[10px] md:text-xs uppercase tracking-widest">
                    {edu.department}
                </p>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed border-l-2 border-purple-500/20 pl-4 py-1">
            {edu.description}
          </p>
        </div>
      </div>

      {/* TIMELINE DOT */}
      <div
        className={`absolute flex items-center justify-center transition-all duration-500 ${
          isMobile ? "left-6 -translate-x-1/2" : "left-1/2 -translate-x-1/2"
        }`}
        style={{ zIndex: 100 }}
      >
        <div className="relative flex items-center justify-center bg-slate-50 dark:bg-[#020617] rounded-full p-2 md:p-6">
          {isFocused && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/40 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute w-12 h-12 md:w-16 md:h-16 bg-purple-500/20 rounded-full animate-pulse blur-xl"></div>
            </div>
          )}
          <div 
            className={`rounded-full border-4 md:border-[6px] border-white dark:border-slate-900 relative z-[110] shadow-2xl transition-all duration-500 ${
            isFocused 
            ? "w-6 h-6 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-indigo-600 scale-110 shadow-purple-500/50 delay-100" 
            : "w-4 h-4 md:w-6 md:h-6 bg-slate-300 dark:bg-slate-800 scale-90 delay-0"
          }`} />
        </div>
      </div>
    </div>
  );
};

const Education = () => {
  const [visibleIndices, setVisibleIndices] = useState([0]);
  const [timelineHeight, setTimelineHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const frameId = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    checkMobile();

    const handleScroll = () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);

      frameId.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Trigger point (Higher value means the line grows later as you scroll)
        const tipPoint = windowHeight * 0.65; 
        const relativeTip = tipPoint - containerRect.top;
        
        let progress = (relativeTip / containerRect.height) * 100;
        
        // Force 100% when near the bottom
        if (containerRect.bottom <= windowHeight + 50) {
            progress = 100;
        }

        progress = Math.min(100, Math.max(0, progress));
        setTimelineHeight(progress);

        const newVisible = [];
        educationData.forEach((_, idx) => {
          const dotPos = (idx / (educationData.length - 1)) * 100;
          if (progress >= dotPos - 10 || idx === 0) {
            newVisible.push(idx);
          }
        });
        setVisibleIndices(newVisible);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId.current);
    };
  }, []);

  return (
    <section id="education" className="relative bg-slate-50 dark:bg-[#020617] py-24 md:py-40 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="relative w-full flex flex-col items-center justify-center mb-32 md:mb-56">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 
              className="font-black text-slate-200/60 dark:text-slate-800/25 uppercase leading-none whitespace-nowrap select-none"
              style={{ 
                fontSize: isMobile ? '13vw' : '15vw', 
                letterSpacing: isMobile ? '0.15em' : '0.05em',
                transform: `rotateX(15deg) translateY(${isMobile ? '25%' : '0%'})`, 
                perspective: '1000px',
                zIndex: 0
              }}
            >
              History
            </h1>
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center w-full">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/40 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>
              <span className="text-[10px] md:text-xs font-black text-purple-700 dark:text-purple-300 tracking-[0.3em] uppercase">
                Qualifications
              </span>
            </div>
            <h2 className="text-[7.2vw] md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter drop-shadow-md leading-none whitespace-nowrap px-4">
              Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400">Milestones.</span>
            </h2>
          </div>
        </div>

        <div ref={containerRef} className="relative">
          {/* TRACK BACKGROUND */}
          <div className={`absolute top-0 w-[2px] md:w-[4px] bg-slate-200 dark:bg-slate-800/50 h-full rounded-full z-0 ${
              isMobile ? "left-6" : "left-1/2 -translate-x-1/2"
            }`} 
          />

          {/* PROGRESS LINE */}
          <div
            className={`absolute top-0 w-[2px] md:w-[4px] bg-gradient-to-b from-purple-600 via-indigo-500 to-purple-400 origin-top z-10 shadow-[0_0_20px_rgba(147,51,234,0.5)] ${
              isMobile ? "left-6" : "left-1/2 -translate-x-1/2"
            }`}
            style={{ 
              height: '100%',
              transform: `scaleY(${timelineHeight / 100})`,
              transition: 'transform 0.1s linear' // Faster transition for tighter sync
            }}
          />

          <div className="flex flex-col gap-20 md:gap-40">
            {educationData.map((edu, idx) => (
              <EducationItem
                key={idx}
                edu={edu}
                index={idx}
                visibleIndices={visibleIndices}
                isMobile={isMobile}
                timelineHeight={timelineHeight}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
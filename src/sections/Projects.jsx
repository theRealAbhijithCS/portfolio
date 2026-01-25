import React, { useRef, useState } from "react";
import { FaGithub, FaArrowRight, FaRocket, FaExchangeAlt, FaChevronRight } from "react-icons/fa";

// --- Images ---
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";

const projects = [
  {
    title: "Nova Tech",
    description: "A modern e-commerce platform delivering seamless shopping experiences.",
    tags: ["React", "Tailwind", "Node.js"],
    link: "https://therealabhijithcs.github.io/e_commerce/",
    desktopParams: img1,
    mobileParams: photo1,
    status: "Beta",
    css: {
      gradient: "from-purple-500 to-indigo-500",
      iconColor: "text-purple-400",
      textGradient: "dark:from-white dark:to-purple-200 from-purple-700 to-purple-900",
      tagHover: "group-hover:border-purple-500/40 group-hover:text-purple-700 dark:group-hover:text-purple-200",
    }
  },
  {
    title: "Historia",
    description: "An interactive calendar and productivity suite for history enthusiasts.",
    tags: ["JavaScript", "Firebase", "PWA"],
    link: "https://therealabhijithcs.github.io/calendar/",
    desktopParams: img2,
    mobileParams: photo2,
    status: "Beta",
    css: {
      gradient: "from-cyan-500 to-blue-500",
      iconColor: "text-cyan-400",
      textGradient: "dark:from-white dark:to-cyan-200 from-cyan-700 to-cyan-900",
      tagHover: "group-hover:border-cyan-500/40 group-hover:text-cyan-700 dark:group-hover:text-cyan-200",
    }
  },
  {
    title: "Megha Portfolio",
    description: "A highly interactive portfolio website featuring WebGL animations.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://theRealMegha.github.io/portfolio/",
    desktopParams: img3,
    mobileParams: photo3,
    status: "Live",
    css: {
      gradient: "from-amber-500 to-orange-500",
      iconColor: "text-amber-400",
      textGradient: "dark:from-white dark:to-amber-200 from-amber-700 to-amber-900",
      tagHover: "group-hover:border-amber-500/40 group-hover:text-amber-700 dark:group-hover:text-amber-200",
    }
  },
];

const ProjectCard = ({ project, index, activeIndex }) => {
  const isActive = index === activeIndex;

  return (
    <div 
      className={`group relative h-full w-[88%] lg:w-full flex-shrink-0 snap-center snap-always lg:snap-align-none px-3 lg:px-0 transition-all duration-700 ease-in-out 
        ${!isActive 
          ? "scale-90 opacity-50 grayscale lg:grayscale-0 lg:opacity-100 lg:scale-100" 
          : "scale-100 opacity-100 grayscale-0"
        } lg:!grayscale-0 lg:!scale-100 lg:!opacity-100`}
    >
      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center px-12">
        <div className="relative overflow-hidden rounded-3xl bg-gray-200 dark:bg-[#1a1a1a] h-[450px] shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-black/10 dark:border-white/10 text-xs font-bold text-gray-900 dark:text-white shadow-lg">
            <span className={`h-2 w-2 rounded-full animate-ping bg-gradient-to-r ${project.css.gradient}`}></span>
            {project.status}
          </div>
          <img src={project.desktopParams} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-2">
            <div className={`h-1 w-12 bg-gradient-to-r ${project.css.gradient} rounded-full`}></div>
            <span className={`text-xs font-bold tracking-widest uppercase ${project.css.iconColor}`}>Featured Project</span>
          </div>
          <h3 className={`text-5xl font-black text-gray-900 dark:text-white py-1 transition-all duration-300`}>
            {project.title}
          </h3>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span key={tag} className={`px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-mono text-gray-700 dark:text-gray-300 ${project.css.tagHover} transition-all`}>
                {tag}
              </span>
            ))}
          </div>
          <a href={project.link} target="_blank" rel="noreferrer" className={`px-8 py-4 rounded-full bg-gradient-to-r ${project.css.gradient} text-white font-bold text-sm shadow-xl w-fit flex items-center gap-3 mt-4 hover:scale-105 active:scale-95 transition-transform`}>
            <FaRocket /> Launch Project <FaArrowRight />
          </a>
        </div>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="lg:hidden relative flex flex-col h-full w-full bg-white dark:bg-[#0f172a]/90 rounded-[2.5rem] p-4 shadow-xl border border-gray-100 dark:border-white/10">
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] mb-6 shadow-lg">
          <img src={project.mobileParams} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase text-white shadow-sm">
            <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${project.css.gradient}`}></span>
            {project.status}
          </div>
        </div>
        <div className="flex flex-col flex-1 px-2 pb-2">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{project.title}</h3>
          <div className={`h-1 w-10 bg-gradient-to-r ${project.css.gradient} rounded-full mb-3`}></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-white/5 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{tag}</span>
            ))}
          </div>
          <a href={project.link} target="_blank" rel="noreferrer" className={`px-5 py-4 rounded-2xl bg-gradient-to-r ${project.css.gradient} text-white font-bold text-xs shadow-lg w-full flex items-center justify-center mt-auto gap-2 uppercase active:scale-95 transition-transform`}>
            <FaRocket /> Launch Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / (offsetWidth * 0.88));
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth * 0.88;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="projects" className="relative bg-gray-50 dark:bg-[#020617] py-12 sm:py-32 overflow-hidden transition-colors duration-500">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 lg:mb-24 max-w-4xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-2 w-10 rounded-full bg-purple-500"></span>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-tighter uppercase">Selected Works</span>
              </div>
              <h2 className="text-4xl sm:text-7xl font-black text-gray-900 dark:text-white leading-[1.1]">
                CRAFTING <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800 dark:from-gray-300 dark:to-gray-100">
                  DIGITAL VISIONS.
                </span>
              </h2>
            </div>

            {/* --- SWIPE NOTIFICATION (Mobile Only) --- */}
            <div className="lg:hidden inline-flex items-center gap-3 py-2 px-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                Swipe to Explore <FaExchangeAlt className="text-purple-500 animate-[pulse_2s_infinite]" />
              </p>
            </div>
          </div>
        </div>

        {/* --- CAROUSEL CONTAINER --- */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex lg:flex-col lg:space-y-48 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory no-scrollbar scroll-smooth px-[6%] lg:px-0 pb-12"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              activeIndex={activeIndex}
            />
          ))}
        </div>

        {/* Mobile Pagination */}
        <div className="flex lg:hidden gap-3 mt-4 justify-center items-center">
          {projects.map((_, i) => (
            <button 
              key={i} 
              onClick={() => scrollTo(i)} 
              className={`transition-all duration-500 rounded-full ${i === activeIndex ? "w-8 h-1.5 bg-purple-600" : "w-1.5 h-1.5 bg-gray-300"}`} 
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 lg:mt-32 pt-10 border-t border-gray-200 dark:border-white/5 flex justify-center px-6">
          <a href="https://github.com/abhijithcs200" className="px-10 py-5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold flex items-center gap-3 hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition-all shadow-xl">
            <FaGithub className="text-xl" /> Full Project Archive
          </a>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .snap-always {
          scroll-snap-stop: always;
        }
      `}</style>
    </section>
  );
}
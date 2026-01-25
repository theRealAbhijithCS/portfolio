import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaArrowRight, FaRocket } from "react-icons/fa";

// --- Importing your project images ---
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
      border: "border-purple-500/30",
      borderHover: "group-hover:border-purple-500/60",
      shadowHover: "group-hover:shadow-purple-500/20",
      bgTint: "bg-purple-500/5",
      textGradient: "dark:from-white dark:to-purple-200 from-purple-700 to-purple-900",
      iconColor: "text-purple-400",
      tagHover: "group-hover:border-purple-500/40 group-hover:text-purple-700 dark:group-hover:text-purple-200",
      gradient: "from-purple-500 to-indigo-500",
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
      border: "border-cyan-500/30",
      borderHover: "group-hover:border-cyan-500/60",
      shadowHover: "group-hover:shadow-cyan-500/20",
      bgTint: "bg-cyan-500/5",
      textGradient: "dark:from-white dark:to-cyan-200 from-cyan-700 to-cyan-900",
      iconColor: "text-cyan-400",
      tagHover: "group-hover:border-cyan-500/40 group-hover:text-cyan-700 dark:group-hover:text-cyan-200",
      gradient: "from-cyan-500 to-blue-500",
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
      border: "border-amber-500/30",
      borderHover: "group-hover:border-amber-500/60",
      shadowHover: "group-hover:shadow-amber-500/20",
      bgTint: "bg-amber-500/5",
      textGradient: "dark:from-white dark:to-amber-200 from-amber-700 to-amber-900",
      iconColor: "text-amber-400",
      tagHover: "group-hover:border-amber-500/40 group-hover:text-amber-700 dark:group-hover:text-amber-200",
      gradient: "from-amber-500 to-orange-500",
    }
  },
];

const ActionButton = ({ children, className = "", href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`relative overflow-hidden inline-flex items-center justify-center ${className}`}
  >
    {children}
  </motion.a>
);

const ProjectCard = ({ project, index, isMobileView = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={isMobileView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={isMobileView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobileView ? "0px" : "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative h-full"
      onMouseEnter={() => !isMobileView && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gray-200 dark:bg-[#1a1a1a] h-[450px] shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-black/10 dark:border-white/10 text-xs font-bold text-gray-900 dark:text-white shadow-lg">
            <span className={`h-2 w-2 rounded-full animate-ping bg-gradient-to-r ${project.css.gradient}`}></span>
            {project.status}
          </div>
          <motion.img
            src={project.desktopParams}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.css.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        </motion.div>

        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-2">
            <div className={`h-1 w-12 bg-gradient-to-r ${project.css.gradient} rounded-full`}></div>
            <span className={`text-xs font-bold tracking-widest uppercase ${project.css.iconColor}`}>Featured Project</span>
          </div>
          {/* FIXED: Added py-1 to prevent title clipping */}
          <h3 className={`text-5xl font-black text-gray-900 dark:text-white py-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${project.css.textGradient} transition-all duration-300`}>
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
          <ActionButton href={project.link} className={`px-8 py-4 rounded-full bg-gradient-to-r ${project.css.gradient} text-white font-bold text-sm shadow-xl w-fit gap-3 mt-4`}>
            <FaRocket /> Launch Project <FaArrowRight />
          </ActionButton>
        </div>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="lg:hidden relative flex flex-col h-full">
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
          <img src={project.mobileParams} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm text-[10px] font-bold uppercase text-gray-900 dark:text-white">
            <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${project.css.gradient}`}></span>
            {project.status}
          </div>
        </div>
        <div className="py-6 flex flex-col flex-1">
          {/* FIXED: Added py-1 here too */}
          <h3 className="text-3xl font-black text-gray-900 dark:text-white py-1 mb-2">{project.title}</h3>
          <div className={`h-1 w-12 bg-gradient-to-r ${project.css.gradient} rounded-full mb-4`}></div>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-700 dark:text-gray-300">{tag}</span>
            ))}
          </div>
          <ActionButton href={project.link} className={`px-6 py-4 rounded-2xl bg-gradient-to-r ${project.css.gradient} text-white font-bold text-sm shadow-lg w-full justify-center mt-auto gap-3`}>
            <FaRocket /> VIEW PROJECT <FaArrowRight />
          </ActionButton>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeIndex = Math.abs(page % projects.length);

  const paginate = (newDirection) => {
    const nextIndex = activeIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < projects.length) {
      setPage([page + newDirection, newDirection]);
    }
  };

  return (
    <section id="projects" className="relative bg-gray-50 dark:bg-[#020617] py-16 sm:py-32 overflow-hidden transition-colors duration-500">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-6">
            <span className="h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]"></span>
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-200 tracking-widest uppercase">Portfolio</span>
          </motion.div>
          
          {/* FIXED: Changed leading-[0.9] to leading-[1.1] and added py-2 */}
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-4xl sm:text-7xl font-black text-gray-900 dark:text-white leading-[1.1] py-2 mb-8"
          >
            CRAFTING <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-300 dark:to-gray-500">
              UNIQUE EXPERIENCES.
            </span>
          </motion.h2>
        </div>

        {isMobile ? (
          <div className="relative h-[750px] flex flex-col items-center">
            <div className="relative w-full h-full flex justify-center items-center touch-none">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={{
                    enter: (d) => ({ x: d > 0 ? 400 : -400, opacity: 0, scale: 0.9 }),
                    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
                    exit: (d) => ({ zIndex: 0, x: d < 0 ? 400 : -400, opacity: 0, scale: 0.9 })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 260, damping: 25 }, opacity: { duration: 0.2 } }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) > 50;
                    if (swipe && offset.x > 0) paginate(-1);
                    else if (swipe && offset.x < 0) paginate(1);
                  }}
                  className="absolute w-full max-w-[360px]"
                >
                  <ProjectCard project={projects[activeIndex]} isMobileView={true} />
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex gap-4 mt-8">
              {projects.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setPage([i, i > activeIndex ? 1 : -1])} 
                  className={`h-1.5 transition-all duration-300 rounded-full ${i === activeIndex ? "w-10 bg-purple-500" : "w-3 bg-gray-300 dark:bg-gray-700"}`} 
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-40">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} isMobileView={false} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-40 pt-12 border-t border-black/5 dark:border-white/5 flex justify-center">
          <ActionButton href="https://github.com/abhijithcs200" className="px-10 py-5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold gap-3">
            <FaGithub className="text-xl" /> Explore More on GitHub
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
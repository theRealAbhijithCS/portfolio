import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaLaptopCode, FaArrowRight, FaRocket } from "react-icons/fa";

// Importing project images
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";

// --- Project Data with Explicit Classes ---
// Defining full Tailwind class strings here prevents JIT purging issues.
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
      buttonText: "group-hover:text-purple-700 dark:group-hover:text-purple-300",
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
      buttonText: "group-hover:text-cyan-700 dark:group-hover:text-cyan-300",
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
      buttonText: "group-hover:text-amber-700 dark:group-hover:text-amber-300",
      tagHover: "group-hover:border-amber-500/40 group-hover:text-amber-700 dark:group-hover:text-amber-200",
      gradient: "from-amber-500 to-orange-500",
    }
  },
];

const MagneticButton = ({ children, className = "", href }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    x.set(clientX - center.x);
    y.set(clientY - center.y);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={`relative overflow-hidden inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.a>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <motion.div
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "0px" : "-50px" }}
      transition={isMobile ? { duration: 0 } : {
        duration: 0.6,
        delay: index * 0.15
      }}
      className="group relative will-change-transform"
      onMouseEnter={() => {
        if (!isMobile) setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Desktop Layout - Horizontal */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#1a1a1a] h-[400px]"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Status Badge */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-black/10 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-gradient-to-r ${project.css.gradient}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r ${project.css.gradient}`}></span>
            </span>
            {project.status}
          </div>

          {/* Image */}
          <div className="w-full h-full relative overflow-hidden">
            <motion.img
              src={project.desktopParams}
              alt={project.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.css.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className={`h-1 w-12 bg-gradient-to-r ${project.css.gradient} rounded-full`}></div>
              <span className={`text-xs font-bold tracking-widest uppercase ${project.css.iconColor}`}>
                Featured Project
              </span>
            </motion.div>

            <h3 className={`text-4xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${project.css.textGradient} transition-all duration-300`}>
              {project.title}
            </h3>

            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-mono text-gray-700 dark:text-gray-300 transition-all hover:scale-105 ${project.css.tagHover}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <MagneticButton
            href={project.link}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r ${project.css.gradient} text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 w-fit`}
          >
            <FaRocket className="text-lg" />
            Launch Project
            <FaArrowRight className="text-sm" />
          </MagneticButton>
        </div>
      </div>

      {/* Mobile/Tablet Layout - Modern Premium Card */}
      <div className="lg:hidden relative overflow-hidden rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-xl">
        {/* Mobile Image Area - Optimized for "Fill" look */}
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <img
            src={project.mobileParams}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-black/5 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-900 dark:text-white shadow-sm">
            <span className={`h-1.5 w-1.5 rounded-full animate-pulse bg-gradient-to-r ${project.css.gradient}`}></span>
            {project.status}
          </div>
        </div>

        {/* Text Area - High Precision Typography */}
        <div className="p-8 space-y-5">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
              {project.title}
            </h3>
            <div className={`h-1.5 w-12 bg-gradient-to-r ${project.css.gradient} rounded-full`}></div>
          </div>

          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
            {project.description}
          </p>

          {/* Tags - Optimized for tap targets */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-bold font-mono text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-6">
            <MagneticButton
              href={project.link}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r ${project.css.gradient} text-white font-black text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 w-full justify-center`}
            >
              <FaRocket className="text-lg" />
              LAUNCH PROJECT
              <FaArrowRight className="text-sm" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="relative bg-gray-50 dark:bg-[#020617] py-16 sm:py-32 overflow-x-clip transition-colors duration-500">

      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* Background Gradients - Reduced for mobile performance */}
      <div className="absolute top-0 right-0 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] bg-purple-600/5 sm:bg-purple-600/10 blur-[80px] sm:blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] bg-blue-600/5 sm:bg-blue-600/10 blur-[80px] sm:blur-[130px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-12 sm:mb-20 flex flex-col items-start max-w-2xl mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4 sm:mb-6"
          >
            <span className="flex h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]"></span>
            <span className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-200 tracking-widest uppercase">My Portfolio</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1]"
          >
            BUILDING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-700 to-gray-900 dark:from-gray-200 dark:via-gray-400 dark:to-gray-500">DIGITAL PRODUCTS.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-600 dark:text-gray-400 font-normal max-w-xl leading-relaxed"
          >
            Crafting interfaces that combine aesthetic excellence with robust engineering. Explore selected works below.
          </motion.p>
        </div>

        {/* Projects List */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-20 sm:mt-32 border-t border-black/10 dark:border-white/10 pt-8 sm:pt-12 flex justify-center">
          <MagneticButton
            href="https://github.com/theRealAbhijithCS"
            className="group flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-gray-900 dark:text-white transition-all hover:scale-105"
          >
            <FaGithub className="text-lg sm:text-xl" />
            <span className="text-sm sm:text-base font-semibold">Explore more on GitHub</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
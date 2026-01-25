import { FaJava, FaReact, FaHtml5, FaCss3Alt, FaJsSquare, FaPhp, FaGitAlt } from 'react-icons/fa';
import { SiTailwindcss, SiPython, SiMongodb, SiMysql, SiPostgresql, SiDjango, SiSpringboot } from 'react-icons/si';
import { TbApi, TbBrandCpp, TbBrandVscode, TbLetterC } from 'react-icons/tb';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Skills() {

  const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <SiSpringboot />, name: "Spring Boot" }, // New addition
    { icon: <TbApi />, name: "REST API" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <FaGitAlt />, name: "Git" },
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3Alt />, name: "CSS" },
    { icon: <FaJsSquare />, name: "JavaScript" },
    { icon: <FaPhp />, name: "PHP" },
    { icon: <SiDjango />, name: "Django" },
    { icon: <TbBrandCpp />, name: "C++" },
    { icon: <TbBrandVscode />, name: "VS Code" },
    { icon: <TbLetterC />, name: "C" },
  ];
  const repeated = [...skills, ...skills]

  const dir = useRef(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver((
      [entry]) => {
      setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
    },
      { threshold: [0.1] }
    )
    io.observe(el);
    return () => io.disconnect();

  }, [])

  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => {
      dir.current = e.deltaY > 0 ? -1 : 1;
    };
    const onTouchStart = (e) => {
      touchY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      dir.current = delta > 0 ? 1 : -1;
      touchY.current = e.touches[0].clientY;
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    }
  }, [active]);



  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = x.get() + SPEED * dir.current * dt;
      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }
      x.set(next)
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id);
  }, [x]);


  return (
    <section id="skills"
      ref={sectionRef}
      className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-gray-50 dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-500">
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
opacity-20 blur-[120px] animate-pulse
'/>
        <div className='absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
opacity-20 blur-[120px] animate-pulse delay-500
' />

      </div>

      <motion.h2 className='text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10'
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My Skills
      </motion.h2>
      <motion.p className='mt-2 mb-8 text-gray-600 dark:text-white/90 text-base sm:text-lg z-10'
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}

      >
        Modern Applications | Modern Technologies
      </motion.p>

      <div className='relative w-full overflow-hidden'>
        <motion.div
          ref={trackRef}
          className='flex gap-10 text-6xl text-gray-800 dark:text-[#1cd8d2]'
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
        >

          {repeated.map((s, i) => (
            <div
              key={i} className='flex flex-col items-center gap-2 min-w-[120px]'
              aria-label={s.name}
              title={s.name}
            >
              <span className='hover:scale-125 transition-transform duration-300'>
                {s.icon}
              </span>
              <p className='text-sm'>
                {s.name}
              </p>
            </div>
          ))}
        </motion.div>


      </div>


    </section>
  )
}
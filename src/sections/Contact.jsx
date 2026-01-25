import { useState, useEffect, useRef } from "react";
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import Astra from "../assets/Astra.png";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", idea: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  // 1. Detect Mobile to disable heavy particles
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop watching immediately
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const required = ["name", "email", "idea"];
    const newErrors = {};
    required.forEach(f => !formData[f].trim() && (newErrors[f] = "Required"));
    if (Object.keys(newErrors).length) return setErrors(newErrors);

    const mailto = `mailto:abhijithcs200@gmail.com?subject=Inquiry&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0A${formData.idea}`;
    window.location.href = mailto;
    setStatus("success");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full min-h-screen relative bg-white dark:bg-black overflow-hidden py-20 px-6 md:px-20 flex items-center justify-center"
    >
      {/* EFFECTIVE FIX: Disable particles on mobile devices */}
      {!isMobile && <ParticlesBackground />}

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Image Section */}
        <div className={`w-full md:w-1/2 flex justify-center transform-gpu ${isVisible ? 'animate-entry-left' : 'opacity-0'}`}>
          <img
            src={Astra}
            alt="Contact"
            loading="lazy"
            decoding="async"
            className="w-56 md:w-140 h-auto object-contain animate-float"
          />
        </div>

        {/* Right Side Form - Reduced heavy CSS on mobile */}
        <div className={`w-full md:w-1/2 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-white/10 
          bg-gray-50 dark:bg-zinc-900 md:bg-white/50 md:backdrop-blur-sm 
          ${isVisible ? 'animate-entry-right' : 'opacity-0'} transform-gpu`}>
          
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Let’s Work Together</h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              name="idea"
              rows={4}
              placeholder="Your Project Idea"
              value={formData.idea}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-transform active:scale-95"
            >
              {status === "success" ? "Opening Mail..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        /* Optimization: transform3d triggers hardware acceleration */
        @keyframes entryMobile {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes entryLeftDesktop {
          from { opacity: 0; transform: translate3d(-40px, 0, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes entryRightDesktop {
          from { opacity: 0; transform: translate3d(40px, 0, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -10px, 0); }
        }

        .animate-entry-left, .animate-entry-right {
          animation: entryMobile 0.5s ease-out forwards;
          will-change: transform, opacity;
        }

        @media (min-width: 768px) {
          .animate-entry-left { animation-name: entryLeftDesktop; }
          .animate-entry-right { animation-name: entryRightDesktop; }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
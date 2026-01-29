import { useState, useEffect, useRef } from "react";
import ParticlesBackground from "../components/ParticlesBackground.jsx";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", idea: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const { left, top } = sectionRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - left, y: e.clientY - top });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
      className="w-full min-h-screen relative bg-slate-50 dark:bg-[#050505] overflow-hidden py-20 px-6 md:px-20 flex items-center justify-center transition-colors duration-500"
    >
      <ParticlesBackground />

      {/* Interactive Background Glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-30 dark:opacity-20 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.15), transparent 80%)`
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-32">
        
        {/* Left Side: Enhanced Tech Orb & Copy */}
        <div className={`w-full md:w-1/2 flex flex-col items-center md:items-start transform-gpu ${isVisible ? 'animate-entry-left' : 'opacity-0'}`}>
          <div className="relative w-72 h-72 md:w-[500px] md:h-[500px] flex items-center justify-center">
            
            {/* Ambient Background Glow */}
            <div className="absolute w-[150%] h-[150%] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] animate-pulse-slow"></div>

            {/* Orbiting Tech Bits */}
            <div className="absolute w-full h-full animate-spin-slow">
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full blur-[2px]"></div>
                <div className="absolute bottom-10 right-10 w-2 h-2 bg-purple-500 rounded-full blur-[1px]"></div>
            </div>

            {/* Main Orb Structure */}
            <div className="absolute w-full h-full border-[1px] border-blue-500/20 rounded-full scale-90 md:scale-100"></div>
            <div className="absolute w-full h-full border-t-2 border-b-2 border-blue-500/40 rounded-full animate-spin-slow"></div>
            <div className="absolute w-4/5 h-4/5 border-l-2 border-r-2 border-purple-500/30 rounded-full animate-reverse-spin"></div>
            
            {/* The Core */}
            <div className="relative w-32 h-32 md:w-56 md:h-56 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(37,99,235,0.4)] group overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 group-hover:scale-125 transition-transform duration-700"></div>
                <span className="text-5xl md:text-8xl relative z-10 animate-float drop-shadow-2xl">⚡</span>
            </div>
          </div>
          
          <div className="mt-12 text-center md:text-left relative">
             <h3 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                LET'S <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-400 animate-gradient-x">CONNECT.</span>
             </h3>
             <p className={`text-slate-600 dark:text-slate-400 mt-6 text-lg md:text-xl font-medium max-w-sm transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Have a vision? Let's build the architecture of your next big success.
             </p>
          </div>
        </div>

        {/* Right Side: High-End Contact Form */}
        <div className={`w-full md:w-1/2 relative group ${isVisible ? 'animate-entry-right' : 'opacity-0'} transform-gpu`}>
          
          {/* Form Background Layers */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.6rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative p-8 md:p-12 rounded-[2.5rem] border border-white/20 dark:border-white/10 
            bg-white/80 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl shadow-2xl overflow-hidden">
            
            {/* Internal Decorative Light */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>

            <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white flex items-center gap-4">
               Message Hub <div className="h-[2px] w-12 bg-blue-600/50"></div>
            </h2>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    className="peer w-full p-4 pt-6 rounded-2xl bg-slate-100/50 dark:bg-white/5 border border-transparent focus:border-blue-500/50 text-slate-900 dark:text-white outline-none transition-all"
                  />
                  <label className="absolute left-4 top-4 text-slate-500 transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">Full Name</label>
              </div>
              
              <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full p-4 pt-6 rounded-2xl bg-slate-100/50 dark:bg-white/5 border border-transparent focus:border-blue-500/50 text-slate-900 dark:text-white outline-none transition-all"
                  />
                  <label className="absolute left-4 top-4 text-slate-500 transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">Email Address</label>
              </div>

              <div className="relative group">
                  <textarea
                    name="idea"
                    required
                    rows={4}
                    placeholder=" "
                    value={formData.idea}
                    onChange={handleChange}
                    className="peer w-full p-4 pt-6 rounded-2xl bg-slate-100/50 dark:bg-white/5 border border-transparent focus:border-blue-500/50 text-slate-900 dark:text-white outline-none transition-all resize-none"
                  />
                  <label className="absolute left-4 top-4 text-slate-500 transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">Tell me about your project...</label>
              </div>

              <button
                type="submit"
                className="group relative mt-4 overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-black py-5 rounded-2xl font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors">
                  {status === "success" ? "Deploying..." : "Transmit Data"} 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes entryMobile {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes entryLeftDesktop {
          from { opacity: 0; transform: translateX(-80px) rotate(-5deg); }
          to { opacity: 1; transform: translateX(0) rotate(0); }
        }

        @keyframes entryRightDesktop {
          from { opacity: 0; transform: translateX(80px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }

        .animate-entry-left {
          animation: entryMobile 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .animate-entry-right {
          animation: entryMobile 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        @media (min-width: 768px) {
          .animate-entry-left { animation-name: entryLeftDesktop; }
          .animate-entry-right { animation-name: entryRightDesktop; }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-move 5s ease infinite;
        }

        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
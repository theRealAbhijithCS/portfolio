import { useState, useEffect, useRef } from "react";
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import Astra from "../assets/Astra.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  
  // State to track if the section is in view
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer to trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility state based on whether section is in view
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "idea"];
    const newErrors = {};
    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "Fill this field")
    );
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const subject = encodeURIComponent(`New Project Inquiry from Portfolio`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Project Idea:\n${formData.idea}`
    );

    const recipientEmail = "abhijithcs200@gmail.com";
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    setFormData({ name: "", email: "", idea: "" });
    setStatus("success");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full min-h-screen relative bg-gray-50 dark:bg-black overflow-hidden text-gray-900 dark:text-white py-20 px-6 md:px-20 flex flex-col items-center justify-center transition-colors duration-500"
    >
      <ParticlesBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        
        {/* Left Image Section */}
        <div className={`w-full md:w-1/2 flex justify-center items-center ${isVisible ? 'animate-entry-left' : 'opacity-0'}`}>
          <img
            src={Astra}
            alt="Contact"
            className="w-60 md:w-140 max-w-full h-auto object-contain animate-float"
          />
        </div>

        {/* Right Side Contact Form */}
        <div className={`w-full md:w-1/2 bg-white/50 dark:bg-white/5 p-6 md:p-8 rounded-2xl shadow-lg border border-black/10 dark:border-white/10 ${isVisible ? 'animate-entry-right' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Let’s Work Together</h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 rounded-md bg-white dark:bg-white/10 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 rounded-md bg-white dark:bg-white/10 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">
                Idea <span className="text-red-500">*</span>
              </label>
              <textarea
                name="idea"
                rows={4}
                placeholder="Enter your idea"
                value={formData.idea}
                onChange={handleChange}
                className="p-3 rounded-md bg-white dark:bg-white/10 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.idea && <p className="text-red-500 text-xs mt-1">{errors.idea}</p>}
            </div>

            {status && (
              <p className={`text-sm text-center ${status === "success" ? "text-green-500" : "text-red-500"}`}>
                {status === "success" ? "Opening your email client... ✅" : "Something went wrong ❌"}
              </p>
            )}

            <button
              disabled={status === "success"}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 px-6 rounded-md font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
            >
              {status === "success" ? "Email Client Opened" : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        /* Mobile: Slide up and fade in */
        @keyframes entryMobile {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Desktop: Slide from left */
        @keyframes entryLeftDesktop {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Desktop: Slide from right */
        @keyframes entryRightDesktop {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .animate-entry-left, .animate-entry-right {
          animation: entryMobile 0.8s ease-out forwards;
        }

        @media (min-width: 768px) {
          .animate-entry-left {
            animation: entryLeftDesktop 0.8s ease-out forwards;
          }
          .animate-entry-right {
            animation: entryRightDesktop 0.8s ease-out forwards;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
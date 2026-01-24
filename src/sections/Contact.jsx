// Importing React's useState hook for managing component state
import { useState } from "react";

// Importing motion component from Framer Motion for animations
import { motion } from "framer-motion";

// Importing Particles Background (same as Home component)
import ParticlesBackground from "../components/ParticlesBackground.jsx";

// Importing the contact image asset
import Astra from "../assets/Astra.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget" && value && !/^\d+$/.test(value)) return;

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

    // Create mailto link with form data
    const subject = encodeURIComponent(`New Project Inquiry from Portfolio`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Project Idea:\n${formData.idea}`
    );

    // Replace with your email address
    const recipientEmail = "abhijithcs200@gmail.com";
    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Reset form
    setFormData({ name: "", email: "", idea: "" });
    setStatus("success");
  };

  return (
    <section
      id="contact" className="w-full min-h-screen relative bg-gray-50 dark:bg-black overflow-hidden text-gray-900 dark:text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10 transition-colors duration-500">
      {/* Particles Background */}
      <ParticlesBackground />



      {/* Contact Section Content */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left Animated Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-72 md:w-140 object-contain"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Right Side Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 bg-transparent dark:bg-white/5 p-8 rounded-2xl shadow-lg border border-black/10 dark:border-white/10"
        >
          <h2 className="text-3xl font-bold mb-6">Let’s Work Together</h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="flex flex-col">
              <label className="mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-gray-50 dark:bg-white/10 border ${errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-500"
                  } text-gray-900 dark:text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            {/* Email field */}
            <div className="flex flex-col">
              <label className="mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-gray-50 dark:bg-white/10 border ${errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-500"
                  } text-gray-900 dark:text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>


            {/* Idea textarea */}
            <div className="flex flex-col">
              <label className="mb-1">
                Idea <span className="text-red-500">*</span>
              </label>

              <textarea
                name="idea"
                rows={5}
                placeholder="Enter your idea"
                value={formData.idea}
                onChange={handleChange}
                className={`p-3 rounded-md bg-gray-50 dark:bg-white/10 border ${errors.idea ? "border-red-500" : "border-gray-200 dark:border-gray-500"
                  } text-gray-900 dark:text-white focus:outline-none focus:border-blue-500`}
              />

              {errors.idea && (
                <p className="text-red-500 text-xs">{errors.idea}</p>
              )}
            </div>

            {/* Status message */}
            {status && (
              <p
                className={`text-sm ${status === "success"
                  ? "text-green-400"
                  : status === "error"
                    ? "text-red-400"
                    : "text-yellow-400"
                  }`}
              >
                {status === "success"
                  ? "Opening your email client... ✅"
                  : "Something went wrong ❌"}
              </p>
            )}

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "success"}
              type="submit"
              className="
                bg-blue-600 
                hover:bg-blue-700 
                disabled:opacity-60 disabled:cursor-not-allowed 
                text-white 
                py-3 
                rounded-md 
                font-semibold 
                transition
              "
            >
              {status === "success" ? "Email Client Opened" : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

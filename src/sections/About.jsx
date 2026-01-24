import { motion } from "framer-motion";
import p from "../assets/profile.jpg";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-gray-50 dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-500"
      aria-label="About me"
    >
      {/* ... (background accents can remain or be tuned) ... */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[140px] animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 w-[220px] h-[220px] rounded-full bg-gradient-to-r from-[#00bf8f] to-[#1CD8D2] opacity-10 blur-[100px]" />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">

        {/* Profile header */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Avatar / Card */}
          <motion.div
            className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            aria-hidden="true"
          >
            {/* Replace with your actual avatar image */}
            <img src={p} alt="test" className="w-full h-full object-cover rounded-2xl" />
          </motion.div>

          {/* Name + Role + Bio + CTAs */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
              Abhijith C S
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-gray-700 dark:text-white/90 font-semibold">
              Full Stack Developer
            </p>

            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              I'm an ambitious individual excelling as a Full-stack, Flutter, and Android developer, having completed a Bachelor's degree in Computer Applications (BCA). With a dynamic skill set, I'm committed to crafting cutting-edge solutions and pushing the boundaries of technology in the ever-evolving software development landscape.
            </p>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {[
                { label: "Education", value: "BCA Graduate" },
                { label: "Specialty", value: "Full Stack" },
                { label: "Focus", value: "Backend" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black font-semibold px-5 py-3 hover:opacity-80 transition"
                aria-label="View my projects"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white px-5 py-3 hover:bg-black/10 dark:hover:bg-white/20 transition"
                aria-label="Get in touch"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>

        {/* Body copy only — removed skills chip grid */}
        <div className="grid md:grid-cols-1">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              About Me
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
              Currently pursuing my Master's in Computer Applications (MCA), I'm dedicated to advancing my expertise in full-stack development with a particular emphasis on backend technologies. My journey combines academic excellence with practical application in Flutter and Android development.
            </p>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-base sm:text-lg">
              I specialize in creating robust backend architectures and scalable solutions that power modern applications.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


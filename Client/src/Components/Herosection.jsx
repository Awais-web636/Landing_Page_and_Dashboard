import { FaArrowRight } from "react-icons/fa"; // Importing the arrow icon from react-icons
import { motion } from "framer-motion"; // Importing motion from framer-motion
import pic9 from "../assets/pic9.jpg"; // Importing the background image

export default function HeroSection() {
  // Define animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="home" className="relative bg-gradient-to-r from-blue-400 to-indigo-600 text-white py-20 md:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${pic9})` }} // Set the background image here
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            Transforming Ideas Into Reality
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-blue-100"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We build innovative digital solutions that help businesses grow and succeed in the modern world.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="bg-white text-blue-600 cursor-pointer hover:bg-blue-50 py-3 px-6 rounded-lg text-lg font-semibold"
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="border border-white text-white cursor-pointer hover:bg-white/10 py-3 px-6 rounded-lg text-lg font-semibold flex items-center"
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Learn More <FaArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
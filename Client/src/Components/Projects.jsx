import { FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion from framer-motion
import pic1 from '../assets/pic1.jpg';
import pic2 from '../assets/pic2.jpg';
import pic3 from '../assets/pic3.jpg';
import pic4 from '../assets/pic4.jpg';

export default function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: pic1,
      description: "A fully responsive e-commerce platform with payment integration and inventory management.",
    },
    {
      title: "Fitness Tracking App",
      category: "Mobile Development",
      image: pic2,
      description: "A mobile application that helps users track their fitness goals and daily activities.",
    },
    {
      title: "Corporate Branding",
      category: "UI/UX Design",
      image: pic3,
      description: "Complete brand identity design for a tech startup, including logo, website, and marketing materials.",
    },
    {
      title: "Analytics Dashboard",
      category: "Web Application",
      image: pic4,
      description: "Real-time analytics dashboard for monitoring business performance and user engagement.",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a look at some of our recent projects and see how we've helped our clients achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group overflow-hidden rounded-lg shadow-md bg-white"
              initial={{ opacity: 0, y: 20 }} // Initial state
              animate={{ opacity: 1, y: 0 }} // Animate to this state
              transition={{ duration: 0.5, delay: index * 0.1 }} // Transition settings
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }} // Hover effect
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <button className="text-white border cursor-pointer border-white hover:bg-white/20 w-full p-2 rounded">
                      View Project <FaExternalLinkAlt className="ml-2 inline h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-medium mb-2">{project.category}</div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg"
            initial={{ scale: 1 }} // Initial scale
            whileHover={{ scale: 1.1 }} // Scale up on hover
            transition={{ duration: 0.2 }} // Transition settings
          >
            View All Projects <FaExternalLinkAlt className="ml-2 inline h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
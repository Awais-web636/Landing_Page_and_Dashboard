import { FaCode, FaMobileAlt, FaPaintBrush, FaChartBar, FaGlobe, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      icon: <FaCode className="h-10 w-10 text-blue-600" />,
      title: "Web Development",
      description: "We build responsive, fast, and user-friendly websites using the latest technologies.",
    },
    {
      icon: <FaMobileAlt className="h-10 w-10 text-blue-600" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
    },
    {
      icon: <FaPaintBrush className="h-10 w-10 text-blue-600" />,
      title: "UI/UX Design",
      description: "User -centered design that enhances user experience and increases engagement.",
    },
    {
      icon: <FaChartBar className="h-10 w-10 text-blue-600" />,
      title: "Digital Marketing",
      description: "Strategic marketing solutions to help your business reach its target audience.",
    },
    {
      icon: <FaGlobe className="h-10 w-10 text-blue-600" />,
      title: "SEO Optimization",
      description: "Improve your website's visibility and ranking on search engines.",
    },
    {
      icon: <FaShieldAlt className="h-10 w-10 text-blue-600" />,
      title: "Cybersecurity",
      description: "Protect your digital assets with our comprehensive security solutions.",
    },
  ];

  return (
    <motion.section
      id="services"
      className="py-20 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a wide range of digital services to help your business grow and succeed in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }} // Scale up on hover
              transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
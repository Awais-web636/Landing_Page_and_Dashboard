import { MdCheckCircle } from "react-icons/md"; // Correct import
import pic5 from '../assets/pic5.jpg';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "250+", label: "Projects Completed" },
    { value: "50+", label: "Team Members" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="about"
      className="py-20 bg-gray-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <img
                src={pic5}
                alt="About Our Company"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Our Company</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2013, our company has been at the forefront of digital innovation, helping businesses of all
              sizes transform their ideas into reality. We are a team of passionate designers, developers, and digital
              strategists dedicated to delivering exceptional results.
            </p>
            <p className="text-gray-600 mb-8">
              Our mission is to empower businesses with cutting-edge digital solutions that drive growth, enhance user
              experience, and create lasting value. We believe in building long-term relationships with our clients
              based on trust, transparency, and mutual success.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Innovative Solutions",
                  description: "We leverage the latest technologies to create innovative solutions that solve real-world problems."
                },
                {
                  title: "Client-Centric Approach",
                  description: "We put our clients at the center of everything we do, ensuring their needs and goals are met."
                },
                {
                  title: "Quality Assurance",
                  description: "We maintain the highest standards of quality in all our deliverables, ensuring exceptional results."
                }
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants} initial="hidden" animate="visible">
                  <div className="flex items-start">
                    <MdCheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      <span className="font-semibold">{item.title}</span> - {item.description}
                    </p>
                  </div>
                </motion.div>
 ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
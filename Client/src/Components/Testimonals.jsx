import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import pic6 from '../assets/pic6.jpeg';
import pic7 from '../assets/pic7.jpeg';
import pic8 from '../assets/pic8.jpeg';

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "Working with this team was an absolute pleasure. They delivered our project on time and exceeded our expectations in terms of quality and functionality.",
      author: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      image: pic6,
    },
    {
      quote:
        "The team's attention to detail and commitment to excellence is unmatched. They transformed our outdated website into a modern, user-friendly platform that has significantly increased our conversion rates.",
      author: "Michael Chen",
      position: "Marketing Director, Global Solutions",
      image: pic7,
    },
    {
      quote:
        "I've worked with many development teams in the past, but none have been as responsive, professional, and skilled as this team. They truly understand our business needs and deliver solutions that drive results.",
      author: "Emily Rodriguez",
      position: "Product Manager, InnovateTech",
      image: pic8,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white text-gray-800 p-8 rounded-lg shadow-md relative"
              initial={{ opacity: 0, y: 20 }} // Initial state
              animate={{ opacity: 1, y: 0 }} // Animate to this state
              transition={{ duration: 0.5, delay: index * 0.2 }} // Transition settings
            >
              <FaQuoteLeft className="absolute top-4 right-4 h-10 w-10 text-blue-100" />
              <p className="mb-6 text-gray-600 relative z-10">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
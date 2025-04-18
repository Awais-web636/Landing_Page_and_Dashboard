import { MdMail, MdPhone, MdLocationOn } from "react-icons/md"
import { FaPaperPlane } from "react-icons/fa"

export default function ContactSection() {
  return (
    <section  className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question or want to work together? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input id="name" type="text" placeholder="John Doe" className="border border-gray-300 rounded-md p-2 w-full" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input id="email" type="email" placeholder="john@example.com" className="border border-gray-300 rounded-md p-2 w-full" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input id="subject" type="text" placeholder="How can we help you?" className="border border-gray-300 rounded-md p-2 w-full" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea id="message" placeholder="Your message here..." className="border border-gray-300 rounded-md p-2 w-full min-h-[150px]" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md flex items-center justify-center">
                  Send Message <FaPaperPlane className="ml-2 h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-600 mb-8">
                Feel free to reach out to us through any of the following channels. We're always here to help and answer
                any questions you may have.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MdLocationOn className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold">Our Location</h4>
                    <p className="text-gray-600">123 Business Avenue, Tech District, City, Country</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MdPhone className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold">Phone Number</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MdMail className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold">Email Address</h4>
                    <p className=" text-gray-600">info@companyname.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gray-50 p-8 rounded-lg">
              <h4 className="font-bold text-xl mb-4">Business Hours</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
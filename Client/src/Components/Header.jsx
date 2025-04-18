import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { Link as ScrollLink } from "react-scroll"
import { Link as RouterLink, useLocation } from "react-router-dom"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Home", to: "home" },
    { name: "Services", to: "services" },
    { name: "Projects", to: "projects" },
    { name: "About", to: "about" },
    { name: "Blogs", to: "blogs" },
    { name: "Testimonials", to: "testimonials" },
    { name: "Contact", to: "contact" },
  ]

  const renderNavItems = () => {
    return navItems.map((item) => {
      if (isHomePage) {
        return (
          <ScrollLink
            key={item.name}
            to={item.to}
            className="text-gray-600 text-[15px] cursor-pointer hover:text-blue-600 transition-colors duration-300"
            smooth={true}
            duration={500}
            offset={-64}
          >
            {item.name}
          </ScrollLink>
        )
      } else {
        return (
          <RouterLink
            key={item.name}
            to={`/#${item.to}`}
            className="text-gray-600 text-[15px] cursor-pointer hover:text-blue-600 transition-colors duration-300"
          >
            {item.name}
          </RouterLink>
        )
      }
    })
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <RouterLink to="/" className="text-2xl font-bold text-gray-800">
          Digital <span className="text-blue-600">Ideas</span>
        </RouterLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">{renderNavItems()}</nav>

        {/* Login Button */}
        <RouterLink
          to="/login"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Login
        </RouterLink>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white py-4 px-4 shadow-md">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) =>
              isHomePage ? (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300"
                  onClick={toggleMenu}
                  smooth={true}
                  duration={500}
                  offset={-64}
                >
                  {item.name}
                </ScrollLink>
              ) : (
                <RouterLink
                  key={item.name}
                  to={`/#${item.to}`}
                  className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  {item.name}
                </RouterLink>
              )
            )}

            <RouterLink
              to="/login"
              onClick={() => {
                toggleMenu()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300"
            >
              Login
            </RouterLink>
          </div>
        </nav>
      )}
    </header>
  )
}

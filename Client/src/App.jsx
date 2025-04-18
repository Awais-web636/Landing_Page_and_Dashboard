import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Element } from 'react-scroll';

import Header from './Components/Header';
import Herosection from './Components/Herosection';
import Services from './Components/Services';
import Projects from './Components/Projects';
import About from './Components/About';
import Blogs from './Components/Blogs';
import Testimonials from './Components/Testimonals';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import BlogDetail from './Components/BlogDetail';

function HomePage() {
  return (
    <>
      <Header />
      <Element name="home"><Herosection /></Element>
      <Element name="services"><Services /></Element>
      <Element name="projects"><Projects /></Element>
      <Element name="about"><About /></Element>
      <Element name="blogs"><Blogs /></Element>
      <Element name="testimonials"><Testimonials /></Element>
      <Element name="contact"><Contact /></Element>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/blog/:id" element={<BlogDetail/>} />
    </Routes>
  );
}

export default App;

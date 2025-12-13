import React, { useState, useEffect, useRef } from 'react';
import { Phone,Activity,Cog, Sliders, RefreshCw, Target, MapPin, Clock, Star, ArrowRight, Menu, X, Wrench, ShieldCheck, Truck,Disc, Instagram, MessageCircle, ChevronLeft, ChevronRight, Car } from 'lucide-react';
import { Icon } from 'lucide-react';
// import { Cog, Sliders, RefreshCw } from '@lucide/lab';
/**
 * Hook for intersection observer animations
 * Triggers a fade-in effect when elements come into view
 */
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return [domRef, isVisible];
};

/**
 * Reusable Reveal Component
 */
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal();
  const delayClass = delay === 1 ? 'delay-100' : delay === 2 ? 'delay-200' : delay === 3 ? 'delay-300' : '';
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setIsOpen(false);  // ← Added this line
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="z-50">
        <img 
          src="https://res.cloudinary.com/dh4m8u7in/image/upload/v1764446489/Logo_dlvzsv.jpg" 
          alt="PB Tyres Logo" 
          className="h-20 w-auto"
        />
      </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm uppercase tracking-widest hover:text-red-600 transition-colors ${scrolled ? 'text-gray-800' : 'text-white/90'}`}
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-4 pl-6 border-l border-gray-300">
            <a 
              href="https://www.instagram.com/pb.tyres/" 
              target="_blank" 
              rel="noreferrer"
              className={`p-2 rounded-full transition-colors hover:bg-red-600 hover:text-white ${scrolled ? 'text-gray-800' : 'text-white/90'}`}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://wa.me/447961564194" 
              target="_blank" 
              rel="noreferrer"
              className={`p-2 rounded-full transition-colors hover:bg-green-500 hover:text-white ${scrolled ? 'text-gray-800' : 'text-white/90'}`}
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>
          <a 
            href="tel:07961564194" 
            className={`px-6 py-2 border text-xs uppercase tracking-widest transition-all ${
              scrolled 
                ? 'border-black text-black hover:bg-black hover:text-white' 
                : 'border-white text-white hover:bg-white hover:text-black'
            }`}
          >
            Call Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`md:hidden z-50 focus:outline-none ${scrolled || isOpen ? 'text-black' : 'text-white'}`}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-3xl font-serif text-black hover:text-red-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex gap-6 mt-8">
            <a 
              href="https://www.instagram.com/pb.tyres/" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="https://wa.me/447961564194" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={24} />
            </a>
          </div>
          <a href="tel:07961564194" className="mt-8 px-8 py-3 bg-black text-white text-sm uppercase tracking-widest">
            07961 564194
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    "https://res.cloudinary.com/dh4m8u7in/image/upload/v1764441661/Background1_azmj95.png",
    "https://res.cloudinary.com/dh4m8u7in/image/upload/v1765667494/HDCAR123jpg_ajaq3y.jpg",
    "https://res.cloudinary.com/dh4m8u7in/image/upload/v1764452107/RAck_ontqm6.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slideshow Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-60' : 'opacity-0'
          }`}
        >
          <img 
            src={slide} 
            alt={`Slide ${index + 1}`} 
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
        <Reveal>
          <p className="text-white/80 text-sm md:text-base uppercase tracking-[0.3em] mb-4">
            Unit 6 Summit Rd, Potters Bar
          </p>
        </Reveal>
        
        <Reveal delay={1}>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white font-medium leading-none mb-8">
            Precision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Motion.</span>
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 max-w-2xl">
            <p className="text-gray-300 text-lg leading-relaxed">
              Experience the highest rated tyre service in Potters Bar. 
              We combine speed, precision, and honest pricing to keep you safe on the road.
            </p>
            <a 
              href="#contact" 
              className="group flex items-center gap-4 text-white hover:text-red-500 transition-colors duration-300"
            >
              <span className="text-sm uppercase tracking-widest border-b border-white group-hover:border-red-500 pb-1">
                Visit Workshop
              </span>
              <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </Reveal>
      </div>

      {/* Floating Info */}
      <div className="absolute bottom-12 right-6 md:right-12 hidden md:block text-right">
        <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Google Rating</p>
        <div className="flex items-center gap-2 justify-end text-white">
          <span className="text-3xl font-serif">5.0</span>
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
        </div>
        <p className="text-white/40 text-xs mt-1">Based on 199+ Reviews</p>
      </div>

      {/* Slideshow Controls - Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Slideshow Controls - Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="bg-black text-white py-24 border-t border-white/10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <Reveal>
          <h3 className="text-4xl font-serif mb-2">199+</h3>
          <p className="text-gray-500 text-sm uppercase tracking-widest">5-Star Reviews</p>
        </Reveal>
        <Reveal delay={1}>
          <h3 className="text-4xl font-serif mb-2">100%</h3>
          <p className="text-gray-500 text-sm uppercase tracking-widest">Satisfaction Guarantee</p>
        </Reveal>
        <Reveal delay={2}>
          <h3 className="text-4xl font-serif mb-2">Walk-ins <span className="text-lg text-gray-400">Welcome</span></h3>
          <p className="text-gray-500 text-sm uppercase tracking-widest">No Appointment Needed</p>
        </Reveal>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "New & Part Worn Tyres",
      desc: "Premium brands and high-quality budget options tailored to your vehicle.",
      icon: <Disc className="w-8 h-8 mb-6 text-gray-700" />
    },
    {
      title: "Precision Balancing",
      desc: "State-of-the-art equipment ensures your drive is smooth and vibration-free.",
      icon: <Activity className="w-8 h-8 mb-6 text-gray-700" />
    },
    {
      title: "Puncture Repairs",
      desc: "Fast, safety-compliant repairs to get you back on the road instantly.",
      icon: <Wrench className="w-8 h-8 mb-6 text-gray-700" />
    },
    {
      title: "Tracking (HUNTER)",
      desc: "Professional wheel alignment using advanced HUNTER technology for perfect handling.",
      icon: <Target className="w-8 h-8 mb-6 text-gray-700" />
    },
    {
      title: "Alloy Wheels",
      desc: "Wide selection of alloy wheels to enhance your vehicle's style and performance.",
      icon: <Cog className="w-8 h-8 mb-6 text-gray-700" />
    },
    {
      title: "Spacers",
      desc: "Expert installation of wheel spacers for the perfect stance and clearance.",
      icon: <Sliders className="w-8 h-8 mb-6 text-gray-700" />
    },
    {
      title: "Wheel Refurbishment",
      desc: "Professional repair and refinishing of damaged alloy wheels to like-new condition.",
      icon: <RefreshCw className="w-8 h-8 mb-6 text-gray-700" />
    }
  ];

  return (
    <section id="services" className="py-32 bg-neutral-50">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <h2 className="text-4xl md:text-6xl font-serif text-black leading-tight">
              Our <br /> Expertise
            </h2>
            <p className="text-gray-500 max-w-md mt-6 md:mt-0">
              We don't just change tyres; we ensure your vehicle's safety and performance through meticulous attention to detail.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Reveal key={index} delay={index} className="h-full">
              <div className="bg-white p-10 h-full border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="transition-colors group-hover:text-red-600">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif mb-4 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {service.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/2">
            <Reveal>
              <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                 <img 
                  src="https://res.cloudinary.com/dh4m8u7in/image/upload/v1764452048/bently_h83stt.png" 
                  alt="Mechanic working" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-in-out"
                />
              </div>
            </Reveal>
          </div>
          <div className="w-full lg:w-1/2 space-y-12">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-serif leading-none">
                Driven by <br />
                <span className="italic text-gray-400">Quality.</span>
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                <p>
                  At Potters Bar Tyres, we believe that tyre safety shouldn't be complicated. Located conveniently on Summit Road, we have built a reputation for excellence that speaks for itself.
                </p>
                <p>
                  With over 199 five-star reviews, our community trusts us because we value honesty over sales. We will never sell you a tyre you don't need.
                </p>
                <div className="pt-8">
                   <a href="https://www.google.com/maps/dir//Potters+Bar+Tyres+Unit+6+Summit+Rd+Potters+Bar+EN6+3QW" target="_blank" rel="noreferrer" className="inline-block border-b border-black pb-1 uppercase text-xs tracking-widest hover:text-red-600 hover:border-red-600 transition-colors">
                    Get Directions
                   </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      {/* Decorative Text Background */}
      <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[20rem] font-bold font-serif whitespace-nowrap">TYRES</span>
      </div>
    </section>
  );
};

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="mb-16 text-center">
            <div className="flex justify-center gap-1 mb-4 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
            </div>
            <h2 className="text-3xl md:text-5xl font-serif">"Excellent Service"</h2>
            <p className="mt-4 text-gray-500 uppercase tracking-widest text-xs">Based on 199+ Google Reviews</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal>
            <div className="bg-neutral-900 p-8 border border-neutral-800">
              <p className="text-gray-300 italic mb-6">"Very professional, highly recommend. Identified faulty valve and replaced it very quickly. Excellent value."</p>
              <p className="text-white font-serif text-sm">— Julian C.</p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="bg-neutral-900 p-8 border border-neutral-800">
              <p className="text-gray-300 italic mb-6">"Went in for a tear in my tyre, he noticed a bulge in another so got both replaced. Good value, much cheaper than others."</p>
              <p className="text-white font-serif text-sm">— Lorna H.</p>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="bg-neutral-900 p-8 border border-neutral-800">
              <p className="text-gray-300 italic mb-6">"Legendary service. Very quick, shop was very clean for a tyre garage and the prices were dirt cheap for the quality."</p>
              <p className="text-white font-serif text-sm">— Adam K.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-5xl font-serif mb-8">Visit Us</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <MapPin className="w-6 h-6 mt-1 text-red-600" />
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Address</h4>
                    <p className="text-gray-600 text-lg">Unit 6 Summit Rd,<br />Potters Bar EN6 3QW</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <Phone className="w-6 h-6 mt-1 text-red-600" />
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Contact</h4>
                    <p className="text-gray-600 text-lg hover:text-red-600 transition-colors">
                      <a href="tel:07961564194">07961 564194</a>
                    </p>
                    <p className="text-gray-600 text-lg hover:text-red-600 transition-colors">
                      <a href="tel:02031619863">0203 161 9863</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <Clock className="w-6 h-6 mt-1 text-red-600" />
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Hours</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li className="flex justify-between w-48"><span>Mon - Fri</span> <span>08:00 - 18:00</span></li>
                      <li className="flex justify-between w-48"><span>Saturday</span> <span>08:00 - 16:00</span></li>
                      <li className="flex justify-between w-48 text-red-500"><span>Sunday</span> <span>Closed</span></li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-6 pt-4">
                  <div className="flex flex-col gap-4 w-full">
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Follow Us</h4>
                    <div className="flex gap-4">
                      <a 
                        href="https://www.instagram.com/pb.tyres/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded hover:opacity-90 transition-opacity"
                      >
                        <Instagram size={18} />
                        <span className="text-sm uppercase tracking-widest">Instagram</span>
                      </a>
                      <a 
                        href="https://wa.me/447961564194" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      >
                        <MessageCircle size={18} />
                        <span className="text-sm uppercase tracking-widest">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="h-96 lg:h-auto w-full bg-gray-100 relative">
            <Reveal delay={1} className="h-full w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2472.5784141669455!2d-0.19973779999999997!3d51.7041596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48763dda48c202a3%3A0x374e6681c59e3a11!2sPotters%20Bar%20Tyres!5e0!3m2!1sen!2suk!4v1764457434386!5m2!1sen!2suk" 
                width="100%" 
                height="100%" 
                style={{border: 0, filter: ' invert(0%) contrast(80%)'}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Potters Bar Tyres Location"
              ></iframe>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-2xl font-serif font-bold">PB<span className="text-red-600">.</span>Tyres</p>
        <div className="flex gap-6">
          <a 
            href="https://www.instagram.com/pb.tyres/" 
            target="_blank" 
            rel="noreferrer"
            className="text-gray-400 hover:text-red-600 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a 
            href="https://wa.me/447961564194" 
            target="_blank" 
            rel="noreferrer"
            className="text-gray-400 hover:text-green-500 transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
        </div>
        <p className="text-xs text-gray-500 uppercase tracking-widest">© {new Date().getFullYear()} Potters Bar Tyres. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-500 selection:text-white">
      <Navigation />
      <Hero />
      <Stats />
      <Services />
      <AboutSection />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
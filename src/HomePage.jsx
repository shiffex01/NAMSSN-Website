import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // ensure lucide-react is installed


const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ✅ NAVBAR */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm shadow-lg z-50">
        <div className="flex justify-between items-center md:px-20 px-5 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="./logo.png" alt="NAMSSN" className="w-10 h-10" />
            <h1 className="font-extrabold text-xs sm:text-sm md:text-base text-[#041b04] uppercase leading-tight">
              National Association of Mathematics <br />
              Science Students of Nigeria (NAMSSN)
            </h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 font-semibold text-[#041b04]">
            <Link to="/">Home</Link>
            <Link to="/student_login">Login</Link>
            <Link to="/student_signup">Sign Up</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/about">About Us</Link>
          </nav>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden text-[#041b04]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="flex flex-col bg-[#041b04] text-white space-y-4 py-6 px-6 font-semibold md:hidden transition-all duration-300">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/student_login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/student_signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          </nav>
        )}
      </header>

      {/* ✅ HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center text-center mt-36 px-4 md:px-20">
        <div className="bg-gray-200/95 w-full rounded-xl p-6 md:p-10 mb-14 shadow-lg">
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#041b04] mb-6">
            NAMSSN RESULT PORTAL
          </h2>
          <p className="text-[#041b04] italic text-base md:text-2xl font-semibold">
            Access your result and resolve issues easily
          </p>
        </div>

        {/* Login Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-14 mb-16">
          <Link to="/student_login" className="home_btn w-60 text-center">
            Login as Student
          </Link>
          <Link to="/admin_login" className="home_btn w-60 text-center">
            Login as Admin
          </Link>
        </div>

        {/* Features */}
        <section className="w-full text-center">
          <hr className="border border-white" />
          <h3 className="text-2xl md:text-3xl font-extrabold text-white my-4">
            Features
          </h3>
          <hr className="border border-[#ffffff] mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="home_card">
              <h4>Check Dashboard</h4>
              <p>View all your result summaries and stats.</p>
            </div>
            <div className="home_card">
              <h4>Submit Complaints</h4>
              <p>Report any errors or issues directly to admins.</p>
            </div>
            <div className="home_card">
              <h4>Track Status</h4>
              <p>Follow up on your complaints and progress.</p>
            </div>
          </div>
        </section>
      </main>

      {/* ✅ FOOTER */}
      <footer className="bg-[#041b04] text-gray-300 text-sm py-10 px-4 mt-auto shadow-lg">
        <div className="flex flex-col md:flex-row justify-around text-center md:text-left space-y-6 md:space-y-0">
          <div>
            <h5 className="font-bold mb-1 text-white">FAQ</h5>
            <p>Find answers to your common questions.</p>
          </div>
          <div>
            <h5 className="font-bold mb-1 text-white">Support</h5>
            <p>namssnresult@gmail.com</p>
          </div>
          <div>
            <h5 className="font-bold mb-1 text-white">Contact</h5>
            <p>08020239592</p>
            <p>09159155815</p>
          </div>
        </div>
        <p className="text-center mt-6 text-gray-400">
          © {new Date().getFullYear()} NAMSSN. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;

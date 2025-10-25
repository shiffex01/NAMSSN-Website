import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/background.png')" }}
    >
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-h-screen md:w-4/5 lg:w-3/4 w-5/6 bg-white">
      {/* Navbar */}
      <header className="flex md:gap-0 gap-4 md:flex-row flex-col fixed z-50 w-full left-0 top-0 md:items-center md:justify-between md:px-20 px-4 lg:px-40 py-4 bg-white text-[#041b04] shadow-xl">
        <nav className="md:hidden flex justify-end space-x-2 text-sm font-semibold">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
        </nav>
        <div className="flex items-center space-x-3">
          <img src='./logo.png' alt="NAMSSN" className="md:w-12 w-8 h-8 md:h-12" />
          <h1 className="font-bold md:font-black md:text-lg uppercase">
            National Association of Mathematics <br /> Science Students of Nigeria (NAMSSN)
          </h1>
        </div>
        <nav className="md:flex hidden space-x-6 font-semibold">
          <Link to="/">Home</Link>
          <Link to="/student_login">Login</Link>
          <Link to="/student_signup">Sign Up</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative top-[120px] md:top-[100px]">
        <main className="flex flex-col items-center justify-center flex-1 text-center">
          <div className="bg-gray-200 w-full mb-8 md:mb-14 lg:p-8 p-4">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#041b04] mb-16">
              NAMSSN RESULT PORTAL
            </h2>
            <p className="text-[#041b04] italic text-sm font-black md:text-xl lg:text-2xl">
              Access your result and resolve issues easily
            </p>
          </div>

        <div className="md:px-20">
        {/* Login Buttons */}
        <div className="flex flex-col lg:gap-14 gap-6 sm:w-full md:flex-row justify-between items-center mb-14 md:mb-20">
          <Link
            to="/student_login"
            className="home_btn"
          >
            Login as Student
          </Link>
          <Link
            to="/admin_login"
            className="home_btn"
          >
            Login as Admin
          </Link>
        </div>

        {/* Features */}
        <section className="text-center ">
          <hr className="border-1 border-[#041b04]"/>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#041b04] my-1 md:my-2">Features</h3>
          <hr className="border-1 border-[#041b04] mb-5 md:mb-10"/>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </div>
      </main>
      </div>
      </div>
    </div>
    {/* Footer */}
      <footer className="bg-[#020a02] text-gray-300 text-sm py-6 pt-10">
        <div className="flex flex-col md:flex-row justify-around text-center md:text-left">
          <div>
            <h5 className="font-bold mb-1">FAQ</h5>
          </div>
          <div>
            <h5 className="font-bold mb-1">Support:</h5>
            <p>namssnresult@gmail.com</p>
          </div>
          <div>
            <h5 className="font-bold mb-1">Contact:</h5>
            <p>08020239592</p>
            <p>09159155815</p>
          </div>
        </div>
        <p className="text-center mt-4 text-gray-500">
          © Copyright reserved. NAMSSN
        </p>
      </footer>
    </div>
  );
};

export default HomePage;

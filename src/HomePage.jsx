import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#041b04] text-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 bg-white text-[#041b04] shadow-md">
        <div className="flex items-center space-x-3">
          <img src='./logo.png' alt="NAMSSN" className="w-12 h-12" />
          <h1 className="font-black text-lg uppercase">
            National Association of Mathematics <br /> Science Students of Nigeria (NAMSSN)
          </h1>
        </div>
        <nav className="space-x-6 font-semibold">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-600 mb-3">
          NAMSSN RESULT PORTAL
        </h2>
        <p className="text-gray-200 mb-8">
          Access your result and resolve issues easily
        </p>

        {/* Login Buttons */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <Link
            to="/student-login"
            className="bg-green-700 hover:bg-green-900 text-white px-8 py-3 rounded-lg shadow-md transition"
          >
            Login as Student
          </Link>
          <Link
            to="/admin-login"
            className="bg-green-700 hover:bg-green-900 text-white px-8 py-3 rounded-lg shadow-md transition"
          >
            Login as Admin
          </Link>
        </div>

        {/* Features */}
        <section className="text-center">
          <h3 className="text-2xl font-bold mb-6">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-800 hover:bg-green-900 rounded-lg p-6 transition transform hover:scale-105 cursor-pointer">
              <h4 className="text-xl font-bold mb-2">Check Dashboard</h4>
              <p>View all your result summaries and stats.</p>
            </div>
            <div className="bg-green-800 hover:bg-green-900 rounded-lg p-6 transition transform hover:scale-105 cursor-pointer">
              <h4 className="text-xl font-bold mb-2">Submit Complaints</h4>
              <p>Report any errors or issues directly to admins.</p>
            </div>
            <div className="bg-green-800 hover:bg-green-900 rounded-lg p-6 transition transform hover:scale-105 cursor-pointer">
              <h4 className="text-xl font-bold mb-2">Track Status</h4>
              <p>Follow up on your complaints and progress.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#020a02] text-gray-300 text-sm py-6 mt-10">
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

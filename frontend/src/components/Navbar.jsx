import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const links = [
  {
    to: '/admin/upload',
    title: 'Upload',
  },
  {
    to: '/admin',
    title: 'Home',
  },
];



const Navbar = ({ isLoggedIn, userName = 'Kunal Singh', img }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="w-full shadow-lg rounded-lg px-6 py-4 bg-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Avatar & Greeting */}
        <div className="flex items-center gap-4">
          <img src={img} alt="User" className="w-10 h-10 rounded-full object-cover" />
          <h2 className="text-xl lg:text-2xl font-bold">
            Hello, <span>{userName}</span>
          </h2>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link, idx) => (
            <p
              onClick={()=>navigate(link.to)}
              key={`${idx}_${link.title}`}
              className="text-base font-medium hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {link.title}
            </p>
          ))}
          {isLoggedIn && (
            <button className="ml-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-semibold transition-all">
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-3 lg:hidden transition-all">
          {links.map((link, idx) => (
            <a
              href={link.to}
              key={`${idx}_${link.title}`}
              className="text-base font-medium hover:text-indigo-600 transition-colors"
            >
              {link.title}
            </a>
          ))}
          {isLoggedIn && (
            <button className="w-fit mt-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-semibold transition-all">
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

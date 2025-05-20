
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold text-navy-800">
          <span className="text-coral-500">Pen</span>Craft
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-navy-700 hover:text-coral-500 transition-colors">
            Home
          </Link>
          <Link to="/blog" className="text-navy-700 hover:text-coral-500 transition-colors">
            Blog
          </Link>
          <Link to="/about" className="text-navy-700 hover:text-coral-500 transition-colors">
            About
          </Link>
          <Button asChild variant="outline" className="border-coral-500 text-coral-500 hover:bg-coral-50">
            <Link to="/subscribe">Subscribe</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-navy-800"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg animate-fade-in z-40">
          <div className="container mx-auto px-4 py-6 space-y-6 flex flex-col">
            <Link 
              to="/" 
              className="text-lg text-navy-700 hover:text-coral-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className="text-lg text-navy-700 hover:text-coral-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className="text-lg text-navy-700 hover:text-coral-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Button 
              asChild 
              variant="outline" 
              className="border-coral-500 text-coral-500 hover:bg-coral-50 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/subscribe">Subscribe</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

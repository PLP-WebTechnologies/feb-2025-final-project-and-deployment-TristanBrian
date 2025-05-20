
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-9xl font-serif font-bold text-navy-100">404</span>
          <h1 className="text-4xl font-serif font-bold mt-6 mb-4">Page Not Found</h1>
          <p className="text-lg text-navy-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-navy-800 hover:bg-navy-900">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/blog">Browse Articles</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;

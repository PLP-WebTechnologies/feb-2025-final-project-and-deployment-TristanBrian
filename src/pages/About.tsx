
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';
import { authors } from '@/lib/blog-data';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-navy-800 to-navy-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
              About PenCraft
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              We're a team of writers, designers, and developers passionate about sharing insights on design, technology, and digital culture.
            </p>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-8 text-center">Our Mission</h2>
              <p className="text-lg text-navy-700 mb-6">
                At PenCraft, we believe in the power of thoughtful writing to inspire, educate, and connect people. Our mission is to create content that not only informs but transforms how people think about the digital world.
              </p>
              <p className="text-lg text-navy-700 mb-6">
                In a world of clickbait and shallow content, we're dedicated to producing articles with depth, nuance, and practical value. Whether you're a designer, developer, or simply curious about technology, our goal is to provide insights that matter.
              </p>
              <p className="text-lg text-navy-700">
                We're committed to creating a platform where ideas can flourish, expertise can be shared, and where the complex interplay of technology and humanity can be explored with care and creativity.
              </p>
            </div>
          </div>
        </section>
        
        {/* Meet the Team */}
        <section className="py-16 md:py-24 bg-navy-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {authors.map(author => (
                <div key={author.id} className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <img 
                    src={author.avatar} 
                    alt={author.name} 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-navy-50"
                  />
                  <h3 className="text-xl font-serif font-semibold mb-2">{author.name}</h3>
                  <p className="text-navy-600 mb-6">{author.bio}</p>
                  <Button asChild variant="outline" size="sm" className="border-coral-300 text-coral-500 hover:bg-coral-50">
                    <Link to={`/author/${author.id}`}>
                      View Articles
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-navy-50 rounded-xl p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">Quality Over Quantity</h3>
                <p className="text-navy-700">
                  We believe in publishing fewer, more thoughtful pieces rather than flooding our readers with content that doesn't add value.
                </p>
              </div>
              
              <div className="bg-navy-50 rounded-xl p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">Practical Wisdom</h3>
                <p className="text-navy-700">
                  Our content aims to be not just interesting but useful—providing insights you can apply to your work and creative projects.
                </p>
              </div>
              
              <div className="bg-navy-50 rounded-xl p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">Inclusive Perspective</h3>
                <p className="text-navy-700">
                  We strive to represent diverse viewpoints and experiences, recognizing that the best ideas come from varied perspectives.
                </p>
              </div>
              
              <div className="bg-navy-50 rounded-xl p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">Design Excellence</h3>
                <p className="text-navy-700">
                  We believe that how content is presented matters as much as the content itself, and we aim for a reading experience that delights.
                </p>
              </div>
              
              <div className="bg-navy-50 rounded-xl p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">Continuous Learning</h3>
                <p className="text-navy-700">
                  Our team is committed to staying at the forefront of our fields, constantly learning and evolving our understanding.
                </p>
              </div>
              
              <div className="bg-navy-50 rounded-xl p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">Reader Respect</h3>
                <p className="text-navy-700">
                  We respect our readers' time and attention, avoiding clickbait, unnecessary jargon, and manipulative design patterns.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact */}
        <section className="py-16 md:py-24 bg-navy-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you.
            </p>
            <Button asChild size="lg" className="bg-coral-500 hover:bg-coral-600">
              <a href="mailto:hello@pencraft.com">
                Contact Us
              </a>
            </Button>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <NewsletterSignup />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

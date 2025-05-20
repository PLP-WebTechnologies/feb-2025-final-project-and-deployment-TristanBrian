
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedPost from '@/components/FeaturedPost';
import BlogCard from '@/components/BlogCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import HeroCarousel from '@/components/HeroCarousel';
import { getFeaturedPost, getRecentPosts, getAllCategories } from '@/lib/blog-data';
import { ChevronRight } from 'lucide-react';

const Home = () => {
  const featuredPost = getFeaturedPost();
  const recentPosts = getRecentPosts(3);
  const categories = getAllCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Carousel Section - Full Width */}
        <section className="mb-16">
          <HeroCarousel />
        </section>
        
        <div className="container mx-auto px-4 py-8">
          {/* Featured Post */}
          {featuredPost && (
            <section className="mb-16 animate-fade-in">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold inline-block relative after:content-[''] after:block after:w-1/3 after:h-1 after:bg-coral-500 after:mt-2">
                  Editor's Pick
                </h2>
              </div>
              <FeaturedPost 
                id={featuredPost.id}
                title={featuredPost.title}
                excerpt={featuredPost.excerpt}
                category={featuredPost.category}
                imageUrl={featuredPost.imageUrl}
                date={featuredPost.date}
                author={featuredPost.author}
              />
            </section>
          )}
          
          {/* Recent Posts with enhanced styling */}
          <section className="mb-16 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold inline-block relative after:content-[''] after:block after:w-1/3 after:h-1 after:bg-coral-500 after:mt-2">
                Recent Articles
              </h2>
              <Link to="/blog" className="group flex items-center text-navy-600 hover:text-coral-500 font-medium transition-colors">
                View All
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${150 + index * 50}ms` }}>
                  <BlogCard
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    category={post.category}
                    imageUrl={post.imageUrl}
                    author={post.author}
                  />
                </div>
              ))}
            </div>
          </section>
          
          {/* Categories with enhanced styling */}
          <section className="mb-16 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 inline-block relative after:content-[''] after:block after:w-1/3 after:h-1 after:bg-coral-500 after:mt-2">
              Explore by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <Link 
                  key={category} 
                  to={`/blog?category=${category}`}
                  className="group bg-gradient-to-br from-navy-50 to-navy-100 hover:from-navy-100 hover:to-navy-200 p-6 rounded-xl text-center transition-all transform hover:-translate-y-1 shadow-sm hover:shadow-md animate-fade-in"
                  style={{ animationDelay: `${250 + index * 50}ms` }}
                >
                  <h3 className="text-xl font-serif font-semibold text-navy-800 mb-2 group-hover:text-coral-600 transition-colors">
                    {category}
                  </h3>
                  <p className="text-navy-600 text-sm group-hover:text-navy-700 transition-colors">
                    Explore articles about {category.toLowerCase()}
                  </p>
                </Link>
              ))}
            </div>
          </section>
          
          {/* Newsletter */}
          <section className="mb-16 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <NewsletterSignup />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;

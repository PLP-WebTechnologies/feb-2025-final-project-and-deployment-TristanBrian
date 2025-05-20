
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getAllPosts, getPostsByCategory, getAllCategories, searchPosts } from '@/lib/blog-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BlogList = () => {
  const location = useLocation();
  const [posts, setPosts] = useState(getAllPosts());
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getAllCategories();
  
  useEffect(() => {
    // Extract category from URL parameters
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category) {
      setActiveCategory(category);
      setPosts(getPostsByCategory(category));
    } else {
      setActiveCategory('');
      setPosts(getAllPosts());
    }
  }, [location.search]);
  
  const handleCategoryClick = (category: string) => {
    if (category === activeCategory) {
      // If clicking the active category, show all posts
      setActiveCategory('');
      setPosts(getAllPosts());
    } else {
      setActiveCategory(category);
      setPosts(getPostsByCategory(category));
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setPosts(searchPosts(searchQuery));
      setActiveCategory('');
    } else {
      setPosts(getAllPosts());
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-serif font-bold mb-2">The Blog</h1>
          <p className="text-lg text-navy-600 mb-8">Explore our collection of articles and insights</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mb-10">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" className="bg-navy-800 hover:bg-navy-900">
                Search
              </Button>
            </div>
          </form>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Button
              variant={activeCategory === '' ? 'default' : 'outline'}
              onClick={() => {
                setActiveCategory('');
                setPosts(getAllPosts());
              }}
              className={activeCategory === '' ? 'bg-navy-800 hover:bg-navy-900' : ''}
            >
              All
            </Button>
            
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                onClick={() => handleCategoryClick(category)}
                className={activeCategory === category ? 'bg-navy-800 hover:bg-navy-900' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Results count */}
          <p className="text-navy-600 mb-6">
            Showing {posts.length} article{posts.length !== 1 ? 's' : ''}
            {activeCategory && ` in ${activeCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          
          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  category={post.category}
                  imageUrl={post.imageUrl}
                  author={post.author}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-serif mb-4">No articles found</h3>
              <p className="text-navy-600 mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setActiveCategory('');
                  setSearchQuery('');
                  setPosts(getAllPosts());
                }}
              >
                View All Articles
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogList;

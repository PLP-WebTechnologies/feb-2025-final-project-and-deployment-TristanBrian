
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, getRecentPosts } from '@/lib/blog-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { Post } from '@/lib/blog-data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      const foundPost = getPostById(id);
      if (foundPost) {
        setPost(foundPost);
        // Get recent posts but exclude current post
        const recent = getRecentPosts(4).filter(p => p.id !== id);
        setRelatedPosts(recent.slice(0, 3));
        
        // Scroll to top when post changes
        window.scrollTo(0, 0);
      } else {
        // Post not found, redirect to blog list
        navigate('/blog');
      }
    }
  }, [id, navigate]);
  
  if (!post) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Article Header */}
        <div className="relative h-[40vh] md:h-[50vh] mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10" />
          
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-x-0 bottom-0 z-20 container mx-auto px-4 py-8">
            <Link to={`/blog?category=${post.category}`}>
              <Badge className="mb-4 bg-coral-500 hover:bg-coral-600">{post.category}</Badge>
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight max-w-4xl">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-2">
              <div className="flex items-center gap-3">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/50"
                />
                <Link to={`/author/${post.author.id}`} className="font-medium hover:text-white">
                  {post.author.name}
                </Link>
              </div>
              
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="prose" dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
            
            <Separator className="my-10" />
            
            {/* Author Bio */}
            <div className="bg-navy-50 rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-20 h-20 rounded-full object-cover border-4 border-white"
              />
              
              <div>
                <h3 className="text-xl font-serif font-semibold mb-2">{post.author.name}</h3>
                <p className="text-navy-700 mb-4">{post.author.bio}</p>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/author/${post.author.id}`}>
                    View all posts
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-navy-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">More Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(post => (
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
            </div>
          </div>
        )}
        
        {/* Newsletter */}
        <div className="container mx-auto px-4 py-16">
          <NewsletterSignup />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Simple markdown to HTML converter
const markdownToHtml = (markdown: string): string => {
  let html = markdown
    // Headers
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-6">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-4">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-3">$1</h3>')
    
    // Bold and Italic
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    
    // Lists
    .replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-coral-500 hover:text-coral-600">$1</a>')
    
    // Code blocks
    .replace(/```([\s\S]*?)```/gm, '<pre class="bg-navy-50 p-4 rounded-md overflow-x-auto my-6"><code>$1</code></pre>')
    
    // Inline code
    .replace(/`([^`]+)`/gim, '<code class="bg-navy-50 px-1 py-0.5 rounded text-sm">$1</code>')
    
    // Paragraphs
    .replace(/^(?!<[h|l|p|u])(.*$)/gim, '<p class="mb-6">$1</p>');
  
  // Wrap lists with ul tags
  const listMatch = html.match(/<li.*>.*<\/li>/g);
  if (listMatch) {
    listMatch.forEach(match => {
      const wrappedList = `<ul class="my-6">${match}</ul>`;
      html = html.replace(match, wrappedList);
    });
  }
  
  return html;
};

export default BlogPost;

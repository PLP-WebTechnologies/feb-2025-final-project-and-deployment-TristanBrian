
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FeaturedPostProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({
  id,
  title,
  excerpt,
  category,
  imageUrl,
  date,
  author
}) => {
  return (
    <section className="relative h-[500px] mb-12 overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-10" />
      
      <img 
        src={imageUrl} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
        <div className="container mx-auto max-w-4xl">
          <Badge className="mb-4 bg-coral-500">Featured</Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
            {title}
          </h2>
          
          <p className="text-white/90 mb-6 max-w-2xl text-lg">
            {excerpt}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-6">
            <div className="flex items-center gap-3">
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <span className="text-white font-medium">{author.name}</span>
            </div>
            
            <div className="flex items-center gap-3 text-white/80">
              <span>{date}</span>
              <span>•</span>
              <span>{category}</span>
            </div>
          </div>
          
          <Button asChild size="lg" className="bg-coral-500 hover:bg-coral-600">
            <Link to={`/blog/${id}`}>Read Article</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;

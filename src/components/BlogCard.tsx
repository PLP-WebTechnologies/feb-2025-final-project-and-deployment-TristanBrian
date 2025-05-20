
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  author: {
    name: string;
    avatar: string;
  };
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  date,
  category,
  imageUrl,
  author,
  featured = false
}) => {
  return (
    <Link to={`/blog/${id}`}>
      <Card className={`blog-card overflow-hidden h-full border-0 ${featured ? '' : 'shadow-sm'}`}>
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {featured && (
            <Badge className="absolute top-4 left-4 bg-coral-500">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className={`pt-5 ${featured ? 'px-0' : 'px-4'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-navy-500">{category}</span>
            <span className="text-xs text-navy-400">•</span>
            <span className="text-xs text-navy-400">{date}</span>
          </div>
          <h3 className={`font-serif font-semibold leading-tight mb-2 ${featured ? 'text-2xl' : 'text-lg'}`}>
            {title}
          </h3>
          <p className="text-navy-600 text-sm line-clamp-2">
            {excerpt}
          </p>
        </CardContent>
        <CardFooter className={`pt-0 ${featured ? 'px-0' : 'px-4'}`}>
          <div className="flex items-center gap-2 mt-2">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-xs font-medium text-navy-700">{author.name}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;


import React, { useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel
} from '@/components/ui/carousel';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Thoughts, stories, and ideas that inspire",
    description: "Welcome to PenCraft, where we explore the intersection of design, technology, and human experience.",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=1920&auto=format&fit=crop",
    ctaText: "Explore Articles",
    ctaLink: "/blog"
  },
  {
    id: 2,
    title: "Discover new perspectives",
    description: "Dive into thought-provoking articles that challenge conventional thinking and inspire creativity.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop",
    ctaText: "Read Latest",
    ctaLink: "/blog"
  },
  {
    id: 3,
    title: "Join our community of thinkers",
    description: "Connect with passionate writers and readers who share their unique voices and stories.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1920&auto=format&fit=crop",
    ctaText: "Join Now",
    ctaLink: "/subscribe"
  }
];

const AutoRotatingCarousel = ({ children, autoPlayInterval = 5000 }: { children: React.ReactNode, autoPlayInterval?: number }) => {
  const { api } = useCarousel();

  const scrollNext = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  useEffect(() => {
    if (!api) {
      return undefined;
    }

    const interval = setInterval(scrollNext, autoPlayInterval);
    
    // Clear interval when component unmounts or api changes
    return () => clearInterval(interval);
  }, [api, scrollNext, autoPlayInterval]);

  return children;
};

const HeroCarousel: React.FC = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-full"
    >
      <AutoRotatingCarousel>
        <CarouselContent className="-ml-0">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0 w-full">
              <div className="relative h-[600px] group overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10 
                  group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/40 transition-all duration-500" />
                
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                
                <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-16">
                  <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight text-white
                      transform transition-all duration-500 group-hover:translate-y-[-8px] opacity-90 group-hover:opacity-100">
                      {slide.title}
                    </h1>
                    
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl
                      transform transition-all duration-500 delay-100 group-hover:translate-y-[-8px] opacity-80 group-hover:opacity-100">
                      {slide.description}
                    </p>
                    
                    <div className="transform transition-all duration-500 delay-200 group-hover:translate-y-[-8px]">
                      <Button asChild size="lg" className="bg-coral-500 hover:bg-coral-600 shadow-lg hover:shadow-xl transition-all">
                        <Link to={slide.ctaLink}>{slide.ctaText}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </AutoRotatingCarousel>
      
      <div className="flex justify-center mt-4">
        <CarouselPrevious className="relative -left-0 translate-y-0 hover:bg-navy-100 hover:text-navy-800 border-navy-200" />
        <div className="flex gap-2 mx-4 items-center">
          {heroSlides.map((_, index) => (
            <div 
              key={index} 
              className="w-2 h-2 rounded-full bg-navy-300 transition-all duration-300 hover:bg-coral-500 hover:scale-125"
            />
          ))}
        </div>
        <CarouselNext className="relative -right-0 translate-y-0 hover:bg-navy-100 hover:text-navy-800 border-navy-200" />
      </div>
    </Carousel>
  );
};

export default HeroCarousel;

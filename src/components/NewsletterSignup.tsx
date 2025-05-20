
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail('');
    }, 1000);
  };

  return (
    <div className="bg-navy-50 rounded-xl p-8 sm:p-10">
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-navy-800 mb-3">
          Join our Newsletter
        </h3>
        <p className="text-navy-600 max-w-md mx-auto">
          Get the latest articles, resources, and insights delivered straight to your inbox.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow"
        />
        <Button type="submit" className="bg-coral-500 hover:bg-coral-600" disabled={loading}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      
      <p className="text-center text-navy-500 text-xs mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterSignup;

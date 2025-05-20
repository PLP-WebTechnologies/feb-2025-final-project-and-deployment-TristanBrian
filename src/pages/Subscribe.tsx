
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const interestOptions = [
    { id: 'design', label: 'Design' },
    { id: 'development', label: 'Development' },
    { id: 'ux', label: 'UX/UI' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'career', label: 'Career Growth' },
    { id: 'tools', label: 'Tools & Resources' },
  ];
  
  const handleInterestChange = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      // Reset form
      setEmail('');
      setName('');
      setInterests([]);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-serif font-bold mb-4">Subscribe to PenCraft</h1>
              <p className="text-lg text-navy-600">
                Get our best articles, resources, and insights delivered straight to your inbox.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-navy-100 p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label>What topics are you interested in?</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {interestOptions.map(option => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={interests.includes(option.id)}
                            onCheckedChange={() => handleInterestChange(option.id)}
                          />
                          <label htmlFor={option.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-coral-500 hover:bg-coral-600"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Subscribe'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-navy-500 text-sm">
                By subscribing, you agree to our <a href="/privacy" className="text-coral-500 hover:text-coral-600 underline">Privacy Policy</a>. 
                We'll treat your information with respect and you can unsubscribe at any time.
              </p>
            </div>
            
            <div className="mt-12 bg-navy-50 rounded-xl p-6">
              <h2 className="text-xl font-serif font-semibold mb-3">What to Expect</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-coral-500 mr-2">•</span>
                  <span>Weekly newsletter with our latest articles and insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-coral-500 mr-2">•</span>
                  <span>Exclusive content and resources only for subscribers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-coral-500 mr-2">•</span>
                  <span>Early access to our guides and in-depth reports</span>
                </li>
                <li className="flex items-start">
                  <span className="text-coral-500 mr-2">•</span>
                  <span>Occasional updates about events and opportunities</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-navy-600">
                We value your inbox and promise not to flood it. Typically, we send 1-2 emails per week.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subscribe;

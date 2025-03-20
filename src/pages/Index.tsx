
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, Cpu, Wallet, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import GlassCard from '@/components/ui-custom/GlassCard';
import AnimatedButton from '@/components/ui-custom/AnimatedButton';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Animated counter for stats
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [usersActive, setUsersActive] = useState(0);
  const [creditsGenerated, setCreditsGenerated] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (tasksCompleted < 5320) setTasksCompleted(prev => Math.min(prev + 53, 5320));
      if (usersActive < 2450) setUsersActive(prev => Math.min(prev + 25, 2450));
      if (creditsGenerated < 1250000) setCreditsGenerated(prev => Math.min(prev + 12500, 1250000));
    }, 30);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950"
        >
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light pointer-events-none" />
          
          <motion.div 
            className="container mx-auto px-4 pt-24 pb-12 md:py-32 relative z-10"
            style={{ opacity, y, scale }}
          >
            <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
              <FadeIn delay={0.1}>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-6">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>Revolutionizing the gig economy</span>
                </span>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                    Decentralized
                  </span>{" "}
                  task marketplace with AI valuation
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl text-balance">
                  GigCredits combines Ethereum mining, custom credit systems, and AI-driven task valuation to create a fair, transparent gig economy platform.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link to="/dashboard">
                    <AnimatedButton 
                      size="lg" 
                      className="rounded-full text-base px-8 font-medium"
                      glowOnHover
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </AnimatedButton>
                  </Link>
                  <Link to="/tasks">
                    <AnimatedButton 
                      size="lg" 
                      variant="outline" 
                      className="rounded-full text-base px-8 font-medium"
                    >
                      Explore Tasks
                    </AnimatedButton>
                  </Link>
                </div>
              </FadeIn>
              
              {/* Floating Graphics */}
              <div className="relative mt-20 mb-16 w-full max-w-3xl mx-auto">
                <motion.div 
                  className="absolute -top-12 -left-6 w-24 h-24 md:w-32 md:h-32 rounded-xl bg-blue-200 dark:bg-blue-900/30 backdrop-blur-lg z-0"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div 
                  className="absolute -bottom-10 -right-4 w-20 h-20 md:w-28 md:h-28 rounded-lg bg-purple-200 dark:bg-purple-900/30 backdrop-blur-lg z-0"
                  animate={{ 
                    y: [0, 10, 0], 
                    rotate: [0, -7, 0]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeInOut"
                  }}
                />
                
                <GlassCard 
                  className="relative z-10 p-6 md:p-10 overflow-hidden" 
                  intensity="medium"
                >
                  <div className="w-full h-[260px] md:h-[300px] bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent opacity-30" />
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      >
                        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-4">
                          <Layers className="h-10 w-10" />
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-medium text-white mb-2">Platform Preview</h3>
                      <p className="text-white/70">Coming soon...</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </motion.div>
          
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent" />
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our platform combines three powerful elements to create a sustainable gig economy
                </p>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Layers className="h-6 w-6" />}
                title="Task Marketplace"
                description="Browse, create, and complete tasks in a decentralized marketplace with transparent AI-driven pricing."
                delay={0}
              />
              
              <FeatureCard 
                icon={<Cpu className="h-6 w-6" />}
                title="Mining Integration"
                description="Generate platform credits by contributing computing power for Ethereum mining."
                delay={0.2}
              />
              
              <FeatureCard 
                icon={<Wallet className="h-6 w-6" />}
                title="Credit System"
                description="Earn and spend platform-specific credits that maintain value through our ecosystem."
                delay={0.4}
              />
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FadeIn delay={0}>
                <div className="p-8 text-center">
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {tasksCompleted.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">Tasks Completed</p>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <div className="p-8 text-center">
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {usersActive.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">Active Users</p>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <div className="p-8 text-center">
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {creditsGenerated.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">Credits Generated</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to join the future of work?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Start earning and spending credits in our decentralized task marketplace today.
                </p>
                <Link to="/dashboard">
                  <AnimatedButton 
                    size="lg" 
                    className="rounded-full text-base px-8 font-medium"
                    glowOnHover
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) => (
  <FadeIn delay={delay} direction="up">
    <GlassCard className="h-full p-8" hoverable>
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <div className="mt-6">
        <Link to="#" className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
          <span>Learn more</span>
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </GlassCard>
  </FadeIn>
);

export default Index;

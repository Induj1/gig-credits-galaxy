
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Wallet, Layers, Cpu } from 'lucide-react';
import AnimatedButton from '../ui-custom/AnimatedButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Layers className="h-4 w-4" /> },
    { name: 'Tasks', path: '/tasks', icon: <Layers className="h-4 w-4" /> },
    { name: 'Mining', path: '/mining', icon: <Cpu className="h-4 w-4" /> },
    { name: 'Wallet', path: '/wallet', icon: <Wallet className="h-4 w-4" /> },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-lg dark:bg-gray-900/80 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-white"></div>
              </div>
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-xl font-medium"
            >
              GigCredits
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all',
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <AnimatedButton 
              variant="default" 
              size="sm" 
              className="hidden md:flex items-center rounded-full px-4" 
              glowOnHover
            >
              <User className="mr-2 h-4 w-4" />
              <span>Connect</span>
            </AnimatedButton>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link key={item.path} to={item.path} className="block">
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start rounded-lg text-left',
                      location.pathname === item.path
                        ? 'bg-primary/10 text-primary'
                        : ''
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                  </Button>
                </Link>
              ))}
              <Button className="w-full mt-4 rounded-lg">
                <User className="mr-2 h-4 w-4" />
                <span>Connect</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;


import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = ({ className }: { className?: string }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('py-12 border-t border-gray-200 dark:border-gray-800', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-white"></div>
              </div>
              <span className="text-xl font-medium">GigCredits</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              A decentralized gig economy platform powered by custom credits, Ethereum mining, and AI-driven task valuation.
            </p>
            <div className="flex mt-6 space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Code className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Platform</h3>
            <ul className="space-y-3">
              <FooterLink href="/dashboard">Dashboard</FooterLink>
              <FooterLink href="/tasks">Tasks</FooterLink>
              <FooterLink href="/mining">Mining</FooterLink>
              <FooterLink href="/wallet">Wallet</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <FooterLink href="/docs">Documentation</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/community">Community</FooterLink>
              <FooterLink href="/support">Support</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} GigCredits. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link 
      to={href} 
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  </li>
);

export default Footer;

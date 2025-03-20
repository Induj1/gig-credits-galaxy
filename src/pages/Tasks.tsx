
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Sparkles,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  Hourglass,
  Clock,
  Wallet
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import GlassCard from '@/components/ui-custom/GlassCard';
import AnimatedButton from '@/components/ui-custom/AnimatedButton';

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allTasks = [
    {
      id: 1,
      title: "UI Design for Crypto Wallet",
      category: "design",
      description: "Create a sleek, modern interface for a cryptocurrency wallet application with a focus on usability.",
      status: "open",
      complexity: "medium",
      valueRange: "200-300",
      aiValue: 250,
      deadline: "7 days",
      skills: ["UI/UX", "Figma", "Crypto"],
    },
    {
      id: 2,
      title: "Smart Contract Audit",
      category: "development",
      description: "Review and audit a DeFi protocol smart contract for security vulnerabilities and optimization.",
      status: "open",
      complexity: "high",
      valueRange: "450-550",
      aiValue: 500,
      deadline: "10 days",
      skills: ["Solidity", "Security", "Auditing"],
    },
    {
      id: 3,
      title: "Whitepaper Review",
      category: "writing",
      description: "Technical review and editing of a blockchain project whitepaper, focusing on clarity and accuracy.",
      status: "open",
      complexity: "medium",
      valueRange: "150-200",
      aiValue: 175,
      deadline: "5 days",
      skills: ["Technical Writing", "Editing", "Blockchain"],
    },
    {
      id: 4,
      title: "NFT Collection Artwork",
      category: "design",
      description: "Create 10 unique artwork pieces for an upcoming NFT collection with a cyberpunk theme.",
      status: "open",
      complexity: "high",
      valueRange: "400-500",
      aiValue: 450,
      deadline: "14 days",
      skills: ["Digital Art", "NFT", "Illustration"],
    },
    {
      id: 5,
      title: "Community Management",
      category: "marketing",
      description: "Manage Discord and Telegram communities for a week, create engagement and moderate discussions.",
      status: "open",
      complexity: "low",
      valueRange: "100-150",
      aiValue: 125,
      deadline: "7 days",
      skills: ["Community", "Social Media", "Communication"],
    },
    {
      id: 6,
      title: "DApp Frontend Development",
      category: "development",
      description: "Build a responsive frontend for a decentralized application using React and ethers.js.",
      status: "open",
      complexity: "high",
      valueRange: "350-450",
      aiValue: 400,
      deadline: "12 days",
      skills: ["React", "Web3", "JavaScript"],
    },
  ];

  const myTasks = [
    {
      id: 1,
      title: "UI Design for Crypto Wallet",
      category: "design",
      description: "Create a sleek, modern interface for a cryptocurrency wallet application with a focus on usability.",
      status: "in-progress",
      complexity: "medium",
      value: 250,
      deadline: "2 days",
      progress: 65,
      skills: ["UI/UX", "Figma", "Crypto"],
    },
    {
      id: 2,
      title: "Smart Contract Audit",
      category: "development",
      description: "Review and audit a DeFi protocol smart contract for security vulnerabilities and optimization.",
      status: "pending",
      complexity: "high",
      value: 500,
      deadline: "5 days",
      progress: 0,
      skills: ["Solidity", "Security", "Auditing"],
    },
    {
      id: 3,
      title: "Content Writing for NFT Project",
      category: "writing",
      description: "Write compelling descriptions for 10 NFT characters, focusing on storytelling and uniqueness.",
      status: "completed",
      complexity: "medium",
      value: 175,
      deadline: "Completed",
      progress: 100,
      skills: ["Copywriting", "NFT", "Creative"],
    },
  ];

  const statusIcons = {
    "open": <AlertCircle className="h-4 w-4 text-blue-500" />,
    "in-progress": <Hourglass className="h-4 w-4 text-amber-500" />,
    "pending": <AlertCircle className="h-4 w-4 text-purple-500" />,
    "completed": <CheckCircle2 className="h-4 w-4 text-green-500" />
  };

  const statusLabels = {
    "open": "Open",
    "in-progress": "In Progress",
    "pending": "Pending",
    "completed": "Completed"
  };

  const statusColors = {
    "open": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "in-progress": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "pending": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    "completed": "bg-green-500/10 text-green-500 border-green-500/20"
  };

  const complexityColors = {
    "low": "bg-green-500/10 text-green-500 border-green-500/20",
    "medium": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "high": "bg-red-500/10 text-red-500 border-red-500/20"
  };

  const categoryColors = {
    "design": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    "development": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "writing": "bg-green-500/10 text-green-500 border-green-500/20",
    "marketing": "bg-pink-500/10 text-pink-500 border-pink-500/20"
  };

  const filteredAllTasks = allTasks.filter(task => {
    const matchesQuery = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const filteredMyTasks = myTasks.filter(task => {
    const matchesQuery = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl font-bold mb-2 md:mb-0">Tasks</h1>
              
              <div className="flex space-x-4">
                <AnimatedButton 
                  size="sm"
                  variant="outline" 
                  className="rounded-full"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Filter</span>
                </AnimatedButton>
                
                <AnimatedButton 
                  size="sm" 
                  className="rounded-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Create Task</span>
                </AnimatedButton>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  className="pl-10 rounded-xl"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="mb-8">
              <Tabs defaultValue="browse">
                <TabsList className="grid grid-cols-2 w-full md:w-60">
                  <TabsTrigger value="browse">Browse</TabsTrigger>
                  <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
                </TabsList>
                
                <TabsContent value="browse" className="mt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex overflow-x-auto pb-2 space-x-2">
                      <CategoryButton 
                        category="all" 
                        selected={selectedCategory === 'all'} 
                        onClick={() => setSelectedCategory('all')}
                      >
                        All
                      </CategoryButton>
                      <CategoryButton 
                        category="design" 
                        selected={selectedCategory === 'design'} 
                        onClick={() => setSelectedCategory('design')}
                      >
                        Design
                      </CategoryButton>
                      <CategoryButton 
                        category="development" 
                        selected={selectedCategory === 'development'} 
                        onClick={() => setSelectedCategory('development')}
                      >
                        Development
                      </CategoryButton>
                      <CategoryButton 
                        category="writing" 
                        selected={selectedCategory === 'writing'} 
                        onClick={() => setSelectedCategory('writing')}
                      >
                        Writing
                      </CategoryButton>
                      <CategoryButton 
                        category="marketing" 
                        selected={selectedCategory === 'marketing'} 
                        onClick={() => setSelectedCategory('marketing')}
                      >
                        Marketing
                      </CategoryButton>
                    </div>
                    
                    <div className="hidden md:flex items-center">
                      <p className="text-sm text-muted-foreground">
                        {filteredAllTasks.length} results
                      </p>
                      <Button variant="ghost" size="sm" className="ml-2">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAllTasks.map((task, index) => (
                      <TaskCard 
                        key={task.id} 
                        task={task}
                        statusIcons={statusIcons}
                        statusLabels={statusLabels}
                        statusColors={statusColors}
                        complexityColors={complexityColors}
                        categoryColors={categoryColors}
                        index={index}
                        aiValued
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="my-tasks" className="mt-6">
                  <div className="space-y-6">
                    {filteredMyTasks.map((task, index) => (
                      <MyTaskCard 
                        key={task.id} 
                        task={task}
                        statusIcons={statusIcons}
                        statusLabels={statusLabels}
                        statusColors={statusColors}
                        complexityColors={complexityColors}
                        categoryColors={categoryColors}
                        index={index}
                      />
                    ))}
                    
                    <FadeIn delay={0.4}>
                      <AnimatedButton 
                        variant="outline" 
                        className="w-full rounded-xl border-dashed"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        <span>Find More Tasks</span>
                      </AnimatedButton>
                    </FadeIn>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </FadeIn>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const CategoryButton = ({ 
  category, 
  selected, 
  onClick, 
  children 
}: { 
  category: string; 
  selected: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
      selected 
        ? 'bg-primary text-white' 
        : 'bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    {children}
  </button>
);

const TaskCard = ({ 
  task, 
  statusIcons, 
  statusLabels, 
  statusColors, 
  complexityColors,
  categoryColors,
  index,
  aiValued = false
}: { 
  task: any;
  statusIcons: Record<string, JSX.Element>;
  statusLabels: Record<string, string>;
  statusColors: Record<string, string>;
  complexityColors: Record<string, string>;
  categoryColors: Record<string, string>;
  index: number;
  aiValued?: boolean;
}) => (
  <FadeIn delay={0.1 + index * 0.05} direction="up">
    <Card className="overflow-hidden h-full border border-border/50 hover:border-border transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={categoryColors[task.category as keyof typeof categoryColors]}>
            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
          </Badge>
          <Badge variant="outline" className={statusColors[task.status as keyof typeof statusColors]}>
            <span className="flex items-center gap-1">
              {statusIcons[task.status as keyof typeof statusIcons]}
              {statusLabels[task.status as keyof typeof statusLabels]}
            </span>
          </Badge>
        </div>
        <CardTitle className="mt-2 text-xl">{task.title}</CardTitle>
        <CardDescription className="mt-2 line-clamp-2">
          {task.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-1 mb-4">
          {task.skills.map((skill: string) => (
            <Badge key={skill} variant="secondary" className="bg-accent text-accent-foreground">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Complexity</span>
            <Badge variant="outline" className={`mt-1 w-fit ${complexityColors[task.complexity as keyof typeof complexityColors]}`}>
              {task.complexity.charAt(0).toUpperCase() + task.complexity.slice(1)}
            </Badge>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Deadline</span>
            <span className="mt-1 text-sm font-medium">{task.deadline}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full">
          {aiValued && (
            <div className="mb-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
              <div className="flex items-center text-primary mb-1">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs font-medium">AI-Valued Task</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Value Range:</span>
                <span className="font-semibold">{task.valueRange} Credits</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm">AI Estimation:</span>
                <span className="font-semibold text-primary">{task.aiValue} Credits</span>
              </div>
            </div>
          )}
          
          <AnimatedButton 
            className="w-full rounded-lg"
          >
            Apply for Task
          </AnimatedButton>
        </div>
      </CardFooter>
    </Card>
  </FadeIn>
);

const MyTaskCard = ({ 
  task, 
  statusIcons, 
  statusLabels, 
  statusColors, 
  complexityColors,
  categoryColors, 
  index 
}: { 
  task: any;
  statusIcons: Record<string, JSX.Element>;
  statusLabels: Record<string, string>;
  statusColors: Record<string, string>;
  complexityColors: Record<string, string>;
  categoryColors: Record<string, string>;
  index: number;
}) => (
  <FadeIn delay={0.1 + index * 0.1}>
    <GlassCard 
      className="p-5" 
      hoverable 
      interactive
      withBorder={true}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-start gap-2 mb-2">
            <h3 className="font-medium">{task.title}</h3>
            <Badge 
              variant="outline" 
              className={statusColors[task.status as keyof typeof statusColors]}
            >
              <span className="flex items-center gap-1">
                {statusIcons[task.status as keyof typeof statusIcons]}
                {statusLabels[task.status as keyof typeof statusLabels]}
              </span>
            </Badge>
            <Badge variant="outline" className={categoryColors[task.category as keyof typeof categoryColors]}>
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {task.description}
          </p>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>Due: {task.deadline}</span>
            <span className="mx-2">•</span>
            <Wallet className="h-3.5 w-3.5 mr-1.5" />
            <span>{task.value} Credits</span>
          </div>
          
          {task.status === "in-progress" && (
            <div className="mt-3">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-1.5" />
            </div>
          )}
        </div>
        
        <div className="flex justify-end md:w-auto w-full">
          <AnimatedButton 
            variant={task.status === "completed" ? "outline" : "default"}
            size="sm"
            className="rounded-full"
          >
            {task.status === "completed" ? "View Details" : "Continue"}
          </AnimatedButton>
        </div>
      </div>
    </GlassCard>
  </FadeIn>
);

export default Tasks;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Layers,
  Clock,
  Activity,
  ChevronRight,
  Cpu,
  Wallet,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Hourglass
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import GlassCard from '@/components/ui-custom/GlassCard';
import AnimatedButton from '@/components/ui-custom/AnimatedButton';

const Dashboard = () => {
  const [creditBalance, setCreditBalance] = useState(0);
  const [miningRate, setMiningRate] = useState(0);
  const [taskProgress, setTaskProgress] = useState(0);

  // Simulate data loading with animation
  useEffect(() => {
    const balanceInterval = setInterval(() => {
      setCreditBalance(prev => {
        if (prev < 3450) return prev + 34.5;
        clearInterval(balanceInterval);
        return 3450;
      });
    }, 30);

    const miningInterval = setInterval(() => {
      setMiningRate(prev => {
        if (prev < 12.5) return prev + 0.125;
        clearInterval(miningInterval);
        return 12.5;
      });
    }, 30);

    const progressInterval = setInterval(() => {
      setTaskProgress(prev => {
        if (prev < 65) return prev + 1;
        clearInterval(progressInterval);
        return 65;
      });
    }, 30);

    return () => {
      clearInterval(balanceInterval);
      clearInterval(miningInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const tasks = [
    {
      id: 1,
      title: "UI Design for Crypto Wallet",
      status: "in-progress",
      dueDate: "2 days",
      value: 250,
      progress: 65
    },
    {
      id: 2,
      title: "Smart Contract Audit Review",
      status: "pending",
      dueDate: "5 days",
      value: 500,
      progress: 0
    },
    {
      id: 3,
      title: "Content Writing for NFT Project",
      status: "completed",
      dueDate: "Completed",
      value: 175,
      progress: 100
    }
  ];

  const statusIcons = {
    "in-progress": <Hourglass className="h-4 w-4 text-amber-500" />,
    "pending": <AlertCircle className="h-4 w-4 text-blue-500" />,
    "completed": <CheckCircle2 className="h-4 w-4 text-green-500" />
  };

  const statusLabels = {
    "in-progress": "In Progress",
    "pending": "Pending",
    "completed": "Completed"
  };

  const statusColors = {
    "in-progress": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "pending": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "completed": "bg-green-500/10 text-green-500 border-green-500/20"
  };

  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <FadeIn>
              <h1 className="text-3xl font-bold mb-2 md:mb-0">Dashboard</h1>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <div className="flex space-x-4">
                <AnimatedButton 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Activity</span>
                </AnimatedButton>
                
                <AnimatedButton 
                  size="sm" 
                  className="rounded-full"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Manage Credits</span>
                </AnimatedButton>
              </div>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FadeIn delay={0.1} direction="up">
              <GlassCard className="p-6" withBorder={true}>
                <div className="flex justify-between items-start mb-4">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-xs font-normal">
                    Credits
                  </Badge>
                </div>
                <h3 className="text-2xl font-semibold mb-1">
                  {formatNumber(creditBalance)}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Available balance
                </p>
                <div className="flex justify-between items-center">
                  <Link 
                    to="/wallet" 
                    className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center transition-colors"
                  >
                    <span>Manage</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </GlassCard>
            </FadeIn>
            
            <FadeIn delay={0.2} direction="up">
              <GlassCard className="p-6" withBorder={true}>
                <div className="flex justify-between items-start mb-4">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-xs font-normal">
                    Mining
                  </Badge>
                </div>
                <h3 className="text-2xl font-semibold mb-1">
                  {miningRate.toFixed(1)}/hr
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Current mining rate
                </p>
                <div className="flex justify-between items-center">
                  <Link 
                    to="/mining" 
                    className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center transition-colors"
                  >
                    <span>Optimize</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    Active
                  </span>
                </div>
              </GlassCard>
            </FadeIn>
            
            <FadeIn delay={0.3} direction="up">
              <GlassCard className="p-6" withBorder={true}>
                <div className="flex justify-between items-start mb-4">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                    <Layers className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-xs font-normal">
                    Tasks
                  </Badge>
                </div>
                <h3 className="text-2xl font-semibold mb-1">
                  1 of 3
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Active tasks
                </p>
                <div className="flex justify-between items-center">
                  <Link 
                    to="/tasks" 
                    className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center transition-colors"
                  >
                    <span>View all</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {taskProgress}% complete
                  </span>
                </div>
              </GlassCard>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FadeIn delay={0.1}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recent Tasks</h2>
                  <Link 
                    to="/tasks" 
                    className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center transition-colors"
                  >
                    <span>View all</span>
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </FadeIn>
              
              <div className="space-y-4">
                {tasks.map((task, i) => (
                  <FadeIn key={task.id} delay={0.1 + i * 0.1}>
                    <GlassCard 
                      className="p-5" 
                      hoverable 
                      interactive
                      withBorder={true}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start">
                            <h3 className="font-medium">{task.title}</h3>
                            <Badge 
                              variant="outline" 
                              className={`ml-3 ${statusColors[task.status as keyof typeof statusColors]}`}
                            >
                              <span className="flex items-center gap-1">
                                {statusIcons[task.status as keyof typeof statusIcons]}
                                {statusLabels[task.status as keyof typeof statusLabels]}
                              </span>
                            </Badge>
                          </div>
                          
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            <span>Due: {task.dueDate}</span>
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
                          <Link to={`/tasks/${task.id}`}>
                            <AnimatedButton 
                              variant="outline" 
                              size="sm"
                              className="rounded-full"
                            >
                              {task.status === "completed" ? "View Details" : "Continue"}
                            </AnimatedButton>
                          </Link>
                        </div>
                      </div>
                    </GlassCard>
                  </FadeIn>
                ))}
              </div>
              
              <FadeIn delay={0.4}>
                <div className="mt-6">
                  <Link to="/tasks">
                    <AnimatedButton 
                      variant="outline" 
                      className="w-full rounded-xl border-dashed"
                    >
                      <Layers className="h-4 w-4 mr-2" />
                      <span>Find More Tasks</span>
                    </AnimatedButton>
                  </Link>
                </div>
              </FadeIn>
            </div>
            
            <div>
              <FadeIn delay={0.2}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Mining Status</h2>
                  <Link 
                    to="/mining" 
                    className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center transition-colors"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <GlassCard className="p-6 mb-6" withBorder={true}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-500/10 text-green-500">
                      <Activity className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Hashrate</span>
                        <span className="font-medium">45.2 MH/s</span>
                      </div>
                      <Progress value={68} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Efficiency</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Uptime</span>
                        <span className="font-medium">12d 4h</span>
                      </div>
                      <Progress value={92} className="h-1.5" />
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Credits Mined</span>
                      <span className="text-lg font-semibold">1,250</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm">This month</span>
                      <span className="text-muted-foreground text-sm">+450</span>
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <Link to="/mining">
                  <AnimatedButton 
                    className="w-full rounded-xl"
                  >
                    <Cpu className="h-4 w-4 mr-2" />
                    <span>Optimize Mining</span>
                  </AnimatedButton>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

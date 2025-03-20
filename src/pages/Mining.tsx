
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  BarChart4,
  Cpu,
  Settings,
  Zap,
  ChevronRight,
  Info,
  Clock,
  AlertTriangle
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import GlassCard from '@/components/ui-custom/GlassCard';
import AnimatedButton from '@/components/ui-custom/AnimatedButton';

const Mining = () => {
  const [cpuUsage, setCpuUsage] = useState(50);
  const [memoryUsage, setMemoryUsage] = useState(35);
  const [isMining, setIsMining] = useState(true);
  const [miningRate, setMiningRate] = useState(0);
  const [dailyEstimate, setDailyEstimate] = useState(0);
  const [efficiency, setEfficiency] = useState(68);
  const [selectedTab, setSelectedTab] = useState('performance');
  const [miningData, setMiningData] = useState<number[]>([]);
  
  // Simulate data loading with animation
  useEffect(() => {
    if (isMining) {
      const rateInterval = setInterval(() => {
        setMiningRate(prev => {
          if (prev < 12.5) return prev + 0.2;
          return 12.5;
        });
      }, 50);
      
      const dailyInterval = setInterval(() => {
        setDailyEstimate(prev => {
          if (prev < 300) return prev + 6;
          return 300;
        });
      }, 50);
      
      return () => {
        clearInterval(rateInterval);
        clearInterval(dailyInterval);
      };
    } else {
      setMiningRate(0);
      setDailyEstimate(0);
    }
  }, [isMining]);
  
  // Generate simulated mining data
  useEffect(() => {
    const generateData = () => {
      const newData = [...miningData];
      if (newData.length >= 20) newData.shift();
      
      if (isMining) {
        const baseValue = 12;
        const randomFactor = Math.random() * 2 - 1; // Random value between -1 and 1
        newData.push(baseValue + randomFactor);
      } else {
        newData.push(0);
      }
      
      setMiningData(newData);
    };
    
    const interval = setInterval(generateData, 2000);
    return () => clearInterval(interval);
  }, [isMining, miningData]);
  
  const handleCpuUsageChange = (value: number[]) => {
    setCpuUsage(value[0]);
    // Simulate how changing CPU usage affects efficiency
    setEfficiency(Math.max(30, Math.min(95, 100 - Math.abs(value[0] - 65) - Math.random() * 5)));
  };
  
  const toggleMining = () => {
    setIsMining(!isMining);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl font-bold mb-2 md:mb-0">Mining</h1>
              
              <div className="flex space-x-4">
                <AnimatedButton 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setSelectedTab('performance')}
                >
                  <BarChart4 className="mr-2 h-4 w-4" />
                  <span>Performance</span>
                </AnimatedButton>
                
                <AnimatedButton 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setSelectedTab('settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </AnimatedButton>
              </div>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FadeIn delay={0.1}>
                <GlassCard className="p-6 mb-6" withBorder intensity="light">
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Mining Status</h2>
                      <p className="text-muted-foreground">Control your mining operations and view real-time stats</p>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <AnimatedButton 
                        size="lg"
                        variant={isMining ? "outline" : "default"}
                        onClick={toggleMining}
                        className={`rounded-full ${isMining ? "border-red-500 text-red-500 hover:bg-red-500/10" : ""}`}
                        glowOnHover={!isMining}
                      >
                        {isMining ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            <span>Stop Mining</span>
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            <span>Start Mining</span>
                          </>
                        )}
                      </AnimatedButton>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-3 rounded-full bg-blue-500/10">
                          <Zap className="h-6 w-6 text-blue-500" />
                        </div>
                        
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium">Current Mining Rate</h3>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    Credits earned per hour based on current hashrate and network difficulty
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          
                          <div className="mt-1">
                            <div className="flex items-end">
                              <span className="text-3xl font-bold">{miningRate.toFixed(1)}</span>
                              <span className="text-muted-foreground ml-1">Credits/hr</span>
                            </div>
                            {isMining && (
                              <Badge className="mt-2 bg-green-500/10 text-green-500 border-green-500/20">
                                Active
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Hashrate</span>
                            <span className="font-medium">45.2 MH/s</span>
                          </div>
                          <Progress value={isMining ? 68 : 0} className="h-1.5" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Efficiency</span>
                            <span className="font-medium">{efficiency}%</span>
                          </div>
                          <Progress value={isMining ? efficiency : 0} className="h-1.5" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Network Difficulty</span>
                            <span className="font-medium">Medium</span>
                          </div>
                          <Progress value={55} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-3 rounded-full bg-purple-500/10">
                          <BarChart4 className="h-6 w-6 text-purple-500" />
                        </div>
                        
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium">Daily Estimate</h3>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    Projected credits to be earned in 24 hours at current rates
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          
                          <div className="mt-1">
                            <div className="flex items-end">
                              <span className="text-3xl font-bold">{dailyEstimate.toFixed(0)}</span>
                              <span className="text-muted-foreground ml-1">Credits/day</span>
                            </div>
                            <div className="flex items-center mt-2 text-sm text-muted-foreground">
                              <Clock className="h-3.5 w-3.5 mr-1.5" />
                              <span>Last 24h: 285 Credits</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-36 relative mt-6">
                        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-border" />
                        
                        {/* Simplified mining rate chart visualization */}
                        <div className="flex items-end h-full gap-1">
                          {miningData.map((value, index) => (
                            <motion.div
                              key={index}
                              initial={{ height: 0 }}
                              animate={{ height: `${(value / 15) * 100}%` }}
                              transition={{ duration: 0.3 }}
                              className="flex-1 bg-primary/80 rounded-t"
                            />
                          ))}
                          {[...Array(20 - miningData.length)].map((_, index) => (
                            <div 
                              key={`empty-${index}`} 
                              className="flex-1 bg-gray-200 dark:bg-gray-800/50 rounded-t h-0" 
                            />
                          ))}
                        </div>
                        
                        <div className="absolute top-0 right-0 text-2xs text-muted-foreground">
                          15 Credits/hr
                        </div>
                        <div className="absolute bottom-1 right-0 text-2xs text-muted-foreground">
                          0 Credits/hr
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
              
              <AnimatePresence mode="wait">
                {selectedTab === 'performance' ? (
                  <FadeIn key="performance" delay={0.2}>
                    <GlassCard className="p-6" withBorder intensity="light">
                      <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">System Resources</h3>
                            <Badge variant="outline">
                              {cpuUsage > 80 ? 'High Load' : cpuUsage > 50 ? 'Moderate' : 'Optimal'}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">CPU Usage</span>
                                <span className="font-medium">{cpuUsage}%</span>
                              </div>
                              <Progress value={cpuUsage} className="h-2" />
                              
                              <div className="grid grid-cols-4 gap-2 mt-4">
                                <ResourceMetric label="Cores" value="8/8" />
                                <ResourceMetric label="Threads" value="16" />
                                <ResourceMetric label="Temp" value="67°C" />
                                <ResourceMetric label="Clock" value="3.6 GHz" />
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Memory Usage</span>
                                <span className="font-medium">{memoryUsage}%</span>
                              </div>
                              <Progress value={memoryUsage} className="h-2" />
                              
                              <div className="grid grid-cols-4 gap-2 mt-4">
                                <ResourceMetric label="Used" value="5.6 GB" />
                                <ResourceMetric label="Free" value="10.4 GB" />
                                <ResourceMetric label="Total" value="16 GB" />
                                <ResourceMetric label="Type" value="DDR4" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-border">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium">Mining Statistics</h3>
                            <div className="text-sm text-muted-foreground">
                              Last 7 days
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard 
                              label="Credits Mined" 
                              value="1,250" 
                              change="+12.5%" 
                              positive={true} 
                            />
                            <StatCard 
                              label="Average Rate" 
                              value="11.2/hr" 
                              change="+4.2%" 
                              positive={true} 
                            />
                            <StatCard 
                              label="Uptime" 
                              value="98.7%" 
                              change="-0.3%" 
                              positive={false} 
                            />
                            <StatCard 
                              label="Efficiency" 
                              value="76.4%" 
                              change="+2.1%" 
                              positive={true} 
                            />
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </FadeIn>
                ) : (
                  <FadeIn key="settings" delay={0.2}>
                    <GlassCard className="p-6" withBorder intensity="light">
                      <h2 className="text-xl font-semibold mb-4">Mining Settings</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <h3 className="font-medium">CPU Utilization</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Adjust how much CPU power to dedicate to mining
                              </p>
                            </div>
                            <Badge variant="outline">
                              {cpuUsage}%
                            </Badge>
                          </div>
                          
                          <Slider
                            value={[cpuUsage]}
                            min={10}
                            max={90}
                            step={5}
                            onValueChange={handleCpuUsageChange}
                            className="py-2"
                          />
                          
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Eco</span>
                            <span>Balanced</span>
                            <span>Performance</span>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-border">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <h3 className="font-medium">Mining Schedule</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Set automatic mining times
                              </p>
                            </div>
                            <Badge variant="outline">
                              Always On
                            </Badge>
                          </div>
                          
                          <div className="flex flex-col gap-3">
                            <ScheduleOption 
                              label="Always On" 
                              description="Mine continuously when computer is on" 
                              selected={true} 
                            />
                            <ScheduleOption 
                              label="Custom Schedule" 
                              description="Set specific times for mining" 
                              selected={false} 
                            />
                            <ScheduleOption 
                              label="Idle Only" 
                              description="Mine only when computer is idle" 
                              selected={false} 
                            />
                          </div>
                        </div>
                        
                        <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 border border-amber-200 dark:border-amber-800/50">
                          <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-amber-800 dark:text-amber-300">
                                Energy Considerations
                              </h4>
                              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                                Mining can increase power consumption and generate heat. Make sure your system has adequate cooling and consider energy costs.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </FadeIn>
                )}
              </AnimatePresence>
            </div>
            
            <div>
              <FadeIn delay={0.2}>
                <GlassCard className="p-6 mb-6" withBorder intensity="light">
                  <h2 className="text-xl font-semibold mb-4">Mining Summary</h2>
                  
                  <div className="space-y-4">
                    <SummaryItem 
                      label="Total Credits Mined" 
                      value="12,450" 
                    />
                    <SummaryItem 
                      label="Current Month" 
                      value="1,850" 
                    />
                    <SummaryItem 
                      label="Last Month" 
                      value="2,200" 
                    />
                    <SummaryItem 
                      label="All-time Efficiency" 
                      value="72%" 
                    />
                    <SummaryItem 
                      label="Total Mining Time" 
                      value="42d 8h" 
                    />
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mining Rank</span>
                      <span className="font-semibold">Gold</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span>Silver</span>
                        <span>Gold</span>
                        <span>Platinum</span>
                      </div>
                      <Progress value={76} className="h-1.5" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      3,550 more credits to reach Platinum
                    </p>
                  </div>
                </GlassCard>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <GlassCard className="p-6" withBorder intensity="light">
                  <h2 className="text-xl font-semibold mb-4">Optimization Tips</h2>
                  
                  <div className="space-y-4">
                    <OptimizationTip
                      title="Upgrade to Premium"
                      description="Get 15% more credits with Premium mining optimization"
                    />
                    <OptimizationTip
                      title="Balance CPU Usage"
                      description="Try 65% CPU usage for optimal efficiency/performance balance"
                    />
                    <OptimizationTip
                      title="Close Background Apps"
                      description="Closing unused applications can improve mining performance"
                    />
                  </div>
                  
                  <div className="mt-6">
                    <AnimatedButton 
                      className="w-full rounded-xl"
                    >
                      <Cpu className="mr-2 h-4 w-4" />
                      <span>Run Optimization</span>
                    </AnimatedButton>
                  </div>
                </GlassCard>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const ResourceMetric = ({ 
  label, 
  value 
}: { 
  label: string; 
  value: string;
}) => (
  <div className="text-center">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-medium text-sm">{value}</p>
  </div>
);

const StatCard = ({ 
  label, 
  value, 
  change, 
  positive 
}: { 
  label: string; 
  value: string;
  change: string;
  positive: boolean;
}) => (
  <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-xl font-semibold mt-1">{value}</p>
    <div className={`text-xs mt-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
      {change}
    </div>
  </div>
);

const ScheduleOption = ({ 
  label, 
  description, 
  selected 
}: { 
  label: string; 
  description: string;
  selected: boolean;
}) => (
  <div 
    className={`flex items-center justify-between p-3 rounded-lg border ${
      selected 
        ? 'border-primary bg-primary/5' 
        : 'border-border hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer'
    }`}
  >
    <div>
      <h4 className="font-medium">{label}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    {selected && (
      <div className="h-3 w-3 rounded-full bg-primary" />
    )}
  </div>
);

const SummaryItem = ({ 
  label, 
  value 
}: { 
  label: string; 
  value: string;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const OptimizationTip = ({ 
  title, 
  description 
}: { 
  title: string; 
  description: string;
}) => (
  <div className="flex gap-3">
    <div className="mt-1 flex-shrink-0 text-primary">
      <ChevronRight className="h-4 w-4" />
    </div>
    <div>
      <h4 className="font-medium text-sm">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Mining;

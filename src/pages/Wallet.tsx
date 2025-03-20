
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet as WalletIcon,
  ArrowDownUp,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import GlassCard from '@/components/ui-custom/GlassCard';
import AnimatedButton from '@/components/ui-custom/AnimatedButton';

const Wallet = () => {
  const { toast } = useToast();
  const [creditBalance, setCreditBalance] = useState(0);
  
  // Simulate data loading with animation
  useEffect(() => {
    const balanceInterval = setInterval(() => {
      setCreditBalance(prev => {
        if (prev < 3450) return prev + 34.5;
        clearInterval(balanceInterval);
        return 3450;
      });
    }, 30);
    
    return () => clearInterval(balanceInterval);
  }, []);
  
  const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
  
  const transactions = [
    {
      id: 1,
      type: "credit",
      amount: 125,
      source: "Mining Rewards",
      date: "Today, 2:45 PM",
      status: "completed"
    },
    {
      id: 2,
      type: "debit",
      amount: 250,
      source: "Task Payment: UI Design",
      date: "Yesterday, 10:20 AM",
      status: "completed"
    },
    {
      id: 3,
      type: "credit",
      amount: 500,
      source: "Task Completion: Smart Contract Audit",
      date: "May 15, 2023",
      status: "completed"
    },
    {
      id: 4,
      type: "debit",
      amount: 75,
      source: "Task Payment: Content Writing",
      date: "May 12, 2023",
      status: "completed"
    },
    {
      id: 5,
      type: "credit",
      amount: 300,
      source: "Mining Rewards",
      date: "May 10, 2023",
      status: "completed"
    },
    {
      id: 6,
      type: "pending",
      amount: 180,
      source: "Task Completion: Logo Design",
      date: "Pending",
      status: "pending"
    }
  ];
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: message,
    });
  };
  
  const formatWalletAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl font-bold mb-2 md:mb-0">Wallet</h1>
              
              <div className="flex space-x-4">
                <AnimatedButton 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                >
                  <ArrowDownUp className="mr-2 h-4 w-4" />
                  <span>Transfer</span>
                </AnimatedButton>
                
                <AnimatedButton 
                  size="sm" 
                  className="rounded-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Add Credits</span>
                </AnimatedButton>
              </div>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FadeIn delay={0.1}>
                <GlassCard className="p-6 mb-6" withBorder intensity="light">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mr-3">
                          <WalletIcon className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold">Balance</h2>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex items-end">
                          <span className="text-4xl font-bold">{formatNumber(creditBalance)}</span>
                          <span className="text-muted-foreground ml-2 mb-1">Credits</span>
                        </div>
                        <div className="text-green-500 text-sm mt-1 flex items-center">
                          <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                          <span>+125 credits from mining today</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center rounded-lg bg-background/80 backdrop-blur-sm border border-border p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Wallet Address</h3>
                        <Badge variant="outline">Ethereum</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <code className="text-sm bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
                          {formatWalletAddress(walletAddress)}
                        </code>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(walletAddress, "Wallet address copied")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => window.open(`https://etherscan.io/address/${walletAddress}`, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <Tabs defaultValue="transactions">
                  <TabsList className="grid grid-cols-2 w-full md:w-80">
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="transactions" className="mt-6">
                    <GlassCard className="p-6" withBorder intensity="light">
                      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                      
                      <div className="space-y-4">
                        {transactions.map((transaction, index) => (
                          <TransactionItem 
                            key={transaction.id} 
                            transaction={transaction} 
                            index={index}
                          />
                        ))}
                      </div>
                      
                      <div className="mt-6 text-center">
                        <Button variant="outline" className="rounded-full">
                          View All Transactions
                        </Button>
                      </div>
                    </GlassCard>
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="mt-6">
                    <GlassCard className="p-6" withBorder intensity="light">
                      <h2 className="text-xl font-semibold mb-4">Wallet Analytics</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <AnalyticsCard 
                          title="Credits Earned" 
                          value="5,250" 
                          change="+18.2%" 
                          positive={true}
                        />
                        <AnalyticsCard 
                          title="Credits Spent" 
                          value="1,800" 
                          change="+5.7%" 
                          positive={false}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Earning Sources</h3>
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span>Mining</span>
                              <span className="font-medium">2,850 Credits (54%)</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-primary h-2.5 rounded-full" style={{ width: "54%" }}></div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4 mb-2">
                              <span>Task Completion</span>
                              <span className="font-medium">2,400 Credits (46%)</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "46%" }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Spending Categories</h3>
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span>Task Payments</span>
                              <span className="font-medium">1,250 Credits (69%)</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "69%" }}></div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4 mb-2">
                              <span>Platform Fees</span>
                              <span className="font-medium">550 Credits (31%)</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "31%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </TabsContent>
                </Tabs>
              </FadeIn>
            </div>
            
            <div>
              <FadeIn delay={0.3}>
                <GlassCard className="p-6 mb-6" withBorder intensity="light">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  
                  <div className="space-y-3">
                    <QuickActionButton 
                      icon={<Plus className="h-4 w-4" />}
                      label="Add Credits"
                      description="Purchase or mine new credits"
                    />
                    <QuickActionButton 
                      icon={<ArrowDownUp className="h-4 w-4" />}
                      label="Transfer Credits"
                      description="Send credits to another user"
                    />
                    <QuickActionButton 
                      icon={<ArrowUpRight className="h-4 w-4" />}
                      label="Convert to ETH"
                      description="Exchange credits for Ethereum"
                      disabled
                    />
                    <QuickActionButton 
                      icon={<ExternalLink className="h-4 w-4" />}
                      label="View on Etherscan"
                      description="See blockchain transactions"
                    />
                  </div>
                </GlassCard>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <GlassCard className="p-6" withBorder intensity="light">
                  <h2 className="text-xl font-semibold mb-4">Credit Summary</h2>
                  
                  <div className="space-y-4">
                    <SummaryItem 
                      label="Total Credits Earned" 
                      value="5,250" 
                    />
                    <SummaryItem 
                      label="Total Credits Spent" 
                      value="1,800" 
                    />
                    <SummaryItem 
                      label="Current Balance" 
                      value={formatNumber(creditBalance)} 
                    />
                    <SummaryItem 
                      label="Credits from Mining" 
                      value="2,850" 
                    />
                    <SummaryItem 
                      label="Credits from Tasks" 
                      value="2,400" 
                    />
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Credit Value</span>
                      <div className="flex items-center text-green-500">
                        <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                        <span className="font-semibold">+2.3%</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      1 Credit ≈ 0.0048 ETH
                    </p>
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

const TransactionItem = ({ 
  transaction, 
  index 
}: { 
  transaction: any; 
  index: number;
}) => {
  const isCredit = transaction.type === "credit";
  const isPending = transaction.status === "pending";
  
  const statusIcon = isPending ? (
    <Clock className="h-5 w-5 text-amber-500" />
  ) : isCredit ? (
    <ArrowDownRight className="h-5 w-5 text-green-500" />
  ) : (
    <ArrowUpRight className="h-5 w-5 text-red-500" />
  );
  
  return (
    <FadeIn delay={0.1 + index * 0.05}>
      <div className="flex items-center justify-between p-3 border border-border/50 hover:border-border rounded-lg transition-colors">
        <div className="flex items-center">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
            isPending ? 'bg-amber-100 dark:bg-amber-900/30' : 
            isCredit ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
          }`}>
            {statusIcon}
          </div>
          
          <div>
            <p className="font-medium">{transaction.source}</p>
            <p className="text-sm text-muted-foreground">{transaction.date}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <p className={`font-semibold ${
            isPending ? 'text-amber-500' : 
            isCredit ? 'text-green-500' : 'text-red-500'
          }`}>
            {isCredit ? "+" : "-"}{transaction.amount} Credits
          </p>
          
          {isPending ? (
            <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span className="text-xs">Pending</span>
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 mt-1">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              <span className="text-xs">Completed</span>
            </Badge>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

const AnalyticsCard = ({ 
  title, 
  value, 
  change, 
  positive 
}: { 
  title: string; 
  value: string;
  change: string;
  positive: boolean;
}) => (
  <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4">
    <h3 className="text-muted-foreground mb-2">{title}</h3>
    <p className="text-2xl font-semibold">{value}</p>
    <div className={`flex items-center mt-1 text-sm ${
      positive ? 'text-green-500' : 'text-red-500'
    }`}>
      {positive ? (
        <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
      ) : (
        <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
      )}
      <span>{change} in last 30 days</span>
    </div>
  </div>
);

const QuickActionButton = ({ 
  icon, 
  label, 
  description, 
  disabled = false 
}: { 
  icon: React.ReactNode; 
  label: string;
  description: string;
  disabled?: boolean;
}) => (
  <Button
    variant="outline"
    className={`w-full justify-start text-left h-auto py-3 px-4 ${
      disabled ? 'opacity-60 cursor-not-allowed' : ''
    }`}
    disabled={disabled}
  >
    <div className="flex items-center">
      <div className="bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center mr-3">
        {icon}
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  </Button>
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

export default Wallet;

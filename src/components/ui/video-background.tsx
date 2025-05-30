import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  BarChart, 
  TrendingUp, 
  TrendingDown,
  Bitcoin,
  DollarSign,
  Euro,
  PoundSterling,
  IndianRupee,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Wallet,
  CreditCard,
  PiggyBank,
  Coins,
  Percent,
  Landmark,
  Banknote,
  Receipt,
  Calculator,
  LineChartIcon,
  BarChartIcon,
  CandlestickChart,
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  EuroIcon,
  PoundSterlingIcon,
  BitcoinIcon,
  IndianRupeeIcon,
  WalletIcon,
  CreditCardIcon,
  PiggyBankIcon,
  CoinsIcon,
  PercentIcon,
  LandmarkIcon,
  BanknoteIcon,
  ReceiptIcon,
  CalculatorIcon
} from 'lucide-react';

interface VideoBackgroundProps {
  className?: string;
}

export function VideoBackground({ className = '' }: VideoBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* First set of floating financial charts */}
      <motion.div
        className="absolute top-[10%] left-[5%] text-primary/10"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <LineChart className="h-20 w-20" />
      </motion.div>

      <motion.div
        className="absolute top-[20%] right-[10%] text-secondary/10"
        animate={{
          y: [0, 30, 0],
          rotate: [0, -5, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <BarChart className="h-16 w-16" />
      </motion.div>

      {/* Second set of charts */}
      <motion.div
        className="absolute top-[15%] left-[25%] text-accent/10"
        animate={{
          y: [0, -25, 0],
          rotate: [0, -5, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <CandlestickChart className="h-18 w-18" />
      </motion.div>

      <motion.div
        className="absolute top-[25%] right-[25%] text-primary/10"
        animate={{
          y: [0, 25, 0],
          rotate: [0, 5, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <LineChartIcon className="h-16 w-16" />
      </motion.div>

      {/* First set of currency icons */}
      <motion.div
        className="absolute top-[40%] left-[15%] text-accent/10"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Bitcoin className="h-12 w-12" />
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[20%] text-primary/10"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          rotate: [0, -360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <DollarSign className="h-12 w-12" />
      </motion.div>

      {/* Second set of currency icons */}
      <motion.div
        className="absolute top-[45%] left-[35%] text-secondary/10"
        animate={{
          x: [0, 15, 0],
          y: [0, -15, 0],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Euro className="h-10 w-10" />
      </motion.div>

      <motion.div
        className="absolute top-[55%] right-[35%] text-accent/10"
        animate={{
          x: [0, -15, 0],
          y: [0, 15, 0],
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <PoundSterling className="h-10 w-10" />
      </motion.div>

      {/* Third set of currency icons */}
      <motion.div
        className="absolute top-[50%] left-[55%] text-primary/10"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <IndianRupee className="h-10 w-10" />
      </motion.div>

      <motion.div
        className="absolute top-[40%] right-[55%] text-secondary/10"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          rotate: [0, -360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Banknote className="h-10 w-10" />
      </motion.div>

      {/* Market indicators - First set */}
      <motion.div
        className="absolute top-[30%] left-[30%] text-success/10"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-1">
          <TrendingUp className="h-6 w-6" />
          <span className="text-xl font-bold">+15%</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[30%] right-[30%] text-destructive/10"
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-1">
          <TrendingDown className="h-6 w-6" />
          <span className="text-xl font-bold">-5%</span>
        </div>
      </motion.div>

      {/* Market indicators - Second set */}
      <motion.div
        className="absolute top-[35%] left-[45%] text-success/10"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-1">
          <TrendingUpIcon className="h-5 w-5" />
          <span className="text-lg font-bold">+8.5%</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[35%] right-[45%] text-destructive/10"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-1">
          <TrendingDownIcon className="h-5 w-5" />
          <span className="text-lg font-bold">-3.2%</span>
        </div>
      </motion.div>

      {/* Financial tools and icons */}
      <motion.div
        className="absolute top-[70%] left-[25%] text-primary/10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Calculator className="h-8 w-8" />
      </motion.div>

      <motion.div
        className="absolute top-[75%] right-[25%] text-secondary/10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -360],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Receipt className="h-8 w-8" />
      </motion.div>

      <motion.div
        className="absolute top-[65%] left-[45%] text-accent/10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Landmark className="h-8 w-8" />
      </motion.div>

      {/* Directional arrows - First set */}
      <motion.div
        className="absolute top-[25%] right-[25%] text-success/10"
        animate={{
          x: [0, 10, 0],
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ArrowUpRight className="h-8 w-8" />
      </motion.div>

      <motion.div
        className="absolute bottom-[25%] left-[25%] text-destructive/10"
        animate={{
          x: [0, -10, 0],
          y: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ArrowDownRight className="h-8 w-8" />
      </motion.div>

      {/* Directional arrows - Second set */}
      <motion.div
        className="absolute top-[35%] right-[35%] text-success/10"
        animate={{
          x: [0, 15, 0],
          y: [0, -15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ArrowUpRight className="h-6 w-6" />
      </motion.div>

      <motion.div
        className="absolute bottom-[35%] left-[35%] text-destructive/10"
        animate={{
          x: [0, -15, 0],
          y: [0, 15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ArrowDownRight className="h-6 w-6" />
      </motion.div>

      {/* Additional financial icons - First set */}
      <motion.div
        className="absolute top-[80%] right-[15%] text-warning/10"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Coins className="h-12 w-12" />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[30%] text-accent/10"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <PiggyBank className="h-14 w-14" />
      </motion.div>

      {/* Additional financial icons - Second set */}
      <motion.div
        className="absolute top-[85%] right-[35%] text-primary/10"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.2, 1],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Wallet className="h-12 w-12" />
      </motion.div>

      <motion.div
        className="absolute bottom-[15%] left-[45%] text-secondary/10"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.15, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <CreditCard className="h-14 w-14" />
      </motion.div>

      {/* Additional financial icons - Third set */}
      <motion.div
        className="absolute top-[90%] right-[55%] text-accent/10"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Banknote className="h-12 w-12" />
      </motion.div>

      <motion.div
        className="absolute bottom-[10%] left-[55%] text-primary/10"
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.15, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Receipt className="h-14 w-14" />
      </motion.div>

      {/* Percentage indicators - First set */}
      <motion.div
        className="absolute top-[15%] right-[35%] text-success/10"
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-1">
          <Percent className="h-5 w-5" />
          <span className="text-lg font-bold">8.5%</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[15%] left-[35%] text-destructive/10"
        animate={{
          y: [0, 10, 0],
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-1">
          <Percent className="h-5 w-5" />
          <span className="text-lg font-bold">-3.2%</span>
        </div>
      </motion.div>

      {/* Percentage indicators - Second set */}
      <motion.div
        className="absolute top-[20%] right-[45%] text-success/10"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-1">
          <PercentIcon className="h-4 w-4" />
          <span className="text-base font-bold">+12.3%</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[45%] text-destructive/10"
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-1">
          <PercentIcon className="h-4 w-4" />
          <span className="text-base font-bold">-7.8%</span>
        </div>
      </motion.div>
    </div>
  );
} 
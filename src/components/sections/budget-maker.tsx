import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { IndianRupee, PiggyBank, CreditCard, Calculator, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { formatAmount } from '../../lib/utils';

interface ExpenseCategory {
  name: string;
  amount: number;
}

interface BudgetInput {
  income: number;
  expenses: {
    housing: number;
    utilities: number;
    groceries: number;
    transportation: number;
    healthcare: number;
    insurance: number;
    education: number;
    entertainment: number;
    shopping: number;
    dining: number;
    miscellaneous: number;
  };
  loans: {
    amount: number;
    interestRate: number;
  }[];
  isYearly: boolean;
}

interface BudgetBreakdown {
  category: string;
  amount: number;
  color: string;
}

const EXPENSE_CATEGORIES = [
  { key: 'housing', label: 'Housing (Rent/EMI)', color: '#8b5cf6' },
  { key: 'utilities', label: 'Utilities (Electricity, Water, Gas)', color: '#06b6d4' },
  { key: 'groceries', label: 'Groceries & Household', color: '#10b981' },
  { key: 'transportation', label: 'Transportation', color: '#f59e0b' },
  { key: 'healthcare', label: 'Healthcare', color: '#ef4444' },
  { key: 'insurance', label: 'Insurance Premiums', color: '#6366f1' },
  { key: 'education', label: 'Education & Training', color: '#ec4899' },
  { key: 'entertainment', label: 'Entertainment', color: '#14b8a6' },
  { key: 'shopping', label: 'Shopping & Personal Care', color: '#8b5cf6' },
  { key: 'dining', label: 'Dining Out', color: '#f43f5e' },
  { key: 'miscellaneous', label: 'Miscellaneous', color: '#94a3b8' },
];

const initialExpenses = EXPENSE_CATEGORIES.reduce((acc, category) => {
  acc[category.key] = 0;
  return acc;
}, {} as Record<string, number>);

export function BudgetMaker() {
  const [budgetInput, setBudgetInput] = useState<BudgetInput>({
    income: 0,
    expenses: initialExpenses,
    loans: [{ amount: 0, interestRate: 0 }],
    isYearly: false,
  });
  const [budgetBreakdown, setBudgetBreakdown] = useState<BudgetBreakdown[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleTimePeriod = () => {
    setBudgetInput(prev => ({
      ...prev,
      isYearly: !prev.isYearly
    }));
  };

  const handleIncomeChange = (value: string) => {
    setBudgetInput(prev => ({
      ...prev,
      income: Math.max(0, parseFloat(value) || 0)
    }));
  };

  const handleExpenseChange = (category: string, value: string) => {
    setBudgetInput(prev => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [category]: Math.max(0, parseFloat(value) || 0)
      }
    }));
  };

  const handleLoanChange = (index: number, field: 'amount' | 'interestRate', value: string) => {
    const newLoans = [...budgetInput.loans];
    newLoans[index] = {
      ...newLoans[index],
      [field]: Math.max(0, parseFloat(value) || 0)
    };
    setBudgetInput(prev => ({
      ...prev,
      loans: newLoans
    }));
  };

  const addLoan = () => {
    setBudgetInput(prev => ({
      ...prev,
      loans: [...prev.loans, { amount: 0, interestRate: 0 }]
    }));
  };

  const removeLoan = (index: number) => {
    setBudgetInput(prev => ({
      ...prev,
      loans: prev.loans.filter((_, i) => i !== index)
    }));
  };

  const calculateBudget = () => {
    const { income, expenses, loans, isYearly } = budgetInput;
    
    // Convert all values to monthly if yearly
    const monthlyIncome = isYearly ? income / 12 : income;
    const monthlyExpenses = Object.values(expenses).reduce((sum, amount) => 
      sum + (isYearly ? amount / 12 : amount), 0);

    // Calculate total loan payments
    const totalLoanPayment = loans.reduce((acc, loan) => {
      const monthlyInterest = (loan.amount * (loan.interestRate / 100)) / 12;
      const monthlyPayment = (loan.amount / 12) + monthlyInterest;
      return acc + monthlyPayment;
    }, 0);

    // Calculate disposable income
    const disposableIncome = Math.max(0, monthlyIncome - monthlyExpenses - totalLoanPayment);

    // Create expense breakdown
    const expenseBreakdown = EXPENSE_CATEGORIES.map(category => ({
      category: category.label,
      amount: isYearly ? expenses[category.key] : expenses[category.key] * 12,
      color: category.color
    })).filter(item => item.amount > 0);

    // Add loan payments and savings if there's disposable income
    const breakdown = [
      ...expenseBreakdown,
      {
        category: 'Loan Payments',
        amount: isYearly ? totalLoanPayment * 12 : totalLoanPayment,
        color: '#ef4444'
      }
    ];

    if (disposableIncome > 0) {
      breakdown.push(
        {
          category: 'Emergency Fund',
          amount: isYearly ? disposableIncome * 12 * 0.3 : disposableIncome * 0.3,
          color: '#10b981'
        },
        {
          category: 'Investments',
          amount: isYearly ? disposableIncome * 12 * 0.4 : disposableIncome * 0.4,
          color: '#06b6d4'
        },
        {
          category: 'Discretionary',
          amount: isYearly ? disposableIncome * 12 * 0.3 : disposableIncome * 0.3,
          color: '#f59e0b'
        }
      );
    }

    setBudgetBreakdown(breakdown.filter(item => item.amount > 0));
    setShowResults(true);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Personal Budget Maker</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your financial details below to get a personalized budget plan that helps
            you manage your money efficiently.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <Button
            variant="outline"
            onClick={toggleTimePeriod}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            {budgetInput.isYearly ? 'Switch to Monthly' : 'Switch to Yearly'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-primary" />
                {budgetInput.isYearly ? 'Yearly' : 'Monthly'} Income
              </h3>
              
              <div className="relative">
                <span className="absolute left-3 top-2 text-muted-foreground">₹</span>
                <input
                  type="number"
                  min="0"
                  value={budgetInput.income || ''}
                  onChange={(e) => handleIncomeChange(e.target.value)}
                  className="w-full rounded-md border px-3 py-2 pl-7 bg-background"
                  placeholder={`Enter your ${budgetInput.isYearly ? 'yearly' : 'monthly'} income`}
                />
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-primary" />
                {budgetInput.isYearly ? 'Yearly' : 'Monthly'} Expenses
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXPENSE_CATEGORIES.map(category => (
                  <div key={category.key}>
                    <label className="block text-sm font-medium mb-1">
                      {category.label}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-muted-foreground">₹</span>
                      <input
                        type="number"
                        min="0"
                        value={budgetInput.expenses[category.key] || ''}
                        onChange={(e) => handleExpenseChange(category.key, e.target.value)}
                        className="w-full rounded-md border px-3 py-2 pl-7 bg-background"
                        placeholder={`Enter ${category.label.toLowerCase()}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Loans
              </h3>
              
              <div className="space-y-4">
                {budgetInput.loans.map((loan, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Loan {index + 1}</h4>
                      {index > 0 && (
                        <button
                          onClick={() => removeLoan(index)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Loan Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-muted-foreground">₹</span>
                          <input
                            type="number"
                            min="0"
                            value={loan.amount || ''}
                            onChange={(e) => handleLoanChange(index, 'amount', e.target.value)}
                            className="w-full rounded-md border px-3 py-2 pl-7 bg-background"
                            placeholder="Enter loan amount"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Interest Rate (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={loan.interestRate || ''}
                          onChange={(e) => handleLoanChange(index, 'interestRate', e.target.value)}
                          className="w-full rounded-md border px-3 py-2 bg-background"
                          placeholder="Enter interest rate"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  onClick={addLoan}
                  className="w-full"
                >
                  Add Another Loan
                </Button>
              </div>
            </div>

            <Button
              variant="gradient"
              size="lg"
              onClick={calculateBudget}
              className="w-full"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Budget
            </Button>
          </motion.div>

          {showResults && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-primary" />
                  {budgetInput.isYearly ? 'Yearly' : 'Monthly'} Budget Breakdown
                </h3>

                {budgetBreakdown.length > 0 ? (
                  <>
                    <div className="flex justify-center mb-8">
                      <PieChart width={300} height={300}>
                        <Pie
                          data={budgetBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius="30%"
                          outerRadius="90%"
                          paddingAngle={2}
                          cornerRadius={4}
                          dataKey="amount"
                          label={({ category }) => category}
                          labelLine={false}
                        >
                          {budgetBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => formatAmount(value as number)}
                        />
                      </PieChart>
                    </div>

                    <div className="space-y-4">
                      {budgetBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm font-medium">{item.category}</span>
                          </div>
                          <span className="text-sm font-semibold">
                            {formatAmount(item.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    Your expenses exceed your income. Please review your budget to ensure expenses
                    and loan payments don't exceed your {budgetInput.isYearly ? 'yearly' : 'monthly'} income.
                  </div>
                )}
              </div>

              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <h4 className="font-semibold mb-2">Budget Tips</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Try to keep essential expenses below 50% of your income</li>
                  <li>• Build an emergency fund covering 3-6 months of expenses</li>
                  <li>• Consider debt consolidation if you have multiple high-interest loans</li>
                  <li>• Automate your savings and investment contributions</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
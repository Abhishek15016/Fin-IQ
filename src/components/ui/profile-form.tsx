import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { Button } from './button';

export function ProfileForm() {
  const { setProfile } = useChat();
  const [formData, setFormData] = useState({
    income: '',
    expenses: '',
    goals: '',
    experience: 'beginner',
    risk_tolerance: 'medium',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await setProfile({
      income: Number(formData.income),
      expenses: Number(formData.expenses),
      goals: formData.goals,
      experience: formData.experience,
      risk_tolerance: formData.risk_tolerance,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Set Up Your Financial Profile</h3>
      
      <div className="space-y-2">
        <label htmlFor="income" className="block text-sm font-medium text-foreground">
          Monthly Income ($)
        </label>
        <input
          type="number"
          id="income"
          name="income"
          value={formData.income}
          onChange={handleChange}
          required
          min="0"
          className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="expenses" className="block text-sm font-medium text-foreground">
          Monthly Expenses ($)
        </label>
        <input
          type="number"
          id="expenses"
          name="expenses"
          value={formData.expenses}
          onChange={handleChange}
          required
          min="0"
          className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="goals" className="block text-sm font-medium text-foreground">
          Financial Goals
        </label>
        <textarea
          id="goals"
          name="goals"
          value={formData.goals}
          onChange={handleChange}
          required
          placeholder="e.g., Save for retirement, Buy a house, Pay off student loans"
          className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="experience" className="block text-sm font-medium text-foreground">
          Investment Experience
        </label>
        <select
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="risk_tolerance" className="block text-sm font-medium text-foreground">
          Risk Tolerance
        </label>
        <select
          id="risk_tolerance"
          name="risk_tolerance"
          value={formData.risk_tolerance}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
        >
          <option value="low">Low (Conservative)</option>
          <option value="medium">Medium (Balanced)</option>
          <option value="high">High (Aggressive)</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        Save Profile
      </Button>
    </form>
  );
} 
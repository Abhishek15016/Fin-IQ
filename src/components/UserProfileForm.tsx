import React, { useState } from 'react';
import axios from 'axios';
import { useChat } from '../context/ChatContext';

interface UserProfileFormProps {
  onProfileSet: () => void;
}

export function UserProfileForm({ onProfileSet }: UserProfileFormProps) {
  const { setHasProfile } = useChat();
  const [profile, setProfile] = useState({
    income: '',
    expenses: '',
    goals: '',
    experience: 'beginner',
    risk_tolerance: 'medium'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId') || 'default';
      const response = await axios.post('http://localhost:5000/set_profile', {
        user_id: userId,
        income: Number(profile.income),
        expenses: Number(profile.expenses),
        goals: profile.goals.split(',').map(g => g.trim()),
        experience: profile.experience,
        risk_tolerance: profile.risk_tolerance
      });

      if (response.data.status === 'success') {
        setHasProfile(true);
        onProfileSet();
      } else {
        throw new Error('Failed to set profile');
      }
    } catch (error) {
      console.error('Error setting profile:', error);
      alert('Failed to set profile. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h3 className="text-lg font-semibold text-card-foreground">Set Your Financial Profile</h3>
      
      <div>
        <label className="block text-sm font-medium mb-1 text-card-foreground">Monthly Income</label>
        <input
          type="number"
          value={profile.income}
          onChange={(e) => setProfile({ ...profile, income: e.target.value })}
          className="w-full p-2 border rounded bg-background text-foreground"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-card-foreground">Monthly Expenses</label>
        <input
          type="number"
          value={profile.expenses}
          onChange={(e) => setProfile({ ...profile, expenses: e.target.value })}
          className="w-full p-2 border rounded bg-background text-foreground"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-card-foreground">Financial Goals (comma-separated)</label>
        <input
          type="text"
          value={profile.goals}
          onChange={(e) => setProfile({ ...profile, goals: e.target.value })}
          className="w-full p-2 border rounded bg-background text-foreground"
          placeholder="e.g., Buy a house, Save for retirement, Start a business"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-card-foreground">Investment Experience</label>
        <select
          value={profile.experience}
          onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
          className="w-full p-2 border rounded bg-background text-foreground"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-card-foreground">Risk Tolerance</label>
        <select
          value={profile.risk_tolerance}
          onChange={(e) => setProfile({ ...profile, risk_tolerance: e.target.value })}
          className="w-full p-2 border rounded bg-background text-foreground"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90"
      >
        Set Profile
      </button>
    </form>
  );
} 
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Shield, Zap } from 'lucide-react';
import { Button } from '../ui/button';

const subscriptionPlans = [
  {
    title: 'Basic',
    price: '₹99',
    period: 'month',
    description: 'Perfect for beginners',
    features: [
      'Basic financial planning',
      'Monthly portfolio review',
      'Email support',
      'Market updates',
    ],
    icon: Star,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Professional',
    price: '₹299',
    period: 'month',
    description: 'For serious investors',
    features: [
      'Everything in Basic',
      'Weekly portfolio review',
      'Priority support',
      'Tax planning',
      'Investment recommendations',
    ],
    icon: Shield,
    color: 'from-purple-500 to-purple-600',
    popular: true,
  },
  {
    title: 'Premium',
    price: '₹499',
    period: 'month',
    description: 'For high-net-worth individuals',
    features: [
      'Everything in Professional',
      'Daily portfolio review',
      '24/7 support',
      'Estate planning',
      'Direct advisor access',
      'Custom investment strategies',
    ],
    icon: Zap,
    color: 'from-amber-500 to-amber-600',
  },
];

export function SubscriptionSection() {
  return (
    <section id="subscription" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">Choose Your Investment Advisor</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized financial advice from SEBI-registered investment advisors. Select the plan that best fits your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-10" />
              <div className="relative p-8 bg-card">
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-6">
                  <plan.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-foreground">{plan.title}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            All advisors are SEBI-registered and follow strict compliance guidelines.
            <br />
            Your investments are protected and monitored regularly.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 
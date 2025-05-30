import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    location: 'Bangalore',
    image: 'https://img.freepik.com/free-photo/closeup-young-hispanic-man-casuals-studio_662251-600.jpg?semt=ais_hybrid&w=150',
    rating: 5,
    review: "FinIQ has transformed how I manage my investments. The personalized advice helped me make better financial decisions, and I've seen a 25% increase in my portfolio returns.",
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Manager',
    location: 'Mumbai',
    image: 'https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-150nw-1433809418.jpg',
    rating: 5,
    review: "As someone who was new to investing, FinIQ made it so easy to understand complex financial concepts. The AI assistant is incredibly helpful and always available.",
  },
  {
    name: 'Arun Patel',
    role: 'Business Owner',
    location: 'Delhi',
    image: 'https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg?semt=ais_hybrid&w=150',
    rating: 5,
    review: "The tax planning features alone have saved me lakhs. The platform's ability to understand my business needs and provide tailored advice is remarkable.",
  },
  {
    name: 'Meera Iyer',
    role: 'Doctor',
    location: 'Chennai',
    image: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    review: "Being a busy professional, I needed a financial advisor I could trust. FinIQ's AI assistant is like having a personal financial expert available 24/7.",
  },
  {
    name: 'Vikram Singh',
    role: 'IT Consultant',
    location: 'Hyderabad',
    image: 'https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    review: "The investment recommendations are spot on! I've diversified my portfolio across various sectors and seen consistent growth in my investments.",
  },
  {
    name: 'Ananya Reddy',
    role: 'Entrepreneur',
    location: 'Pune',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    review: "FinIQ helped me plan my startup's finances better. The AI's understanding of market trends and investment opportunities is impressive.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their financial journey with FinIQ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-lg border"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-muted-foreground italic">"{testimonial.review}"</p>
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
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
            <span className="text-2xl font-bold">4.9</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-primary text-primary"
                />
              ))}
            </div>
            <span className="text-sm">from 10,000+ reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
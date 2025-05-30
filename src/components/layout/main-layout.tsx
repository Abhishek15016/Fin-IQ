import React from 'react';
import { VideoBackground } from '../ui/video-background';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen">
      {/* Video background for the entire website */}
      <VideoBackground className="fixed inset-0 -z-10" />
      
      {/* Content with semi-transparent backdrop for better readability */}
      <div className="relative z-0">
        {/* Add a subtle gradient overlay to ensure content visibility */}
        <div className="fixed inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/0 pointer-events-none" />
        
        {/* Main content */}
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
} 
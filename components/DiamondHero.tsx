'use client';

import React from 'react';

interface DiamondHeroProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function DiamondHero({ 
  title = "Welcome to Diyama", 
  subtitle = "Your gateway to onchain opportunities",
  className = '' 
}: DiamondHeroProps) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 ${className}`}>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Diamond pattern background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="diamond" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,0 20,10 10,20 0,10" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#diamond)" />
        </svg>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 border border-slate-400 hover:border-white text-slate-300 hover:text-white rounded-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
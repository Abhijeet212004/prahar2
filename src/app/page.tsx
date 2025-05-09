'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QuizContainer from '../components/QuizContainer';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [bgColor, setBgColor] = useState('#FFC8DD'); // Dawn color (Prahar 1)
  
  // Colors for each Prahar time of day
  const praharColors = [
    '#FFC8DD', // Dawn (Prahar 1)
    '#FDFFB6', // Morning (Prahar 2)
    '#CAFFBF', // Midday (Prahar 3)
    '#9BF6FF', // Afternoon (Prahar 4)
    '#A0C4FF', // Evening (Prahar 5)
    '#BDB2FF', // Sunset (Prahar 6)
    '#9D4EDD', // Twilight (Prahar 7)
    '#10002B'  // Night (Prahar 8)
  ];

  // Handle scroll event to change background color
  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      
      // Calculate which color to show based on scroll position
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.min(newScrollY / maxScroll, 1);
      const colorIndex = Math.min(
        Math.floor(scrollPercentage * praharColors.length),
        praharColors.length - 1
      );
      
      setBgColor(praharColors[colorIndex]);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 scroll-color-transition"
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 animate-float">
          Prahar Personality Quiz
        </h1>
        <p className="text-xl text-center mb-12">
          Discover which Prahar aligns with your personality through an interactive 3D experience
        </p>
        
        <QuizContainer />
      </motion.div>
    </main>
  );
}
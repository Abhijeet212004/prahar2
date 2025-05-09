'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type ResultProps = {
  result: {
    prahar: number;
    prahar_name: string;
    description: string;
    confidence: number;
    prahar_counts: Record<string, number>;
    color: string;
    timeOfDay: string;
  };
  onReset: () => void;
};

const ResultDisplay = ({ result, onReset }: ResultProps) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Animate in details after the main result appears
    const timer = setTimeout(() => setShowDetails(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Convert confidence to percentage
  const confidencePercent = Math.round(result.confidence * 100);

  // Create particles for background effect
  const particles = Array.from({ length: 20 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full"
      style={{
        backgroundColor: result.color,
        width: Math.random() * 10 + 5 + 'px',
        height: Math.random() * 10 + 5 + 'px',
        opacity: Math.random() * 0.5 + 0.3,
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
      }}
      animate={{
        y: [0, -Math.random() * 100 - 50],
        opacity: [0.7, 0],
      }}
      transition={{
        duration: Math.random() * 5 + 3,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  ));

  return (
    <motion.div 
      className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles}
      </div>

      {/* Content */}
      <div className="relative p-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Your Prahar Result</h2>
          
          <motion.div 
            className="inline-block mt-4 mb-6 text-3xl font-bold"
            style={{ color: result.color }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            {result.prahar_name}
          </motion.div>

          <motion.div
            className="h-2 bg-gray-200 rounded-full w-48 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: '12rem' }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.div 
              className="h-full rounded-full"
              style={{ backgroundColor: result.color, width: `${confidencePercent}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${confidencePercent}%` }}
              transition={{ delay: 1, duration: 1 }}
            />
          </motion.div>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg mb-6">{result.description}</p>
              
              <div className="flex justify-center items-center mb-8">
                <div 
                  className="w-16 h-16 rounded-full mr-4"
                  style={{ backgroundColor: result.color }}
                />
                <div className="text-left">
                  <p className="font-medium">Time of Day: <span className="capitalize">{result.timeOfDay}</span></p>
                  <p className="font-medium">Confidence: {confidencePercent}%</p>
                </div>
              </div>

              <button
                onClick={onReset}
                className="px-6 py-2 bg-prahar-evening text-white rounded-lg hover:bg-prahar-sunset transition-colors"
              >
                Retake Quiz
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultDisplay;
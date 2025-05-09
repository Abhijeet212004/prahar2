'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

type QuestionProps = {
  question: {
    id: number;
    question: string;
    options: string[];
  };
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
};

const QuestionCard = ({ question, selectedAnswer, onSelectAnswer }: QuestionProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  // Reset transform on mouse leave
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden card-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-6">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedAnswer === index ? 'border-prahar-twilight bg-prahar-twilight/10' : 'border-gray-200 dark:border-gray-700 hover:border-prahar-evening'}`}
              onClick={() => onSelectAnswer(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${selectedAnswer === index ? 'bg-prahar-twilight text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <p>{option}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
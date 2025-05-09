'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import ResultDisplay from './ResultDisplay';

type Question = {
  id: number;
  question: string;
  options: string[];
};

type PraharResult = {
  prahar: number;
  prahar_name: string;
  description: string;
  confidence: number;
  prahar_counts: Record<string, number>;
  color: string;
  timeOfDay: string;
};

const QuizContainer = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(null));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<PraharResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch quiz questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/quiz-data');
        setQuestions(response.data.questions);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load quiz questions. Please try again.');
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
    
    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 500);
  };

  // Handle previous question navigation
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle next question navigation
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Submit answers
  const handleSubmit = async () => {
    // Check if all questions are answered
    if (answers.some(answer => answer === null)) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('/api/predict', { answers });
      setResult(response.data);
    } catch (err) {
      setError('Failed to submit answers. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset quiz
  const handleReset = () => {
    setAnswers(Array(10).fill(null));
    setCurrentQuestionIndex(0);
    setResult(null);
    setError(null);
  };

  // Calculate progress percentage
  const progress = (answers.filter(a => a !== null).length / questions.length) * 100;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-prahar-dawn border-r-prahar-morning border-b-prahar-afternoon border-l-prahar-night rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 text-center">
        <p>{error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (result) {
    return <ResultDisplay result={result} onReset={handleReset} />;
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 w-full">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
        <motion.div 
          className="h-full bg-gradient-to-r from-prahar-dawn to-prahar-night rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {questions.length > 0 && (
            <QuestionCard
              question={questions[currentQuestionIndex]}
              selectedAnswer={answers[currentQuestionIndex]}
              onSelectAnswer={(answerIndex) => handleAnswerSelect(currentQuestionIndex, answerIndex)}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 transition-colors"
        >
          Previous
        </button>

        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-prahar-evening text-white rounded hover:bg-prahar-sunset transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || answers.some(a => a === null)}
            className="px-6 py-2 bg-prahar-twilight text-white rounded hover:bg-prahar-night transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>

      {/* Question counter */}
      <div className="text-center mt-4 text-sm text-gray-500">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
    </div>
  );
};

export default QuizContainer;
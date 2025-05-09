'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
         style={{ backgroundColor: '#A0C4FF' }} // Evening color (Prahar 5)
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-prahar-twilight">
          404 - Page Not Found
        </h1>
        <p className="text-xl mb-12">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link href="/" className="px-6 py-3 bg-prahar-evening text-white rounded-lg hover:bg-prahar-sunset transition-colors inline-block">
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
}
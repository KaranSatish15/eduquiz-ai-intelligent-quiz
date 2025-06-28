// app/page.tsx
'use client';

import { useState } from 'react';
import ContentInput from '@/components/ContentInput';
import Quiz from '@/components/Quiz';
import Results from '@/components/Results';
import { Question } from '@/lib/openai';
import { QuizResult } from '@/components/Quiz';

type AppState = 'input' | 'quiz' | 'results';

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>('input');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [originalContent, setOriginalContent] = useState('');
  const [currentDifficulty, setCurrentDifficulty] = useState('medium');

  const handleGenerateQuiz = async (content: string, difficulty: string, questionCount: number) => {
    setIsLoading(true);
    setOriginalContent(content);
    setCurrentDifficulty(difficulty);
    
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          difficulty,
          questionCount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }

      const data = await response.json();
      setQuestions(data.questions);
      setAppState('quiz');
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert('Failed to generate quiz. Please check your content and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizComplete = (quizResults: QuizResult[]) => {
    setResults(quizResults);
    setAppState('results');
  };

  const handleRequestMoreQuestions = async (newDifficulty: string) => {
    // Generate additional questions with adapted difficulty
    setIsLoading(true);
    
    try {
      const currentScore = results.length > 0 
        ? (results.filter(r => r.isCorrect).length / results.length) * 100
        : 50;

      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: originalContent,
          difficulty: newDifficulty,
          questionCount: 3, // Generate fewer adaptive questions
          previousPerformance: currentScore,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate adaptive questions');
      }

      const data = await response.json();
      // Add new questions to existing ones
      setQuestions(prev => [...prev, ...data.questions]);
      setCurrentDifficulty(newDifficulty);
    } catch (error) {
      console.error('Error generating adaptive questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setAppState('input');
    setQuestions([]);
    setResults([]);
    setOriginalContent('');
    setCurrentDifficulty('medium');
  };

  const handleRetakeQuiz = () => {
    setAppState('quiz');
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {appState === 'input' && (
        <ContentInput 
          onGenerateQuiz={handleGenerateQuiz} 
          isLoading={isLoading}
        />
      )}
      
      {appState === 'quiz' && (
        <Quiz
          questions={questions}
          onComplete={handleQuizComplete}
          onRequestMoreQuestions={handleRequestMoreQuestions}
        />
      )}
      
      {appState === 'results' && (
        <Results
          results={results}
          questions={questions}
          onStartOver={handleStartOver}
          onRetakeQuiz={handleRetakeQuiz}
        />
      )}
    </div>
  );
}
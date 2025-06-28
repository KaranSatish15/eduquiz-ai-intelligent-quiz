// components/Results.tsx
'use client';

import { useState, useEffect } from 'react';
import { QuizResult } from './Quiz';
import { Question } from '@/lib/openai';
import { Trophy, TrendingUp, Clock, Target, RefreshCw, Home, CheckCircle, XCircle, Brain } from 'lucide-react';

interface ResultsProps {
  results: QuizResult[];
  questions: Question[];
  onStartOver: () => void;
  onRetakeQuiz: () => void;
}

export default function Results({ results, questions, onStartOver, onRetakeQuiz }: ResultsProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [personalizedTips, setPersonalizedTips] = useState<string>('');

  const correctAnswers = results.filter(r => r.isCorrect).length;
  const totalQuestions = results.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const averageTime = Math.round(results.reduce((sum, r) => sum + r.timeTaken, 0) / results.length / 1000);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 border-green-200';
    if (score >= 60) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Outstanding! You've mastered this content! 🎉";
    if (score >= 80) return "Excellent work! You have a strong understanding! 👏";
    if (score >= 70) return "Good job! You're on the right track! 👍";
    if (score >= 60) return "Not bad! Keep practicing to improve! 💪";
    return "Keep learning! Practice makes perfect! 📚";
  };

  const conceptAnalysis = () => {
    const concepts = new Map();
    results.forEach(result => {
      const question = questions.find(q => q.id === result.questionId);
      if (question) {
        const concept = question.concept;
        if (!concepts.has(concept)) {
          concepts.set(concept, { correct: 0, total: 0 });
        }
        const data = concepts.get(concept);
        data.total++;
        if (result.isCorrect) data.correct++;
      }
    });

    return Array.from(concepts.entries()).map(([concept, data]) => ({
      concept,
      accuracy: Math.round((data.correct / data.total) * 100),
      correct: data.correct,
      total: data.total
    }));
  };

  const weakConcepts = conceptAnalysis().filter(c => c.accuracy < 70);
  const strongConcepts = conceptAnalysis().filter(c => c.accuracy >= 80);

  useEffect(() => {
    // Generate personalized study recommendations
    const generateTips = async () => {
      if (weakConcepts.length > 0) {
        const weakAreas = weakConcepts.map(c => c.concept).join(', ');
        setPersonalizedTips(`Focus on: ${weakAreas}. Consider reviewing these concepts with additional practice.`);
      } else {
        setPersonalizedTips("Great job! You can challenge yourself with more advanced topics in this subject.");
      }
    };
    generateTips();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className={`p-4 rounded-full ${getScoreBgColor(score)}`}>
            <Trophy className={`w-12 h-12 ${getScoreColor(score)}`} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
        <p className="text-xl text-gray-600">{getScoreMessage(score)}</p>
      </div>

      {/* Score Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 rounded-xl border-2 ${getScoreBgColor(score)}`}>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}%
            </div>
            <div className="text-gray-700 font-medium">Overall Score</div>
            <div className="text-sm text-gray-600">{correctAnswers}/{totalQuestions} correct</div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
          <div className="text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600 mb-1">{averageTime}s</div>
            <div className="text-gray-700 font-medium">Avg. Time</div>
          </div>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-xl">
          <div className="text-center">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600 mb-1">{strongConcepts.length}</div>
            <div className="text-gray-700 font-medium">Strong Areas</div>
          </div>
        </div>

        <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-xl">
          <div className="text-center">
            <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600 mb-1">{weakConcepts.length}</div>
            <div className="text-gray-700 font-medium">Growth Areas</div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Question Review */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Question Review</h3>
          <div className="space-y-3">
            {results.map((result, index) => {
              const question = questions.find(q => q.id === result.questionId);
              return (
                <div
                  key={result.questionId}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedQuestion === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {result.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mr-3" />
                      )}
                      <span className="font-medium text-gray-900">
                        Question {index + 1}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {Math.round(result.timeTaken / 1000)}s
                    </div>
                  </div>
                  
                  {selectedQuestion === index && question && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-800 mb-3">{question.question}</p>
                      <div className="space-y-2">
                        <div className={`p-2 rounded ${
                          result.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          Your answer: {question.options[result.userAnswer]}
                        </div>
                        {!result.isCorrect && (
                          <div className="p-2 rounded bg-green-100 text-green-800">
                            Correct answer: {question.options[result.correctAnswer]}
                          </div>
                        )}
                        <div className="p-3 bg-blue-50 rounded">
                          <div className="flex items-start">
                            <Brain className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                            <span className="text-blue-800 text-sm">{question.explanation}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Concept Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Concept Mastery</h3>
          
          {strongConcepts.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Strong Areas
              </h4>
              <div className="space-y-2">
                {strongConcepts.map((concept, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800 font-medium">{concept.concept}</span>
                    <span className="text-green-600 font-bold">{concept.accuracy}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {weakConcepts.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Areas for Growth
              </h4>
              <div className="space-y-2">
                {weakConcepts.map((concept, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-800 font-medium">{concept.concept}</span>
                    <span className="text-orange-600 font-bold">{concept.accuracy}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personalized Tips */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <h4 className="font-semibold text-blue-900 mb-2">Personalized Study Tips</h4>
            <p className="text-blue-800 text-sm">{personalizedTips}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onRetakeQuiz}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Retake Quiz
        </button>
        <button
          onClick={onStartOver}
          className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          New Content
        </button>
      </div>
    </div>
  );
}
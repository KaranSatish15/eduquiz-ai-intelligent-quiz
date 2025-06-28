// components/ContentInput.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FileText, Zap, Settings, Upload } from 'lucide-react';

interface ContentInputProps {
  onGenerateQuiz: (content: string, difficulty: string, questionCount: number) => void;
  isLoading: boolean;
}

interface FormData {
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
}

const sampleContent = `Photosynthesis is the process by which plants and other organisms convert light energy into chemical energy. This process occurs in chloroplasts, specifically in structures called thylakoids. The process involves two main stages: the light reactions and the Calvin cycle.

During the light reactions, chlorophyll absorbs photons and converts them into chemical energy in the form of ATP and NADPH. Water molecules are split, releasing oxygen as a byproduct. The Calvin cycle uses the ATP and NADPH to convert carbon dioxide into glucose.

The overall equation for photosynthesis is: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2. This process is essential for life on Earth as it produces oxygen and serves as the foundation of most food chains.`;

export default function ContentInput({ onGenerateQuiz, isLoading }: ContentInputProps) {
  const [showSample, setShowSample] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      difficulty: 'medium',
      questionCount: 5,
      content: ''
    }
  });

  const contentValue = watch('content');

  const onSubmit = (data: FormData) => {
    onGenerateQuiz(data.content, data.difficulty, data.questionCount);
  };

  const loadSample = () => {
    setValue('content', sampleContent);
    setShowSample(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setValue('content', content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">EduQuiz AI</h1>
        <p className="text-xl text-gray-600">Transform any content into personalized learning quizzes</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Content Input */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-lg font-semibold text-gray-900">
              <FileText className="w-5 h-5 mr-2" />
              Learning Content
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setShowSample(!showSample)}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                {showSample ? 'Hide' : 'Show'} Sample
              </button>
              <label className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                <Upload className="w-4 h-4 mr-1" />
                Upload .txt
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {showSample && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Sample content about photosynthesis:</p>
              <p className="text-sm text-gray-800 mb-3">{sampleContent.substring(0, 200)}...</p>
              <button
                type="button"
                onClick={loadSample}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Use This Sample
              </button>
            </div>
          )}

          <textarea
            {...register('content', {
              required: 'Please enter some content to generate questions from',
              minLength: { value: 100, message: 'Content should be at least 100 characters long' }
            })}
            placeholder="Paste your educational content here... (textbooks, articles, lecture notes, etc.)"
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          {errors.content && (
            <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
          )}
          
          <div className="mt-2 text-sm text-gray-500">
            {contentValue.length} characters
          </div>
        </div>

        {/* Quiz Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
            <Settings className="w-5 h-5 mr-2" />
            Quiz Settings
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                {...register('difficulty')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="easy">Easy - Basic recall and understanding</option>
                <option value="medium">Medium - Application and analysis</option>
                <option value="hard">Hard - Synthesis and evaluation</option>
              </select>
            </div>

            {/* Question Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions
              </label>
              <select
                {...register('questionCount', { valueAsNumber: true })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={3}>3 Questions - Quick check</option>
                <option value={5}>5 Questions - Standard quiz</option>
                <option value={8}>8 Questions - Comprehensive test</option>
                <option value={10}>10 Questions - Full assessment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading || !contentValue.trim()}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Generating Quiz...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-3" />
                Generate AI-Powered Quiz
              </>
            )}
          </button>
          
          {!isLoading && (
            <p className="mt-3 text-sm text-gray-600">
              AI will analyze your content and create personalized questions
            </p>
          )}
        </div>
      </form>

      {/* Features Preview */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Smart Generation</h4>
          <p className="text-sm text-gray-600">AI creates relevant questions from any educational content</p>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Settings className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Adaptive Learning</h4>
          <p className="text-sm text-gray-600">Difficulty adjusts based on your performance</p>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Instant Feedback</h4>
          <p className="text-sm text-gray-600">Get personalized explanations for every answer</p>
        </div>
      </div>
    </div>
  );
}
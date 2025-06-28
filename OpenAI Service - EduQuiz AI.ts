// lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  concept: string;
}

export interface QuizGenerationRequest {
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  previousPerformance?: number; // 0-100 score
}

export async function generateQuiz(request: QuizGenerationRequest): Promise<Question[]> {
  const difficultyPrompt = {
    easy: "basic understanding, simple recall questions",
    medium: "application and analysis questions", 
    hard: "synthesis and evaluation level questions"
  };

  const prompt = `
Based on the following educational content, generate exactly ${request.questionCount} multiple choice questions at ${difficultyPrompt[request.difficulty]} level.

Content: "${request.content}"

Requirements:
- Each question should have exactly 4 options (A, B, C, D)
- Questions should test different concepts from the content
- Include a brief explanation for the correct answer
- Identify the main concept being tested

Return ONLY a valid JSON array in this exact format:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Brief explanation of why this is correct",
    "concept": "Main concept being tested"
  }
]`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No content received from OpenAI');

    const questions = JSON.parse(content);
    
    // Add unique IDs and difficulty
    return questions.map((q: any, index: number) => ({
      ...q,
      id: `q_${Date.now()}_${index}`,
      difficulty: request.difficulty
    }));
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error('Failed to generate quiz questions');
  }
}

export async function getPersonalizedExplanation(
  question: string,
  userAnswer: string,
  correctAnswer: string,
  userPerformance: number
): Promise<string> {
  const supportLevel = userPerformance < 60 ? "very encouraging and detailed" : 
                      userPerformance < 80 ? "supportive with helpful tips" : 
                      "brief but positive";

  const prompt = `
The student answered: "${userAnswer}" 
The correct answer was: "${correctAnswer}"
Question: "${question}"
Student's overall performance: ${userPerformance}%

Provide a ${supportLevel} explanation that:
1. Explains why the correct answer is right
2. Helps the student understand the concept better
3. Gives a learning tip for similar questions
4. Keep it under 100 words

Be encouraging and educational.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 200,
    });

    return response.choices[0].message.content || "Great effort! Keep learning!";
  } catch (error) {
    console.error('Error generating explanation:', error);
    return "Good try! The correct answer helps you understand this concept better.";
  }
}

export function adaptDifficulty(currentDifficulty: string, score: number): 'easy' | 'medium' | 'hard' {
  if (score >= 80) {
    return currentDifficulty === 'easy' ? 'medium' : 'hard';
  } else if (score <= 40) {
    return currentDifficulty === 'hard' ? 'medium' : 'easy';
  }
  return currentDifficulty as 'easy' | 'medium' | 'hard';
}
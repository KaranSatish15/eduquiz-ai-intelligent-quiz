// app/api/generate-quiz/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateQuiz } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { content, difficulty, questionCount, previousPerformance } = await request.json();

    if (!content || !difficulty || !questionCount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (content.length < 50) {
      return NextResponse.json(
        { error: 'Content too short. Please provide at least 50 characters.' },
        { status: 400 }
      );
    }

    const questions = await generateQuiz({
      content,
      difficulty,
      questionCount,
      previousPerformance
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error in generate-quiz API:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz questions' },
      { status: 500 }
    );
  }
}

// app/api/explain-answer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPersonalizedExplanation } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { question, userAnswer, correctAnswer, userPerformance } = await request.json();

    const explanation = await getPersonalizedExplanation(
      question,
      userAnswer,
      correctAnswer,
      userPerformance
    );

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error('Error in explain-answer API:', error);
    return NextResponse.json(
      { error: 'Failed to generate explanation' },
      { status: 500 }
    );
  }
}
# EduQuiz AI - Personalized Education Platform

🚀 **Live Demo**: [Your Vercel URL Here]

## 🎯 Overview

EduQuiz AI transforms any educational content into intelligent, adaptive quizzes that personalize learning experiences. Built for the **Personalized Education - AI-Powered Learning/Teaching** hackathon.

## ✨ Key Features

### 🧠 AI-Powered Quiz Generation
- Automatically creates relevant questions from any text content
- Supports textbooks, articles, lecture notes, and study materials
- Generates multiple-choice questions with explanations

### 🎯 Adaptive Learning System
- Real-time difficulty adjustment based on performance
- Personalized feedback and explanations for each answer
- Smart progression that challenges without overwhelming

### 📊 Learning Analytics
- Detailed performance tracking and concept mastery analysis
- Identifies strong areas and growth opportunities
- Personalized study recommendations

### 🎨 Intuitive Interface
- Clean, educational-focused design
- Responsive across all devices
- Smooth user experience with real-time feedback

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI GPT-4 API
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd eduquiz-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 How to Use

### 1. Input Educational Content
- Paste any educational text (minimum 100 characters)
- Upload `.txt` files or use the sample content
- Content can be from textbooks, articles, lecture notes, etc.

### 2. Configure Quiz Settings
- **Difficulty Level**: Easy (recall), Medium (application), Hard (analysis)
- **Question Count**: 3-10 questions based on your needs

### 3. Take the Adaptive Quiz
- Answer multiple-choice questions generated by AI
- Get instant feedback with personalized explanations
- Watch difficulty adapt based on your performance

### 4. Review Detailed Results
- See overall score and performance metrics
- Analyze concept mastery and identify growth areas
- Get personalized study recommendations

## 🎯 AI Features Explained

### Smart Question Generation
```typescript
// AI analyzes content and creates relevant questions
const questions = await generateQuiz({
  content: "Your educational content...",
  difficulty: "medium",
  questionCount: 5
});
```

### Adaptive Difficulty
- Performance < 40% → Easier questions
- Performance > 80% → Harder questions
- Maintains optimal challenge level

### Personalized Explanations
- Tailored feedback based on individual performance
- Encouraging tone for struggling learners
- Advanced insights for high performers

## 📊 Demo Data

Try the app with this sample content about photosynthesis:

```
Photosynthesis is the process by which plants convert light energy into chemical energy. This occurs in chloroplasts through light reactions and the Calvin cycle. The overall equation: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2.
```

## 🎨 Project Structure

```
eduquiz-ai/
├── app/
│   ├── api/
│   │   ├── generate-quiz/route.ts
│   │   └── explain-answer/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ContentInput.tsx
│   ├── Quiz.tsx
│   └── Results.tsx
├── lib/
│   └── openai.ts
└── README.md
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect GitHub repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on push**

### Environment Variables for Production
```
OPENAI_API_KEY=your_production_openai_key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## 🎯 Educational Impact

### Problem Solved
- **Manual quiz creation is time-consuming** → AI generates questions instantly
- **Static difficulty doesn't suit all learners** → Adaptive system personalizes experience
- **Generic feedback isn't helpful** → AI provides tailored explanations

### Measurable Benefits
- **Time Saved**: Quiz creation from hours to seconds
- **Engagement**: Adaptive difficulty maintains optimal challenge
- **Learning Outcomes**: Personalized feedback improves retention

## 🔄 Future Enhancements

### Phase 2 Features
- **Multi-format Questions**: True/false, short answer, essay questions
- **Study Plans**: AI-generated learning schedules
- **Progress Tracking**: Long-term learning analytics
- **Collaborative Learning**: Share quizzes and compete with peers

### Advanced AI Features
- **Learning Style Detection**: Visual, auditory, kinesthetic adaptation
- **Prerequisite Analysis**: Identify knowledge gaps
- **Content Summarization**: Key concept extraction

## 🧪 Testing

### Manual Testing Checklist
- [ ] Content input validation (minimum length, file upload)
- [ ] Quiz generation with different difficulties
- [ ] Adaptive difficulty adjustment during quiz
- [ ] Results analytics and concept analysis
- [ ] Responsive design on mobile/desktop

### Sample Test Cases
1. **Short Content**: Should show validation error
2. **Long Content**: Should generate appropriate questions
3. **High Performance**: Should increase difficulty
4. **Low Performance**: Should decrease difficulty

## 🏆 Hackathon Compliance

### ✅ Requirements Met
- **Hardware**: Laptop-only development
- **Hosting**: Live deployment with GitHub repository
- **Tech Stack**: Next.js (recommended framework)
- **AI Usage**: Core functionality powered by OpenAI GPT-4
- **UI/Functionality**: Fully functional with polished interface

### 📋 Submission Checklist
- [x] GitHub repository with detailed README
- [x] Live hosted application (Vercel)
- [x] Project documentation (slides/PDF)
- [x] Meaningful AI integration throughout
- [x] Educational problem solving focus

## 👥 Team & Acknowledgments

Built during the Personalized Education hackathon, demonstrating the power of AI in transforming educational experiences.

### Key Technologies
- OpenAI GPT-4 for intelligent content analysis
- Next.js for full-stack development
- Tailwind CSS for responsive design

## 📞 Support

For questions or issues:
1. Check the GitHub Issues page
2. Review the documentation above
3. Test with the sample content provided

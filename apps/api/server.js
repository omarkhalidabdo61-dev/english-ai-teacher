import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

function generateTeacherResponse({ text, skill = 'grammar', level = 'B1' }) {
  const normalized = (text || '').trim();

  if (!normalized) {
    return {
      correctedText: 'Please write a sentence for feedback.',
      explanation: 'I need a text sample to evaluate your English level.',
      nextStep: 'Write a short sentence and I will correct it.',
      tips: ['Keep sentences short', 'Use correct verb tense', 'Practice every day'],
    };
  }

  const lower = normalized.toLowerCase();

  if (lower.includes('i am go') || lower.includes('i go')) {
    return {
      correctedText: 'I am going to school every day.',
      explanation: 'The present continuous tense is used for actions happening now or regular routines in a natural English pattern.',
      nextStep: 'Try a sentence with a daily routine and a time expression.',
      tips: ['Use am/is/are + verb-ing', 'Add time words like today, every day, now'],
    };
  }

  if (skill === 'vocabulary') {
    return {
      correctedText: normalized,
      explanation: 'Great idea. To improve vocabulary, use words in real situations and learn them with examples.',
      nextStep: 'Learn 5 new words and write one sentence for each.',
      tips: ['Use flashcards', 'Learn collocations', 'Practice speaking aloud'],
    };
  }

  if (skill === 'conversation') {
    return {
      correctedText: normalized,
      explanation: 'For conversation practice, keep answers short, clear, and natural.',
      nextStep: 'Answer this: What do you usually do on weekends?',
      tips: ['Use examples', 'Speak clearly', 'Ask follow-up questions'],
    };
  }

  return {
    correctedText: `I can help you improve: "${normalized}". A more natural version is: "${normalized} is a good sentence. I can help you improve it further."`,
    explanation: 'Your sentence is understandable, but we can make it more natural and fluent for a native speaker style.',
    nextStep: 'Practice by writing 3 sentences about your daily routine.',
    tips: ['Use linking words', 'Learn common phrases', 'Check word order'],
  };
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'English AI Teacher API is running' });
});

app.post('/api/teacher/feedback', (req, res) => {
  const { text, skill, level } = req.body || {};

  const result = generateTeacherResponse({ text, skill, level });

  res.json({
    skill: skill || 'grammar',
    level: level || 'B1',
    ...result,
  });
});

app.post('/api/teacher/lesson', (req, res) => {
  const { level = 'A2', goal = 'Speaking confidence' } = req.body || {};

  res.json({
    level,
    goal,
    title: `Daily ${goal} lesson`,
    warmUp: 'Read these 5 sentences aloud and focus on pronunciation.',
    practice: [
      'Describe your daily routine using time expressions.',
      'Use 3 vocabulary words from today’s topic.',
      'Answer 2 short questions about your weekend.',
    ],
    homework: 'Write 5 sentences about your week and correct them with the teacher.',
  });
});

app.post('/api/teacher/conversation', (req, res) => {
  const { topic = 'travel', level = 'B1' } = req.body || {};

  res.json({
    topic,
    level,
    prompt: `Let’s talk about ${topic}. Please answer in ${level} level English with 3-5 sentences.`,
    example: `I love talking about ${topic} because it helps me improve my vocabulary and confidence.`,
    followUp: 'Can you tell me about a memorable experience related to this topic?',
  });
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

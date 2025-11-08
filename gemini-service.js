const fs = require('fs');
const path = require('path');

class GeminiService {
  constructor() {
    this.client = null;
    this.model = null;
    this.vocabulary = null;
    this.lessons = null;
    this.initializeClient();
    this.loadVocabulary();
  }

  loadVocabulary() {
    // Load vocabulary data
    try {
      const vocabPath = path.join(__dirname, 'data', 'vocabulary.js');
      const lessonsPath = path.join(__dirname, 'data', 'lessons.js');
      
      if (fs.existsSync(vocabPath)) {
        const vocabContent = fs.readFileSync(vocabPath, 'utf8');
        // Extract VOCABULARY_DATA array from the file
        const vocabMatch = vocabContent.match(/const VOCABULARY_DATA = (\[[\s\S]*?\]);/);
        if (vocabMatch) {
          this.vocabulary = eval(vocabMatch[1]);
          console.log(`Loaded ${this.vocabulary.length} toki pona words`);
        }
      }
      
      if (fs.existsSync(lessonsPath)) {
        const lessonsContent = fs.readFileSync(lessonsPath, 'utf8');
        // Extract LESSONS_DATA array from the file
        const lessonsMatch = lessonsContent.match(/const LESSONS_DATA = (\[[\s\S]*?\]);[\s\S]*module\.exports/);
        if (lessonsMatch) {
          this.lessons = eval(lessonsMatch[1]);
          console.log(`Loaded ${this.lessons.length} lessons`);
        }
      }
    } catch (error) {
      console.error('Error loading vocabulary:', error);
    }
  }

  initializeClient() {
    // Read API key from config file
    const configPath = path.join(__dirname, 'config.json');
    try {
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (config.geminiApiKey && config.geminiApiKey !== 'YOUR_API_KEY_HERE') {
          this.initialize(config.geminiApiKey);
        } else {
          console.log('Gemini API key not configured');
        }
      }
    } catch (error) {
      console.error('Error initializing Gemini client:', error);
    }
  }
  
  initialize(apiKey) {
    try {
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      this.client = new GoogleGenerativeAI(apiKey);
      this.model = this.client.getGenerativeModel({ model: 'gemini-flash-lite-latest' });
      console.log('Gemini API initialized successfully');
    } catch (error) {
      console.error('Error initializing Gemini:', error);
      throw error;
    }
  }

  async generateLesson(data) {
    if (!this.client) {
      return { 
        error: 'API not configured. Please add your Gemini API key to config.json',
        needsConfig: true 
      };
    }

    const { lessonNumber, userLevel, strugglingTopics } = data;
    
    // Add vocabulary context
    let vocabularyContext = '';
    if (this.vocabulary) {
      vocabularyContext = '\n\nOfficial toki pona vocabulary (use ONLY these words):\n' + 
        this.vocabulary.slice(0, 50).map(v => `${v.word}: ${v.definition}`).join('\n');
    }
    
    const prompt = `You are a Toki Pona teacher. Generate a comprehensive lesson for lesson ${lessonNumber}.
    
User level: ${userLevel}
Topics they're struggling with: ${strugglingTopics.join(', ') || 'None yet'}${vocabularyContext}

IMPORTANT: Only use words from the official 120-word toki pona dictionary listed above.

Create a lesson that includes:
1. 5-10 vocabulary words with definitions and example sentences (use words from the dictionary above)
2. Grammar concepts for this level
3. 3 practice exercises (translation, fill-in-the-blank, or conversation)
4. Fun mnemonic devices to remember difficult concepts
5. Cultural context about Toki Pona philosophy

Format the response as JSON with this structure:
{
  "vocabulary": [{"word": "word", "definition": "def", "examples": ["ex1", "ex2"]}],
  "grammar": "grammar explanation",
  "exercises": [{"type": "type", "question": "q", "answer": "a"}],
  "mnemonics": ["mnemonic1", "mnemonic2"],
  "culturalNote": "note"
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { error: 'Could not parse lesson data' };
    } catch (error) {
      return { error: error.message };
    }
  }

  async practiceConversation(data) {
    if (!this.client) {
      return { 
        error: 'API not configured. Please add your Gemini API key to config.json',
        needsConfig: true 
      };
    }

    const { userMessage, conversationHistory, userLevel, completedLessons } = data;
    
    // Get words from completed lessons
    let learnedWords = [];
    if (this.lessons && completedLessons) {
      completedLessons.forEach(lessonId => {
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (lesson && lesson.words) {
          learnedWords = [...learnedWords, ...lesson.words];
        }
      });
    }
    
    // Get full vocabulary definitions for learned words
    let vocabularyContext = '';
    if (this.vocabulary && learnedWords.length > 0) {
      const learnedVocab = this.vocabulary.filter(v => learnedWords.includes(v.word));
      vocabularyContext = '\n\nVocabulary the user has learned:\n' + 
        learnedVocab.map(v => `${v.word}: ${v.definition}`).join('\n');
    } else if (this.vocabulary) {
      // If no completed lessons tracked, use basic core words
      const coreWords = this.vocabulary.slice(0, 30);
      vocabularyContext = '\n\nCore toki pona vocabulary:\n' + 
        coreWords.map(v => `${v.word}: ${v.definition}`).join('\n');
    }
    
    const systemPrompt = `You are a Toki Pona conversation partner. The user is at level: ${userLevel}.

IMPORTANT: Only use toki pona words from the official 120-word dictionary. Use ONLY words the user has learned.${vocabularyContext}

Rules:
- Respond ONLY in Toki Pona using words from the vocabulary above
- Match the user's skill level
- Keep responses SHORT - 1-2 sentences maximum for beginners
- Gently correct mistakes in your encouragement
- Use simple sentences for beginners, more complex ones for advanced users
- Be natural and encouraging

Previous conversation:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User: ${userMessage}

Respond in JSON format:
{
  "response": "your toki pona response (SHORT!)",
  "translation": "English translation",
  "corrections": ["any corrections or tips - explain in English"],
  "encouragement": "encouraging message in English"
}`;

    try {
      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { error: 'Could not parse conversation data' };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getSuggestions(data) {
    if (!this.client) {
      return { 
        error: 'API not configured. Please add your Gemini API key to config.json',
        needsConfig: true 
      };
    }

    const { strugglingTopic, recentMistakes, userLevel } = data;
    
    // Add vocabulary context
    let vocabularyContext = '';
    if (this.vocabulary) {
      const relevantWords = this.vocabulary.filter(v => 
        strugglingTopic.toLowerCase().includes(v.word.toLowerCase()) ||
        v.definition.toLowerCase().includes(strugglingTopic.toLowerCase())
      );
      if (relevantWords.length > 0) {
        vocabularyContext = '\n\nRelevant vocabulary:\n' + 
          relevantWords.map(v => `${v.word}: ${v.definition}`).join('\n');
      }
    }
    
    const prompt = `The user is struggling with: ${strugglingTopic}
Recent mistakes: ${recentMistakes.join(', ')}
User level: ${userLevel}${vocabularyContext}

Provide helpful learning suggestions in JSON format:
{
  "explanation": "clear explanation of the concept using official toki pona words",
  "tips": ["tip1", "tip2", "tip3"],
  "mnemonics": ["memorable way to remember this"],
  "practiceExercises": [{"question": "q", "answer": "a", "explanation": "why"}],
  "encouragement": "encouraging message"
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { error: 'Could not parse suggestions' };
    } catch (error) {
      return { error: error.message };
    }
  }

  async evaluateProgress(data) {
    if (!this.client) {
      return { 
        error: 'API not configured. Please add your Gemini API key to config.json',
        needsConfig: true 
      };
    }

    const { completedLessons, exerciseScores, conversationSamples } = data;
    
    const prompt = `Evaluate this Toki Pona learner's progress:

Completed lessons: ${completedLessons.length}
Average exercise score: ${exerciseScores.average}%
Recent conversation samples: ${conversationSamples.join('\n')}

Provide evaluation in JSON:
{
  "overallLevel": "beginner/intermediate/advanced",
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1", "weakness2"],
  "recommendedFocus": ["topic1", "topic2"],
  "nextSteps": "what to study next",
  "motivationalMessage": "encouraging message"
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { error: 'Could not parse evaluation' };
    } catch (error) {
      return { error: error.message };
    }
  }
}

const genai = new GeminiService();

module.exports = { genai };
